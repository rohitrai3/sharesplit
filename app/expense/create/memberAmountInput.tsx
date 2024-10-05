import { SplitType } from "@/app/types";
import { ChangeEvent, useEffect, useState } from "react";

export type MemberAmountInputProps = {
  name: string;
  splitType: SplitType;
  amount: number;
  incrementSelectedMembersCount: () => void;
  decrementSelectedMembersCount: () => void;
};

export default function MemberAmountInput({
  name,
  splitType,
  amount,
  incrementSelectedMembersCount,
  decrementSelectedMembersCount,
}: MemberAmountInputProps) {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    setIsSelected(splitType === SplitType.EQUAL);
  }, [splitType]);

  function updateSelectedMembersCount(event: ChangeEvent<HTMLInputElement>) {
    setIsSelected(!isSelected);

    if (event.currentTarget.checked) {
      incrementSelectedMembersCount();
    } else {
      decrementSelectedMembersCount();
    }
  }

  function getAmountIfSelected(): number {
    return isSelected ? amount : 0;
  }

  return (
    <div className="flex space-x-2">
      <input
        type="checkbox"
        name={`${name}IsSelected`}
        checked={isSelected}
        onChange={(e) => updateSelectedMembersCount(e)}
      />
      <label className="text-sm">{name}</label>
      <p className="overflow-hidden opacity-50">
        .........................................................................................................................................................
      </p>
      <label className="text-sm">₹</label>
      <input
        className="input-field-amount"
        type="text"
        placeholder="0"
        name={`${name}Amount`}
        value={getAmountIfSelected()}
      />
    </div>
  );
}
