"use client";

import User from "../../components/user";
import Logout from "../../components/buttons/logout";
import Cancel from "../../components/buttons/cancel";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateGroup() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createButtonLabel, setCreateButtonLabel] = useState<string>("Create");
  const [createButtonStyle, setCreateButtonStyle] =
    useState<string>("primary-button");
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setCreateButtonStyle("loading-button");

    setCreateButtonLabel("Creating...");
    const formData = new FormData(event.currentTarget);
    await fetch("/api/group/create", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        router.push("/home");
      })
      .catch((err) => console.log("Error creating group: ", err));
  }
  return (
    <div className="w-dvh h-dvh flex flex-col p-6">
      <User />
      <div className="flex-1 flex flex-col justify-center items-center">
        <form className="space-y-10" onSubmit={onSubmit}>
          <div className="space-y-0.5">
            <label className="text-sm">Enter group name</label>
            <br />
            <input
              className="input-field"
              type="text"
              placeholder="Ino-Shika-Cho"
              name="name"
              required
            />
          </div>
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
              className={createButtonStyle}
              type="submit"
              value={createButtonLabel}
              disabled={isLoading}
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
