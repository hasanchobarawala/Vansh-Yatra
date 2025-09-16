"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

import AuthForm from "@/components/ui/AuthForm";
import AuthStatus from "@/components/AuthStatus";

export default function HomePage() {
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

      <div className="w-full max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT: Hero text */}
        <section className="py-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 mb-4">
            Vansh Yatra
          </h1>
          <p className="text-2xl text-white/90 mb-8">जानो अपनी जड़ें, बनाओ अपना वंश।</p>

          <p className="max-w-2xl text-white/80 leading-8 mb-10">
            वंश यात्रा एक अनोखा ऐप है जो आपके कुल व वंश की जानकारी को
            डिजिटल रूप में सुरक्षित करता है। इस ऐप के माध्यम से आप अपने पूर्वजों की
            पीढ़ी-दर-पीढ़ी जानकारी एक ही स्थान पर जोड़ सकते हैं। परिवार वृक्ष के
            रूप में सभी रिश्तों को सहज रूप से देखना बहुत आसान है।
          </p>

          <Link
            href="/tree"
            className="inline-block rounded bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3"
          >
            Start Building Your Tree
          </Link>

          <p className="mt-6 text-white/60">
            Your family tree is empty. Click the button to begin your Family Journey.
          </p>

          <p className="mt-16 text-center text-white/60 text-sm">
            App Developed by Hasan Chobarawala · +91-9926652153
          </p>
        </section>

        {/* RIGHT: Login card (only if NOT logged in) */}
        {!user && (
          <section className="flex justify-center md:justify-end">
            <div className="w-full max-w-md bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
              <AuthForm />
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
