"use client";

import { SettleExpenseInput } from "@/app/types";
import { useState } from "react";

export type SettleProps = {
  groupId: number;
  name: string;
  amount: number;
};

export default function Settle({ groupId, name, amount }: SettleProps) {
  const [settleButtonColor, setSettleButtonColor] =
    useState<string>("bg-gold-dark");
  const [isSettling, setIsSettling] = useState<boolean>(false);
  const [settleButtonLabel, setSettleButtonLabel] = useState<string>("Settle");

  async function settle(name: string, amount: number) {
    setIsSettling(true);
    setSettleButtonLabel("Settling");
    setSettleButtonColor("bg-custom-gray");

    const settleExpenseInput: SettleExpenseInput = {
      name: name,
      amount: amount,
      groupId: groupId,
    };

    await fetch("/api/owe/settle", {
      method: "POST",
      body: JSON.stringify(settleExpenseInput),
    });

    setSettleButtonLabel("Settled");
  }

  return (
    <button
      className={`${settleButtonColor} text-black font-black rounded-full px-2 text-xs`}
      onClick={() => settle(name, amount)}
      disabled={isSettling}
    >
      {settleButtonLabel}
    </button>
  );
}
