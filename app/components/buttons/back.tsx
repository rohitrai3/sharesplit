"use client";

import { useRouter } from "next/navigation";

export default function Back() {
  const router = useRouter();

  return (
    <div className="secondary-button" onClick={() => router.back()}>
      Back
    </div>
  );
}
