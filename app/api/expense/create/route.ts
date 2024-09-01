import { CreateExpenseInput } from "@/app/types";
import { getSession } from "@auth0/nextjs-auth0";
import { Group, Member, Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

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

  await prisma.expense.create({
    data: expenseInput,
  });

  return Response.json("Expense created successfully.");
}
