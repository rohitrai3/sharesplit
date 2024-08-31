import Cancel from "@/app/components/buttons/cancel";
import Logout from "@/app/components/buttons/logout";
import Group from "@/app/components/group";
import User from "@/app/components/user";

export default function CreateExpense() {
  return (
    <div className="w-dvw h-dvh flex flex-col p-6 space-y-10">
      <User />
      <Group name="Ino-Shika-Cho" members={[]} />
      <div className="flex-1 flex justify-center items-end">
        <form className="w-96 space-y-5">
          <div className="flex flex-col space-y-2">
            <label className="text-sm">Enter expense name</label>
            <input
              className="input-field"
              type="text"
              placeholder="Supper"
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm">Enter total expense</label>
            <input
              className="input-field"
              type="text"
              placeholder="90"
              required
            />
          </div>
          <div className="flex justify-between">
            <label className="text-sm">Select members</label>
            <label className="text-sm">Enter amount</label>
          </div>
          <input className="mr-2" type="checkbox" name="Select all" />
          <label className="text-sm">Select all</label>
          <ul className="space-y-5">
            <li className="flex space-x-2">
              <input type="checkbox" name="shikamaru" />
              <label className="text-sm">shikamaru</label>
              <p className="overflow-hidden opacity-50">
                .........................................................................................................................................................
              </p>
              <label className="text-sm">₹</label>
              <input
                className="input-field-amount"
                type="text"
                placeholder="0"
              />
            </li>
            <li className="flex space-x-2">
              <input type="checkbox" name="choji" />
              <label className="text-sm">choji</label>
              <p className="overflow-hidden opacity-50">
                .........................................................................................................................................................
              </p>
              <label className="text-sm">₹</label>
              <input
                className="input-field-amount"
                type="text"
                placeholder="0"
              />
            </li>
            <li className="flex space-x-2">
              <input type="checkbox" name="ino" />
              <label className="text-sm">ino</label>
              <p className="overflow-hidden opacity-50">
                .........................................................................................................................................................
              </p>
              <label className="text-sm">₹</label>
              <input
                className="input-field-amount"
                type="text"
                placeholder="0"
              />
            </li>
          </ul>
          <div className="flex justify-between">
            <input className="primary-button" type="submit" value="Save" />
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
