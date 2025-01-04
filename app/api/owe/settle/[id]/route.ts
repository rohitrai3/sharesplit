import { SettleExpenseInput } from "@/app/types";
import { getSession } from "@auth0/nextjs-auth0";
import { Group, Member, Owe, Pay, Prisma, PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const settleExpenseInput: SettleExpenseInput = await request.json();
  const session = await getSession();
  const payor: Member | null = await prisma.member.findUnique({
    where: {
      name: session?.user?.name,
    },
  });
  const payee: Member | null = await prisma.member.findUnique({
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
    member: {
      connect: payor!,
    },
    group: {
      connect: group!,
    },
  };
  const expense = await prisma.expense.create({
    data: expenseCreateinput,
  });

  const payCreateInput: Prisma.PayCreateInput = {
    payor: {
      connect: payor!,
    },
    amount: settleExpenseInput.amount,
    expense: {
      connect: expense,
    },
  };

  const pay: Pay | null = await prisma.pay.create({
    data: payCreateInput,
  });

  await prisma.expense.update({
    where: {
      id: expense.id,
    },
    data: {
      pays: {
        connect: pay!,
      },
    },
  });

  return Response.json("Settled up successfully");
}
