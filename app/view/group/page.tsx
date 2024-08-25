import User from "@/app/components/user";
import Logout from "@/app/components/buttons/logout";
import Group from "@/app/components/group";
import Link from "next/link";

export default function ViewGroup() {
  return (
    <div className="w-dvh h-dvh flex flex-col p-6 space-y-10">
      <User />
      <div className="flex-1 flex flex-col space-y-10">
        <Group name="Ino-Shika-Cho" members={[]} />
        <div className="text-sm text-gold-light ml-6">
          <p>You owe ₹70 to ino</p>
          <p>choji owes ₹70 to you</p>
        </div>
        <ul className="text-xl ml-6">
          <li className="flex space-x-1">
            <p>Breakfast</p>
            <p className="overflow-hidden opacity-50">
              .........................................................................................................................................................
            </p>
            <p className="text-gold-light">₹480</p>
          </li>
          <li className="flex space-x-1">
            <p>Lunch</p>
            <p className="overflow-hidden opacity-50">
              .........................................................................................................................................................
            </p>
            <p className="text-gold-light">₹630</p>
          </li>
          <li className="flex space-x-1">
            <p>Dinner</p>
            <p className="overflow-hidden opacity-50">
              .........................................................................................................................................................
            </p>
            <p className="text-gold-light">₹180</p>
          </li>
        </ul>
      </div>
      <div className="flex justify-between">
        <Link href="/create/expense">
          <button className="primary-button">Add expense</button>
        </Link>
        <Logout />
      </div>
    </div>
  );
}
