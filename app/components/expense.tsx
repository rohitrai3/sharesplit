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
      <span className="text-gold-light">{name}</span>
    ) : (
      <span>{name}</span>
    );
  }

  return (
    <div>
      <div
        className="flex space-x-1"
        onClick={() => setIsContentVisible(!isContentVisible)}
      >
        <p>{name}</p>
        <p className="overflow-hidden opacity-50">
          .........................................................................................................................................................
        </p>
        <p className="text-gold-light">₹{amount}</p>
      </div>
      <div className={`m-5 text-base ${isContentVisible ? "block" : "hidden"}`}>
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex space-x-1">
            {showUserName(transaction.user.name, transaction.isPayor)}
            <p className="overflow-hidden opacity-50">
              ..................................................................................................................................................................................................................................................................................................................
            </p>
            <p className="text-gold-light">₹{transaction.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
