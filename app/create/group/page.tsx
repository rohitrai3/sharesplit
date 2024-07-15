import Image from "next/image";
import User from "../../components/user";
import Logout from "../../components/buttons/logout";
import Cancel from "../../components/buttons/cancel";

export default function CreateGroup() {
  return (
    <div className="w-dvh h-dvh flex flex-col p-6">
      <User />
      <div className="flex-1 flex flex-col justify-center items-center">
        <Image
          className="mb-20"
          src="/group_icon.svg"
          alt="Group icon"
          width={128}
          height={128}
        />
        <form className="space-y-10">
          <div className="space-y-0.5">
            <label className="text-sm">Enter group name</label>
            <br />
            <input
              className="input-field"
              type="text"
              placeholder="Ino-Shika-Cho"
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
            />
          </div>
          <br />
          <div className="flex justify-between">
            <input
              className="primary-button"
              type="submit"
              value="Create group"
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
