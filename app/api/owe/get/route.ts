import { GetOweResponse, OweMemberAmount } from "@/app/types";
import { getSession } from "@auth0/nextjs-auth0";
import { Member, PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const oweFromList: OweMemberAmount[] = [];
  const oweToList: OweMemberAmount[] = [];
  const session = await getSession();

  if (session && session.user) {
    const member: Member | null = await prisma.member.findUnique({
      where: {
        name: session.user.name,
      },
    });

    if (member) {
      const oweFromListResponse = await prisma.owe.findMany({
        where: {
          toMemberId: member.id,
        },
        include: {
          from: true,
        },
      });
      oweFromListResponse.forEach((oweFrom) => {
        if (oweFrom.amount) {
          oweFromList.push({ name: oweFrom.from.name, amount: oweFrom.amount });
        }
      });

      const oweToListResponse = await prisma.owe.findMany({
        where: {
          fromMemberId: member.id,
        },
        include: {
          to: true,
        },
      });
      oweToListResponse.forEach((oweTo) => {
        if (oweTo.amount) {
          oweToList.push({ name: oweTo.to.name, amount: oweTo.amount });
        }
      });
    }
  }

  const getOweResponse: GetOweResponse = {
    oweFromList: oweFromList,
    oweToList: oweToList,
  };

  return Response.json(getOweResponse);
}
