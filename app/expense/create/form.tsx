"use client";

import Cancel from "@/app/components/buttons/cancel";
import { CreateExpenseInput, MemberAmount } from "@/app/types";
import { Member } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import MemberInput from "./memberInput";

export default function Form() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const memberAmountList: MemberAmount[] = [];
    members?.forEach((member) => {
      memberAmountList.push({
        name: member.name,
        amount: Number(formData.get(`${member.name}Amount`)),
      });
    });
    const createExpenseInput: CreateExpenseInput = {
      name: formData.get("name")?.toString()!,
      amount: Number(formData.get("amount")?.toString()!),
      groudId: Number(searchParams.get("groupId")),
      memberAmountList: memberAmountList,
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

  useEffect(() => {
    fetch(`/api/group/get/${Number(searchParams.get("groupId"))}`)
      .then((res) => res.json())
      .then((data) => setMembers(data.members))
      .catch((err) => console.log("Error fetching group.", err));
  }, []);

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
      <ul className="space-y-5">
        {members?.map((member) => (
          <li key={member.id}>
            <MemberInput name={member.name} />
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
        <input className="primary-button" type="submit" value="Save" />
        <Cancel />
      </div>
    </form>
  );
}
