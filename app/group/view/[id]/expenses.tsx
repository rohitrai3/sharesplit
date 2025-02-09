"use client";

import Expense from "@/app/components/expense";
import Loading from "@/app/components/loading";
import { ExpenseItem } from "@/app/types";
import { useEffect, useState } from "react";

export type ExpensesProps = {
  groupId: string;
};

export default function Expenses({ groupId }: ExpensesProps) {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`/api/expense/get/group/${groupId}`)
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching expenses: ", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="text-xl ml-6 space-y-10 scroll-bar">
      {isLoading ? (
        <Loading />
      ) : (
        expenses.map((expense) => (
          <Expense
            key={expense.id}
            name={expense.name}
            amount={expense.amount}
            transactions={expense.transactions}
          />
        ))
      )}
    </div>
  );
}
