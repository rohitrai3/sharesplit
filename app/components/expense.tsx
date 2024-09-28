import { PayWithPayee } from "../types";

export type ExpenseProp = {
  name: string;
  amount: number;
  payList: PayWithPayee[];
};

export default function Expense({ name, amount, payList }: ExpenseProp) {
  return (
    <div>
      <div className="flex space-x-1">
        <p>{name}</p>
        <p className="overflow-hidden opacity-50">
          .........................................................................................................................................................
        </p>
        <p className="text-gold-light">₹{amount}</p>
      </div>
      <div className="m-5 text-base">
        {payList.map((pay) => (
          <div key={pay.id} className="flex space-x-1">
            <p>{pay.payee.name}</p>
            <p className="overflow-hidden opacity-50">
              ..................................................................................................................................................................................................................................................................................................................
            </p>
            <p className="text-gold-light">₹{pay.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
