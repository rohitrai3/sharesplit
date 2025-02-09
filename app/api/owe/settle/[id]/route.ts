import { SettleExpenseInput } from "@/app/types";
import { getSession } from "@auth0/nextjs-auth0";
import { Group, User, Owe, Transaction, Prisma, PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const settleExpenseInput: SettleExpenseInput = await request.json();
  const session = await getSession();
  const payor: User | null = await prisma.user.findUnique({
    where: {
      name: session?.user?.name,
    },
  });
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

  await prisma.owe.updateMany({
    where: {
      from: payor!,
      to: payee!,
    },
    data: {
      amount: owe?.amount! - settleExpenseInput.amount,
    },
  });

  const group: Group | null = await prisma.group.findUnique({
    where: {
      id: settleExpenseInput.groupId,
    },
  });
  const expenseCreateinput: Prisma.ExpenseCreateInput = {
    name: `${payor?.name} settled up with ${payee?.name}`,
    amount: settleExpenseInput.amount,
    admin: {
      connect: payor!,
    },
    group: {
      connect: group!,
    },
  };
  const expense = await prisma.expense.create({
    data: expenseCreateinput,
  });

  const payCreateInput: Prisma.TransactionCreateInput = {
    amount: settleExpenseInput.amount,
    isPayor: true,
    user: {
      connect: payor!,
    },
    expense: {
      connect: expense,
    },
  };

  const pay: Transaction | null = await prisma.transaction.create({
    data: payCreateInput,
  });

  await prisma.expense.update({
    where: {
      id: expense.id,
    },
    data: {
      transactions: {
        connect: pay!,
      },
    },
  });

  return Response.json("Settled up successfully");
}
