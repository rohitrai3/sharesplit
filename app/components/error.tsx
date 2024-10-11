export type ErrorProps = {
  message: string;
};

export default function Error({ message }: ErrorProps) {
  return (
    <div className="bg-error-red text-xs p-2 rounded-md">
      <p>{message}</p>
    </div>
  );
}
