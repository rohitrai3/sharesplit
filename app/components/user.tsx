"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "./loading";

export default function User() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <Loading name="user" />;

  if (error) return <div>{error.message}</div>;

  if (!user) {
    router.replace("/");

    return (
      <div>
        Not loggedin, Redirecting to Login page...
        <br />
        <Link href="/">Click here to redirect now.</Link>
      </div>
    );
  }

  return (
    <Link className="text-xl flex justify-center text-gold-light" href="/home">
      {user?.name}
    </Link>
  );
}
