import Logout from "@/app/components/buttons/logout";
import User from "@/app/components/user";
import Form from "./form";
import { SettleExpenseData } from "@/app/types";
import Loading from "@/app/components/loading";

export default async function Settle({ params }: { params: { id: string } }) {
  const id: number = Number(params.id);
  const settleExpenseData: SettleExpenseData = await fetch(
    `${process.env.HOSTNAME}/api/owe/get/${id}`
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log("Error fetching owe.", err));

  return (
    <div className="w-dvw h-dvh flex flex-col p-6 space-y-10">
      <User />
      {settleExpenseData ? (
        <>
          <h1>
            You owe ₹{settleExpenseData.amount} to {settleExpenseData.payee}
          </h1>
          <div className="flex-1 flex justify-center items-end">
            <Form id={id} payee={settleExpenseData.payee} />
          </div>
        </>
      ) : (
        <Loading />
      )}

      <div className="place-self-end">
        <Logout />
      </div>
    </div>
  );
}
