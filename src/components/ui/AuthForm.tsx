"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("✅ Logged in successfully!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("✅ Account created successfully!");
      }
    } catch (error: any) {
      setMessage("❌ " + error.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full p-2 mb-4 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
/>

<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full p-2 mb-4 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
/>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm cursor-pointer text-blue-500" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
      </p>
      {message && <p className="mt-3 text-center text-red-500">{message}</p>}
    </div>
  );
}
