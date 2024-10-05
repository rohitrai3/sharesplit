"use client";

import Cancel from "@/app/components/buttons/cancel";
import { CreateExpenseInput, MemberAmount, SplitType } from "@/app/types";
import { Member } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import EqualSplitInput from "./equalSplitInput";
import UnequalSplitInput from "./unequalSplitInput";

export default function Form() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [memberList, setMemberList] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addButtonLabel, setAddButtonLabel] = useState<string>("Add");
  const [addButtonStyle, setAddButtonStyle] =
    useState<string>("primary-button");
  const [activeSplitType, setActiveSplitType] = useState<SplitType>(
    SplitType.EQUAL
  );
  const [totalExpense, setTotalExpense] = useState<number>(0);

  useEffect(() => {
    fetch(`/api/group/get/${Number(searchParams.get("groupId"))}`)
      .then((res) => res.json())
      .then((data) => {
        setMemberList(data.members);
      })
      .catch((err) => console.log("Error fetching group.", err));
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setAddButtonLabel("Adding...");
    setAddButtonStyle("loading-button");

    const formData = new FormData(event.currentTarget);
    const memberAmountList: MemberAmount[] = [];

    if (activeSplitType === SplitType.EQUAL) {
      memberList?.forEach((member) => {
        if (formData.get(`${member.name}IsSelected`) === "on") {
          memberAmountList.push({
            name: member.name,
            amount: Number(formData.get(`${member.name}Amount`)),
          });
        }
      });
    } else {
      memberList?.forEach((member) => {
        if (Number(formData.get(`${member.name}Amount`)) !== 0) {
          memberAmountList.push({
            name: member.name,
            amount: Number(formData.get(`${member.name}Amount`)),
          });
        }
      });
    }

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
    })
      .then((res) => router.push(`/group/view/${searchParams.get("groupId")}`))
      .catch((err) => console.log("Error adding expense: ", err));
  }

  function getMemberAmountFormInput() {
    switch (activeSplitType) {
      case SplitType.EQUAL: {
        return (
          <EqualSplitInput
            memberList={memberList}
            totalExpense={totalExpense}
          />
        );
      }
      case SplitType.UNEQUAL: {
        return <UnequalSplitInput memberList={memberList} />;
      }
      default: {
        return <p>Split type does not exist</p>;
      }
    }
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
          onChange={(e) => setTotalExpense(Number(e.target.value))}
        />
      </div>
      <div className="flex justify-around text-sm">
        {Object.values(SplitType).map((value, index) => (
          <p
            key={index}
            className={
              value === activeSplitType
                ? "cursor-pointer"
                : "cursor-pointer opacity-50"
            }
            onClick={() => setActiveSplitType(value)}
          >
            {value}
          </p>
        ))}
      </div>
      {getMemberAmountFormInput()}
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
  );
}
