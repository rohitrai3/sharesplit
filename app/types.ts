import { Group, Member } from "@prisma/client";

export type GroupItem = Group & { members: Member[] };

export type CreateExpenseInput = {
  name: string;
  amount: number;
  groudId: number;
};
