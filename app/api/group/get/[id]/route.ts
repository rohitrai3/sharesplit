import { Group, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const group: Group | null = await prisma.group.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      members: true,
    },
  });

  return Response.json(group);
}
