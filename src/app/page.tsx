"use client";

import dynamic from "next/dynamic";

// SSR off, ताकि client-only libs/refs में दिक्कत न हो
const FamilyTreeContainer = dynamic(
  () => import("@/components/app/FamilyTreeContainer"),
  { ssr: false }
);

export default function TreePage() {
  return (
    <main className="px-4 pb-24">
      <h1 className="text-center text-4xl font-bold text-yellow-500 mt-2">
        आपका Family Tree
      </h1>
      <p className="text-center text-gray-300 mb-6">
        यहाँ आप अपने परिवार के सदस्यों को जोड़ और देख सकते हैं।
      </p>

      {/* 🔥 आपके पूरे फीचर्स (photo, DOB/DOD, stories, आदि) इसी container के अंदर हैं */}
      <FamilyTreeContainer />
    </main>
  );
}
