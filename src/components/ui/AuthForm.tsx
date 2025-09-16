"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      // persist session in localStorage (refresh ke baad bhi logged-in)
      await setPersistence(auth, browserLocalPersistence);

      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      }

      // success → /tree par le chalo
      router.push("/tree");
      router.refresh();
    } catch (err: any) {
      // readable message
      const msg =
        err?.code === "auth/invalid-credential"
          ? "गलत email या password."
          : err?.code === "auth/email-already-in-use"
          ? "यह email पहले से registered है."
          : err?.message || "Login/Signup में समस्या आई।";
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h3 className="text-xl font-bold text-black">
        {mode === "login" ? "Login" : "Create Account"}
      </h3>

      {error && (
        <div className="rounded-md bg-red-600/90 px-3 py-2 text-sm text-white">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-black">Email</label>
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-yellow-700 bg-white px-3 py-2 text-black outline-none focus:border-black"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-black">Password</label>
        <input
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-yellow-700 bg-white px-3 py-2 text-black outline-none focus:border-black"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-md bg-black px-4 py-2 font-semibold text-yellow-400 hover:bg-gray-900 disabled:opacity-60"
      >
        {busy ? (mode === "login" ? "Logging in…" : "Creating…") : mode === "login" ? "Login" : "Sign Up"}
      </button>

      <div className="text-center text-sm">
        {mode === "login" ? (
          <button
            type="button"
            onClick={() => setMode("signup")}
            className="underline text-black"
          >
            New here? Create an account
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setMode("login")}
            className="underline text-black"
          >
            Already have an account? Login
          </button>
        )}
      </div>
    </form>
  );
}
