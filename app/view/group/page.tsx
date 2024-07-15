import Image from "next/image";
import User from "@/app/components/user";
import Logout from "@/app/components/buttons/logout";
import Group from "@/app/components/group";

export default function ViewGroup() {
  return (
    <div className="w-dvh h-dvh flex flex-col p-6">
      <User />
      <div className="flex-1 flex flex-col space-y-10">
        <Group />
        <div className="text-sm text-gold-light ml-6">
          <p>You owe ₹70 to ino</p>
          <p>choji owes ₹70 to you</p>
        </div>
        <ul className="text-xl ml-6">
          <li className="flex justify-between space-x-1">
            <p>Breakfast</p>
            <p className="overflow-hidden">
              .........................................................................................................................................................
            </p>
            <p className="text-gold-light">₹480</p>
          </li>
          <li className="flex justify-between space-x-1">
            <p>Lunch</p>
            <p className="overflow-hidden">
              .........................................................................................................................................................
            </p>
            <p className="text-gold-light">₹630</p>
          </li>
          <li className="flex justify-between space-x-1">
            <p>Dinner</p>
            <p className="overflow-hidden">
              .........................................................................................................................................................
            </p>
            <p className="text-gold-light">₹180</p>
          </li>
        </ul>
      </div>
      <div className="flex justify-between">
        <button className="primary-button">Add expense</button>
        <Logout />
      </div>
    </div>
  );
}
