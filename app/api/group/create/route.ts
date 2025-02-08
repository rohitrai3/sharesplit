import { User, Prisma, PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const session = await getSession();
  const user: string = session?.user?.name;
  const admin: User | null = await prisma.user.findUnique({
    where: {
      name: user,
    },
  });
  const name: string = formData.get("name")?.toString()!;
  const membersName: string[] = formData.get("members")?.toString().split(",")!;
  const members: User[] = [];

  membersName.forEach((name, index) => (membersName[index] = name.trim()));
  membersName.push(user);

  for (const name of membersName) {
    const member: User | null = await prisma.user.findUnique({
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
    admin: {
      connect: admin!,
    },
  };
  await prisma.group.create({
    data: groupInput,
  });

  return Response.json("Group created successfully.");
}
