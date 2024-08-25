import { Member } from "@prisma/client";

export type GroupProps = {
  name: string;
  members: Member[];
};

export default function Group({ name, members }: GroupProps) {
  return (
    <div>
      <h2 className="text-xl">{name}</h2>
      <p className="text-xs opacity-50">
        {members.map((member, index) =>
          index === members.length - 1 ? member.name : member.name + ", "
        )}
      </p>
    </div>
  );
}
