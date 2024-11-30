import { AddMemberRequest } from "@/app/types";
import { Member, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const groupId: number = Number(params.id);
  const addMemberRequest: AddMemberRequest = await request.json();
  const nameList = addMemberRequest.nameList;

  for (let i = 0; i < nameList.length; i++) {
    const member: Member | null = await prisma.member.findUnique({
      where: {
        name: nameList[i],
      },
    });

    if (member) {
      await prisma.group.update({
        where: {
          id: groupId,
        },
        data: {
          members: {
            connect: {
              id: member.id,
            },
          },
        },
      });
    }
  }

  return Response.json("Added members successfully");
}
