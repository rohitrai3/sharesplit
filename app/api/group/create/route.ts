import { Member, Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const session = await getSession();
  const user = session?.user;
  const owner: Member | null = await prisma.member.findUnique({
    where: {
      name: user?.name,
    },
  });
  const name: string = formData.get("name")?.toString()!;
  const membersName: string[] = formData.get("members")?.toString().split(",")!;
  membersName.forEach((name, index) => (membersName[index] = name.trim()));
  const members: Member[] = [owner!];
  for (const name of membersName) {
    const member: Member | null = await prisma.member.findUnique({
      where: {
        name: name,
      },
    });
    if (member) members.push(member);
  }
  const groupInput: Prisma.GroupCreateInput = {
    name: name,
    members: {
      connect: members,
    },
  };
  await prisma.group.create({
    data: groupInput,
  });

  return NextResponse.redirect(new URL("/home", request.url));
}
