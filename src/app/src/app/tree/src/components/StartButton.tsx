"use client";
import { useRouter } from "next/navigation";

export default function StartButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/tree")}
      className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
    >
      Start Building Your Tree
    </button>
  );
}
