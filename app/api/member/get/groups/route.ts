import { GroupItem } from "@/app/types";
import { getSession } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const session = await getSession();
  const user = session?.user;
  const name = user?.name;
  const member = await prisma.user.findUnique({
    where: {
      name: name,
    },
    include: {
      memberOf: {
        include: {
          members: true,
          admin: true,
        },
      },
    },
  });

  const response: GroupItem[] = [];
  member?.memberOf.forEach((item) => {
    const group: GroupItem = {
      id: item.id,
      name: item.name,
      members: item.members,
      admin: item.admin
    }

    response.push(group);
  })

  return Response.json(response);
}
