import { User } from "@prisma/client";

export type GroupProps = {
  id: number;
  name: string;
  members: User[];
  admin: User;
  isAddMemberButtonVisible: boolean;
};

export default function Group({
  id,
  name,
  members,
  admin,
  isAddMemberButtonVisible,
}: GroupProps) {
  function showMemberName(name: string, isLast: boolean, key: number) {
    const isAdmin: boolean = admin.name === name;
    if (!isLast) {
      name = name.concat(", ");
    }

    return isAdmin ? <span key={key} className="text-gold-light">{name}</span> : <span key={key}>{name}</span>
  }

  return (
    <div className="flex justify-between">
      <div>
        <h2 className="text-xl">{name}</h2>
        <p className="text-xs opacity-50">
          {members.map((member, index) =>
            index === members.length - 1 ? showMemberName(member.name, true, index) : showMemberName(member.name, false, index)
          )}
        </p>
      </div>
      {isAddMemberButtonVisible && (
        <a href={`/group/${id}/addMember`}>
          <button className="secondary-button" type="button">
            Add member
          </button>
        </a>
      )}
    </div>
  );
}
