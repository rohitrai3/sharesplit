"use client";

import Cancel from "@/app/components/buttons/cancel";
import Logout from "@/app/components/buttons/logout";
import { LoadGroup } from "@/app/components/loadGroup";
import User from "@/app/components/user";
import { AddMemberRequest } from "@/app/types";
import { useRouter } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

export default function AddMember({ params }: { params: { id: string } }) {
  const router = useRouter();
  const id = Number(params.id);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [addButtonLabel, setAddButtonLabel] = useState<string>("Add member");
  const [addButtonStyle, setAddButtonStyle] =
    useState<string>("secondary-button");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsAdding(true);
    setAddButtonStyle("loading-button");
    setAddButtonLabel("Adding...");

    const formData = new FormData(event.currentTarget);
    const nameList: string[] = formData
      .get("members")
      ?.toString()
      .split(",")
      .map((name) => name.trim())!;
    const addMemberRequest: AddMemberRequest = {
      nameList: nameList,
    };

    await fetch(`/api/group/${id}/addMember`, {
      method: "PATCH",
      body: JSON.stringify(addMemberRequest),
    })
      .then((res) => {
        router.push(`/group/view/${id}`);
      })
      .catch((err) => console.log("Error creating group: ", err));
  }

  return (
    <div className="w-dvh h-dvh flex flex-col p-6 space-y-10">
      <User />
      <Suspense>
        <LoadGroup id={id} />
      </Suspense>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form className="space-y-10" onSubmit={onSubmit}>
          <div className="space-y-0.5">
            <label className="text-sm">Enter members name</label>
            <br />
            <input
              className="input-field"
              type="text"
              placeholder="ino, shikamaru, choji"
              name="members"
            />
          </div>
          <br />
          <div className="flex justify-between">
            <input
              className={addButtonStyle}
              type="submit"
              value={addButtonLabel}
              disabled={isAdding}
            />
            <Cancel />
          </div>
        </form>
      </div>
      <div className="place-self-end">
        <Logout />
      </div>
    </div>
  );
}
