import Logout from "@/app/components/buttons/logout";
import Group from "@/app/components/group";
import User from "@/app/components/user";
import Form from "./form";
import { Suspense } from "react";

export default function CreateExpense() {
  return (
    <div className="w-dvw h-dvh flex flex-col p-6 space-y-10">
      <User />
      <Group name="Ino-Shika-Cho" members={[]} />
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
