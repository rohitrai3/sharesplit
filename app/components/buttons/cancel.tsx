"use client";

import { useRouter } from "next/navigation";

export default function Cancel() {
  const router = useRouter();

  return (
    <button
      className="font-black text-xs px-6 py-3 opacity-50"
      onClick={router.back}
    >
      Cancel
    </button>
  );
}
