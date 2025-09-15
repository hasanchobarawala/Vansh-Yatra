"use client";

import FamilyTreeContainer from "@/components/FamilyTreeContainer";

export default function TreePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold text-center text-yellow-500 mt-6">
        आपका Family Tree
      </h1>
      <p className="text-center text-gray-300 mb-6">
        यहाँ आप अपने परिवार के सदस्यों को जोड़ और देख सकते हैं।
      </p>
      <FamilyTreeContainer />
      
      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 mt-10">
        App Developed by Hasan Chobarawala -91-9926652153
      </footer>
    </div>
  );
}
