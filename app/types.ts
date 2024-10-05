import { Expense, Group, Member, Pay } from "@prisma/client";

export type GroupItem = Group & { members: Member[] };

export type CreateExpenseInput = {
  name: string;
  amount: number;
  groudId: number;
  memberAmountList: MemberAmount[];
};

export type MemberAmount = {
  name: string;
  amount: number;
};

export type PayWithPayee = Pay & {
  payee: Member;
};

export type ExpenseWithPay = Expense & {
  pays: PayWithPayee[];
};

export enum SplitType {
  EQUAL = "Equal",
  UNEQUAL = "Unequal",
}
