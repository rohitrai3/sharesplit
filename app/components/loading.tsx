export type LoadingProps = {
  name: string;
}

export default function Loading({ name }: LoadingProps) {
  return <h1>Loading {name}...</h1>;
}
