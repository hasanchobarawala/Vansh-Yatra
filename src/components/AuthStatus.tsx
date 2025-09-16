"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AuthStatus() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-white/80 hidden sm:block">
        Hi,&nbsp;
        <b className="text-yellow-400">{user.email}</b>
      </span>
      <button
        onClick={() => signOut(auth)}
        className="px-3 py-1 rounded bg-red-600 hover:bg-red-500 text-white"
      >
        Logout
      </button>
    </div>
  );
}
