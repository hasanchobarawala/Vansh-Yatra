"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

// 👇 agar yeh component aapke repo me hai (screenshot me dikh raha tha)
import FamilyTreeContainer from "@/components/app/FamilyTreeContainer";

export default function TreePage() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
    });
    return () => unsub();
  }, []);

  if (checking) {
    return <div className="p-8 text-center">Loading…</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-3">
        <h2 className="text-2xl">Please login first</h2>
        <a className="underline" href="/">Go back to Home</a>
      </div>
    );
  }

  // ✅ logged-in: show your tree UI
  return (
    <main className="min-h-screen">
      <FamilyTreeContainer />
    </main>
  );
}
