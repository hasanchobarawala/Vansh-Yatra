"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

import AuthStatus from "@/components/AuthStatus";
import AuthForm from "@/components/ui/AuthForm";
import FamilyTreeContainer from "@/components/app/FamilyTreeContainer";

export default function TreePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* top bar */}
      <div className="w-full max-w-6xl mx-auto px-4 flex items-center justify-end py-4">
        <AuthStatus />
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 pb-20">
        {!user ? (
          <div className="max-w-md mx-auto bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
            <AuthForm />
          </div>
        ) : (
          <FamilyTreeContainer />
        )}
      </div>
    </main>
  );
}
