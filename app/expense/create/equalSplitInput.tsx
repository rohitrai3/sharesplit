import { User } from "@prisma/client";
import { ChangeEvent, useEffect, useState } from "react";

export type EqualSplitInputProps = {
  memberList: User[];
  totalExpense: number;
};

export default function EqualSplitInput({
  memberList,
  totalExpense,
}: EqualSplitInputProps) {
  const [isSelectAll, setIsSelectAll] = useState<boolean>(true);
  const [splittedAmount, setSplittedAmount] = useState<number>(0);
  const [selectedMemberCount, setSelectedMemberCount] = useState<number>(0);
  const [selectMemberMap, setSelectMemberMap] = useState<Map<string, boolean>>(
    new Map()
  );

  useEffect(() => {
    setSplittedAmount(
      totalExpense === 0 ? 0 : totalExpense / selectedMemberCount
    );
  }, [totalExpense, selectedMemberCount]);

  useEffect(() => {
    setSelectedMemberCount(memberList.length);
  }, [memberList]);

  useEffect(() => {
    memberList.forEach((member) =>
      selectMemberMap.set(`${member.name}IsSelected`, true)
    );
  }, [memberList, isSelectAll]);

  function updateSelectedMembersCount(
    event: ChangeEvent<HTMLInputElement>,
    name: string
  ) {
    if (event.currentTarget.checked) {
      selectMemberMap.set(name, true);
      setSelectedMemberCount(selectedMemberCount + 1);
    } else {
      selectMemberMap.set(name, false);
      setSelectedMemberCount(selectedMemberCount - 1);
    }
  }

  function getAmount(name: string): number {
    return selectMemberMap.get(name) ? splittedAmount : 0;
  }

  function selectAllMembers(event: ChangeEvent<HTMLInputElement>) {
    setIsSelectAll(event.currentTarget.checked);
    setSelectedMemberCount(memberList.length);
  }

  return (
    <>
      <div className="flex justify-between">
        <div className="space-x-2">
          <input
            id="selectAll"
            type="checkbox"
            name="selectAll"
            checked={isSelectAll}
            onChange={(e) => selectAllMembers(e)}
          />
          <label className="text-sm" htmlFor="selectAll">
            Select all
          </label>
        </div>
        <label className="text-sm">Amount</label>
      </div>
      <ul className="space-y-5">
        {memberList.map((member) => (
          <li key={member.id} className="flex space-x-2">
            {isSelectAll ? (
              <input
                type="checkbox"
                name={`${member.name}IsSelected`}
                checked
                readOnly
              />
            ) : (
              <input
                type="checkbox"
                name={`${member.name}IsSelected`}
                onChange={(e) =>
                  updateSelectedMembersCount(e, `${member.name}IsSelected`)
                }
              />
            )}
            <label className="text-sm">{member.name}</label>
            <p className="overflow-hidden opacity-50">
              .........................................................................................................................................................
            </p>
            <label className="text-sm">₹</label>
            <input
              className="input-field-amount border-none"
              name={`${member.name}Amount`}
              value={getAmount(`${member.name}IsSelected`)}
              readOnly
            />
          </li>
        ))}
      </ul>
    </>
  );
}
