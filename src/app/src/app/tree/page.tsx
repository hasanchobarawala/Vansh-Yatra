"use client";

import FamilyTreeContainer from "@/components/FamilyTreeContainer";
import { useState } from "react";

export default function TreePage() {
  const [showTree, setShowTree] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-12">
      {/* Title */}
      <h1 className="text-4xl font-bold text-yellow-500 mb-4">My Family Tree</h1>
      <p className="text-gray-300 mb-8">
        यहां आप अपने परिवार की जानकारी जोड़कर डिजिटल फैमिली ट्री बना सकते हैं।
      </p>

      {/* Button → Show Tree */}
      {!showTree ? (
        <button
          onClick={() => setShowTree(true)}
          className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
        >
          Add Members & Build Tree
        </button>
      ) : (
        <div className="w-full max-w-5xl bg-neutral-900 p-6 rounded-lg shadow">
          <FamilyTreeContainer />
        </div>
      )}
    </main>
  );
}
