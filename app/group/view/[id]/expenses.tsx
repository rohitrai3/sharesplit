"use client";

import { Expense } from "@prisma/client";
import { useEffect, useState } from "react";

export type ExpensesProps = {
  groupId: string;
};

export default function Expenses({ groupId }: ExpensesProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    fetch(`/api/expense/get/group/${groupId}`)
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.log("Error fetching expenses: ", err));
  }, []);

  return (
    <div className="text-xl ml-6 space-y-10">
      {expenses.map((expense) => (
        <div className="flex space-x-1" key={expense.id}>
          <p>{expense.name}</p>
          <p className="overflow-hidden opacity-50">
            .........................................................................................................................................................
          </p>
          <p className="text-gold-light">₹{expense.amount}</p>
        </div>
      ))}
    </div>
  );
}
