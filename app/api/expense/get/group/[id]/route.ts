import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const expenses = await prisma.expense.findMany({
    where: {
      groupId: Number(params.id),
    },
    include: {
      transactions: {
        include: {
          user: true,
        },
      },
    },
  });

  return Response.json(expenses);
}
