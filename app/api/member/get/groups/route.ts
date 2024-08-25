import { getSession } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { user } = await getSession();
  const name = user.name;
  const member = await prisma.member.findUnique({
    where: {
      name: name,
    },
    include: {
      groups: {
        include: {
          members: true,
        },
      },
    },
  });

  return Response.json(member.groups);
}
