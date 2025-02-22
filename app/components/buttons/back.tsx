import Link from "next/link";

export type BackProps = {
  page: string;
};

export default function Back({ page }: BackProps) {
  return (
    <Link href={`/${page}`}>
      <button className="secondary-button">Back</button>
    </Link>
  );
}
