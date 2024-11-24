import { Expense, Group, Member, Pay } from "@prisma/client";

export enum SplitType {
  EQUAL = "Equal",
  UNEQUAL = "Unequal",
}

export type GroupItem = Group & { members: Member[] };

export type CreateExpenseInput = {
  name: string;
  amount: number;
  groudId: number;
  memberAmountList: MemberAmount[];
};

export type SettleExpenseInput = {
  name: string;
  amount: number;
  groupId: number;
};

export type MemberAmount = {
  name: string;
  amount: number;
};

export type PayWithPayor = Pay & {
  payor: Member;
};

export type ExpenseWithPay = Expense & {
  pays: PayWithPayor[];
};

export type GetOweResponse = {
  oweFromList: OweMemberAmount[];
  oweToList: OweMemberAmount[];
};

export type OweMemberAmount = {
  name: string;
  amount: number;
};
