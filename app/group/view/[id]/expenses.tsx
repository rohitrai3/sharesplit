"use client";

import Expense from "@/app/components/expense";
import { ExpenseWithPay } from "@/app/types";
import { useEffect, useState } from "react";

export type ExpensesProps = {
  groupId: string;
};

export default function Expenses({ groupId }: ExpensesProps) {
  const [expenses, setExpenses] = useState<ExpenseWithPay[]>([]);

  useEffect(() => {
    fetch(`/api/expense/get/group/${groupId}`)
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.log("Error fetching expenses: ", err));
  }, []);

  return (
    <div className="text-xl ml-6 space-y-10">
      {expenses.map((expense) => (
        <Expense
          key={expense.id}
          name={expense.name}
          amount={expense.amount}
          payList={expense.pays}
        />
      ))}
    </div>
  );
}
