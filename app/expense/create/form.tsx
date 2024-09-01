"use client";

import Cancel from "@/app/components/buttons/cancel";
import { CreateExpenseInput } from "@/app/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Form() {
  const searchParams = useSearchParams();
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const createExpenseInput: CreateExpenseInput = {
      name: formData.get("name")?.toString()!,
      amount: Number(formData.get("amount")?.toString()!),
      groudId: Number(searchParams.get("groupId")),
    };

    await fetch(`/api/expense/create`, {
      method: "POST",
      body: JSON.stringify(createExpenseInput),
      headers: {
        "Contenct-Type": "application/json",
      },
    });

    router.push(`/group/view/${searchParams.get("groupId")}`);
  }

  return (
    <form className="w-96 space-y-5" onSubmit={onSubmit}>
      <div className="flex flex-col space-y-2">
        <label className="text-sm">Enter expense name</label>
        <input
          className="input-field"
          type="text"
          placeholder="Supper"
          name="name"
          required
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-sm">Enter total expense</label>
        <input
          className="input-field"
          type="text"
          placeholder="90"
          name="amount"
          required
        />
      </div>
      <div className="flex justify-between">
        <label className="text-sm">Select members</label>
        <label className="text-sm">Enter amount</label>
      </div>
      <input className="mr-2" type="checkbox" name="Select all" />
      <label className="text-sm">Select all</label>
      <ul className="space-y-5">
        <li className="flex space-x-2">
          <input type="checkbox" name="shikamaru" />
          <label className="text-sm">shikamaru</label>
          <p className="overflow-hidden opacity-50">
            .........................................................................................................................................................
          </p>
          <label className="text-sm">₹</label>
          <input className="input-field-amount" type="text" placeholder="0" />
        </li>
        <li className="flex space-x-2">
          <input type="checkbox" name="choji" />
          <label className="text-sm">choji</label>
          <p className="overflow-hidden opacity-50">
            .........................................................................................................................................................
          </p>
          <label className="text-sm">₹</label>
          <input className="input-field-amount" type="text" placeholder="0" />
        </li>
        <li className="flex space-x-2">
          <input type="checkbox" name="ino" />
          <label className="text-sm">ino</label>
          <p className="overflow-hidden opacity-50">
            .........................................................................................................................................................
          </p>
          <label className="text-sm">₹</label>
          <input className="input-field-amount" type="text" placeholder="0" />
        </li>
      </ul>
      <div className="flex justify-between">
        <input className="primary-button" type="submit" value="Save" />
        <Cancel />
      </div>
    </form>
  );
}
