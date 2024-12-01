import { useSearchParams } from "next/navigation";
import { LoadGroup } from "../components/loadGroup";
import User from "../components/user";

export default function Header() {
  const searchParams = useSearchParams();
  const id: number = Number(searchParams.get("groupId"));

  return (
    <div className="space-y-10">
      <User />
      <LoadGroup id={id} />
    </div>
  );
}
