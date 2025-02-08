import { GroupItem } from "@/app/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const group = await prisma.group.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      members: true,
      admin: true,
    },
  });

  const response: GroupItem = {
    id: group?.id!,
    name: group?.name!,
    members: group?.members!,
    admin: group?.admin!,
  };

  return Response.json(response);
}
