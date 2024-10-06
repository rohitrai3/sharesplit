"use client";

import Logout from "@/app/components/buttons/logout";
import User from "@/app/components/user";
import Form from "./form";
import { Suspense } from "react";
import { LoadGroup } from "./loadGroup";

export default function CreateExpense() {
  return (
    <div className="w-dvw h-dvh flex flex-col p-6 space-y-10">
      <User />
      <Suspense>
        <LoadGroup />
      </Suspense>
      <div className="flex-1 flex justify-center items-end">
        <Suspense>
          <Form />
        </Suspense>
      </div>
      <div className="place-self-end">
        <Logout />
      </div>
    </div>
  );
}
