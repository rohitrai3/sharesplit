import User from "@/app/components/user";
import Logout from "@/app/components/buttons/logout";
import Group from "@/app/components/group";
import Link from "next/link";
import { GroupItem } from "@/app/types";
import Expenses from "./expenses";
import Owe from "./owe";

export default async function ViewGroup({
  params,
}: {
  params: { id: string };
}) {
  const group: GroupItem = await fetch(
    `${process.env.HOSTNAME}/api/group/get/${params.id}`
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log("Error fetching group.", err));

  return (
    <div className="w-dvh h-dvh flex flex-col p-6 space-y-10">
      <User />
      <div className="flex-1 flex flex-col space-y-10 scroll-bar">
        <Group
          id={Number(params.id)}
          name={group.name}
          members={group.members}
          admin={group.admin}
          isAddMemberButtonVisible={true}
        />
        <Owe groupId={Number(params.id)} />
        <div className="flex-1 flex flex-col-reverse m-6 text-xl overflow-auto scroll-bar">
          <Expenses groupId={params.id} />
        </div>
      </div>
      <div className="flex justify-between">
        <Link
          href={{ pathname: "/expense/create", query: { groupId: params.id } }}
        >
          <button className="primary-button">Add expense</button>
        </Link>
        <Logout />
      </div>
    </div>
  );
}
