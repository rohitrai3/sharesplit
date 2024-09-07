import { CreateExpenseInput } from "@/app/types";
import { getSession } from "@auth0/nextjs-auth0";
import { Group, Member, Prisma, PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const createExpenseInput: CreateExpenseInput = await request.json();
  const session = await getSession();
  const member: Member | null = await prisma.member.findUnique({
    where: {
      name: session?.user?.name,
    },
  });
  const group: Group | null = await prisma.group.findUnique({
    where: {
      id: createExpenseInput.groudId,
    },
  });
  const expenseInput: Prisma.ExpenseCreateInput = {
    name: createExpenseInput.name,
    amount: createExpenseInput.amount,
    member: {
      connect: member!,
    },
    group: {
      connect: group!,
    },
  };

  const expense = await prisma.expense.create({
    data: expenseInput,
  });

  const payInput: Prisma.PayCreateManyInput[] = [];
  for (const memberAmount of createExpenseInput.memberAmountList) {
    const payee: Member | null = await prisma.member.findUnique({
      where: {
        name: memberAmount.name,
      },
    });

    payInput.push({
      amount: memberAmount.amount,
      memberId: payee?.id!,
      expenseId: expense.id,
    });
  }

  await prisma.pay.createMany({
    data: payInput,
  });

  const pays = await prisma.pay.findMany({
    where: { expense: expense },
    select: {
      id: true,
    },
  });

  await prisma.expense.update({
    where: {
      id: expense.id,
    },
    data: {
      pays: {
        connect: pays,
      },
    },
  });

  return Response.json("Expense created successfully.");
}
