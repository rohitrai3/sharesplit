import { SettleExpenseInput } from "@/app/types";
import { getSession } from "@auth0/nextjs-auth0";
import {
  Group,
  User,
  Owe,
  Prisma,
  PrismaClient,
} from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const settleExpenseInput: SettleExpenseInput = await request.json();
  const amount: number = settleExpenseInput.amount;
  
    if (amount < 0) {
      return NextResponse.json({ error: "Amount cannot be negative."}, { status: 500 });
    }

  const session = await getSession();
  const user: User | null = await prisma.user.findUnique({
    where: {
      name: session?.user?.name,
    },
  });
  const payor: User | null = await prisma.user.findUnique({
    where: {
      name: settleExpenseInput.payor
    }
  })
  const payee: User | null = await prisma.user.findUnique({
    where: {
      name: settleExpenseInput.payee,
    },
  });
  const owe: Owe | null = await prisma.owe.findUnique({
    where: {
      id: settleExpenseInput.id,
    },
  });
  const remainingAmount: number = owe?.amount! - settleExpenseInput.amount;

  // Create expense for settlement
  const group: Group | null = await prisma.group.findUnique({
    where: {
      id: settleExpenseInput.groupId,
    },
  });
  const expenseCreateinput: Prisma.ExpenseCreateInput = {
    name: `${payor?.name} settled up with ${payee?.name}`,
    amount: settleExpenseInput.amount,
    group: {
      connect: group!,
    },
    createdBy: {
      connect: user!,
    },
    payor: {
      connect: payor!
    }
  };
  const expense = await prisma.expense.create({
    data: expenseCreateinput,
  });

  // Craete transaction for settlement
  const transactionCreateManyInput: Prisma.TransactionCreateManyInput[] = [];
  transactionCreateManyInput.push({
    amount: settleExpenseInput.amount,
    isPayor: true,
    userId: payor?.id!,
    expenseId: expense.id,
  });

  if (remainingAmount < 0) {
    await prisma.owe.updateMany({
      where: {
        from: payor!,
        to: payee!,
      },
      data: {
        amount: 0,
      },
    });

    await prisma.owe.updateMany({
      where: {
        from: payee!,
        to: payor!,
      },
      data: {
        amount: Math.abs(remainingAmount),
      },
    });

    transactionCreateManyInput.push({
      amount: Math.abs(remainingAmount),
      isPayor: false,
      userId: payee?.id!,
      expenseId: expense.id,
    });
  } else {
    await prisma.owe.updateMany({
      where: {
        from: payor!,
        to: payee!,
      },
      data: {
        amount: remainingAmount,
      },
    });
  }

  const transactions = await prisma.transaction.createManyAndReturn({
    data: transactionCreateManyInput,
  });

  await prisma.expense.update({
    where: {
      id: expense.id,
    },
    data: {
      transactions: {
        connect: transactions,
      },
    },
  });

  return Response.json("Settled up successfully");
}
