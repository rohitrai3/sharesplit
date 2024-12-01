"use client";

import Logout from "@/app/components/buttons/logout";
import Form from "./form";
import { Suspense } from "react";
import Header from "../header";

export default function CreateExpense() {
  return (
    <Suspense>
      <div className="w-dvw h-dvh flex flex-col p-6 space-y-10">
        <Header />
        <div className="flex-1 flex justify-center items-end">
          <Form />
        </div>
        <div className="place-self-end">
          <Logout />
        </div>
      </div>
    </Suspense>
  );
}
