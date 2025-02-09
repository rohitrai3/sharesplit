import { Expense, User, Transaction } from "@prisma/client";

export enum SplitType {
  EQUAL = "Equal",
  UNEQUAL = "Unequal",
}

export type CreateExpenseInput = {
  name: string;
  amount: number;
  groudId: number;
  memberAmountList: MemberAmount[];
};

export type SettleExpenseInput = {
  id: number;
  payee: string;
  amount: number;
  groupId: number;
};

export type SettleExpenseData = {
  id: number;
  payee: string;
  amount: number;
};

export type MemberAmount = {
  name: string;
  amount: number;
};

export type TransactionItem = {
  id: number;
  amount: number;
  isPayor: boolean;
  user: User;
};

export type ExpenseItem = {
  id: number,
  name: string,
  amount: number,
  transactions: TransactionItem[]
};

export type GetOweResponse = {
  oweFromList: OweMemberAmount[];
  oweToList: OweMemberAmount[];
};

export type OweMemberAmount = {
  id: number;
  name: string;
  amount: number;
};

export type AddMemberRequest = {
  nameList: string[];
};

export type GroupItem = {
  id: number;
  name: string;
  members: User[];
  admin: User;
};
