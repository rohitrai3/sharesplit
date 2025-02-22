import { useState } from "react";
import { TransactionItem } from "../types";

export type ExpenseProp = {
  name: string;
  amount: number;
  transactions: TransactionItem[];
};

export default function Expense({ name, amount, transactions }: ExpenseProp) {
  const [isContentVisible, setIsContentVisible] = useState<boolean>(false);
  function showUserName(name: string, isPayor: boolean) {
    return isPayor ? (
      <span className="text-gold-light flex-none">{name} owes</span>
    ) : (
      <span className="flex-none">{name} owes</span>
    );
  }

  return (
    <div>
      <div
        className="flex space-x-1"
        onClick={() => setIsContentVisible(!isContentVisible)}
      >
        <span className="flex-none">{name}</span>
        <span className="overflow-hidden opacity-50">
          .........................................................................................................................................................
        </span>
        <span className="text-gold-light">₹{amount}</span>
      </div>
      <div className={`m-5 text-base ${isContentVisible ? "block" : "hidden"}`}>
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex space-x-1">
            {showUserName(transaction.user.name, transaction.isPayor)}
            <span className="overflow-hidden opacity-50">
              ..................................................................................................................................................................................................................................................................................................................
            </span>
            <span className="text-gold-light">₹{transaction.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
