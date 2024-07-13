"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;

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
    <div className="w-dvh h-dvh flex flex-col">
      <h1 className="text-xl flex justify-center mt-6 text-gold-light">
        {user?.name}
      </h1>
      <div className="flex-1 flex flex-col-reverse m-6 text-xl">
        Sample group
      </div>
      <div className="flex justify-between m-6">
        <button className="primary-button">Create group</button>
        <a href="/api/auth/logout">
          <button className="secondary-button">Logout</button>
        </a>
      </div>
    </div>
  );
}
