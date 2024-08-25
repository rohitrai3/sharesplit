import Link from "next/link";
import Logout from "../components/buttons/logout";
import User from "../components/user";
import Groups from "./groups";

export default function Home() {
  return (
    <div className="w-dvh h-dvh flex flex-col p-6">
      <User />
      <div className="flex-1 flex flex-col-reverse m-6 text-xl">
        <Groups />
      </div>
      <div className="flex justify-between">
        <Link href="/create/group">
          <button className="primary-button">Create group</button>
        </Link>
        <Logout />
      </div>
    </div>
  );
}
