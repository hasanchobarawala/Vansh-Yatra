"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

export default function AuthForm() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // toggle signup/login

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setEmail("");
      setPassword("");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (user) {
    return (
      <div className="flex gap-3 items-center">
        <span className="text-sm opacity-80">Hi, {user.email}</span>
        <button
          onClick={handleLogout}
          className="px-3 py-1 rounded bg-yellow-600 text-black"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-3 py-2 rounded border bg-transparent"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-3 py-2 rounded border bg-transparent"
      />
      <button
        type="submit"
        className="px-3 py-2 rounded bg-yellow-600 text-black"
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>
      <button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        className="text-xs underline"
      >
        {isLogin ? "Need an account? Sign up" : "Already have account? Login"}
      </button>
    </form>
  );
}
