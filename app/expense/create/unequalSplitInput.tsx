import { User } from "@prisma/client";

export type UnequalSplitInputProps = {
  memberList: User[];
};

export default function UnequalSplitInput({
  memberList,
}: UnequalSplitInputProps) {
  return (
    <>
      <div className="flex justify-between">
        <label className="text-sm">Member</label>
        <label className="text-sm">Enter amount</label>
      </div>
      <ul className="space-y-5">
        {memberList.map((member) => (
          <li key={member.id} className="flex space-x-2">
            <label className="text-sm">{member.name}</label>
            <p className="overflow-hidden opacity-50">
              .........................................................................................................................................................
            </p>
            <label className="text-sm">₹</label>
            <input
              className="input-field-amount"
              type="number"
              name={`${member.name}Amount`}
              placeholder="0"
            />
          </li>
        ))}
      </ul>
    </>
  );
}
