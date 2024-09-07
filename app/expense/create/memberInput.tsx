export type MemberInputProps = {
  name: string;
};

export default function MemberInput({ name }: MemberInputProps) {
  return (
    <div className="flex space-x-2">
      <input type="checkbox" name="shikamaru" />
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
      />
    </div>
  );
}
