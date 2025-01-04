import { SettleExpenseData } from "@/app/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const owe = await prisma.owe.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      to: true,
    },
  });

  const settleExpenseData: SettleExpenseData = {
    id: owe?.id!,
    payee: owe?.to.name!,
    amount: owe?.amount!,
  };

  console.log("settleExpenseData: ", settleExpenseData);

  return Response.json(settleExpenseData);
}
