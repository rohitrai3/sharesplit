import { User } from "@prisma/client";

export type GroupProps = {
  id: number;
  name: string;
  members: User[];
  isAddMemberButtonVisible: boolean;
};

export default function Group({
  id,
  name,
  members,
  isAddMemberButtonVisible,
}: GroupProps) {
  return (
    <div className="flex justify-between">
      <div>
        <h2 className="text-xl">{name}</h2>
        <p className="text-xs opacity-50">
          {members.map((member, index) =>
            index === members.length - 1 ? member.name : member.name + ", "
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
