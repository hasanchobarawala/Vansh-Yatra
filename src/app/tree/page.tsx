"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import FamilyTreeContainer from "@/components/app/FamilyTreeContainer";
import AuthForm from "@/components/ui/AuthForm";
import FamilyTreeView from "@/components/app/FamilyTreeView";

export default function TreePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-neutral-300">
        Loading…
      </div>
    );
  }

  // Not logged in → show login/signup form here itself
  if (!user) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-4">
          Please log in to build your Family Tree
        </h1>
        <p className="text-neutral-300 mb-8">
          लॉग-इन करें और अपने family members को जोड़ना शुरू करें।
        </p>
        <AuthForm />
      </div>
    );
  }

  // Logged in → show the new demo layout + your existing realtime UI
  return (
    <div className="p-6 space-y-8">
      {/* 🔹 Demo: Husband–Wife–Children layout */}
      <FamilyTreeView />

      {/* 🔹 Your existing realtime members UI */}
      <FamilyTreeContainer />
    </div>
  );
}
