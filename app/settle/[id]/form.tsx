"use client";

import Cancel from "@/app/components/buttons/cancel";
import Error from "@/app/components/error";
import { MAX_AMOUNT } from "@/app/constants";
import { SettleExpenseInput } from "@/app/types";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export type FormProps = {
  id: number;
  payee: string;
};

export default function Form({ id, payee }: FormProps) {
  const [addButtonStyle, setAddButtonStyle] =
    useState<string>("primary-button");
  const [addButtonLabel, setAddButtonLabel] = useState<string>("Settle");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [erroMessage, setErrorMessage] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormLoadingState(true);

    const formData = new FormData(event.currentTarget);
    const amount = Number(formData.get("amount"));
    const payor: string = formData.get("payor")?.toString()!;
    const settleExpenseInput: SettleExpenseInput = {
      id: id,
      payee: payee,
      amount: amount,
      payor: payor,
      groupId: Number(searchParams.get("groupId")),
    };

    if (amount > MAX_AMOUNT) {
          setShowErrorMessage(true);
    
          setErrorMessage(`Amount cannot be more than ${MAX_AMOUNT}`);
    
          setFormLoadingState(false);
    
          return;
        }

    if (amount < 0) {
      setShowErrorMessage(true);

      setErrorMessage("Amount cannot be negative");

      setFormLoadingState(false);

      return;
    }

    await fetch(`/api/owe/settle/${id}`, {
      method: "POST",
      body: JSON.stringify(settleExpenseInput),
    })
      .then((res) => {
        if (res.ok) {
          router.push(`/group/view/${searchParams.get("groupId")}`)
        }

        return res.json();
      })
      .then((data) => {
        setErrorMessage(data.error);
        setShowErrorMessage(true);
        setFormLoadingState(false);
      })
      .catch((err) => console.log("Error settling expense: ", err));
  }

  function setFormLoadingState(isLoading: boolean) {
    if (isLoading) {
      setIsLoading(true);
      setAddButtonLabel("Settling...");
      setAddButtonStyle("loading-button");
    } else {
      setIsLoading(false);
      setAddButtonLabel("Settle");
      setAddButtonStyle("primary-button");
    }
  }

  return (
    <div className="space-y-5">
      <form className="w-96 space-y-5" onSubmit={onSubmit}>
        <div className="flex flex-col space-y-2">
          <label className="text-sm">Enter settle amount</label>
          <input
            className="input-field"
            type="text"
            placeholder="1234"
            name="amount"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm">Enter payor name</label>
          <input
            className="input-field"
            type="text"
            placeholder="johndoe"
            name="payor"
            required
          />
        </div>
        <div className="flex justify-between">
          <input
            className={addButtonStyle}
            type="submit"
            value={addButtonLabel}
            disabled={isLoading}
          />
          <Cancel />
        </div>
      </form>
      {showErrorMessage && <Error message={erroMessage} />}
    </div>
  );
}
