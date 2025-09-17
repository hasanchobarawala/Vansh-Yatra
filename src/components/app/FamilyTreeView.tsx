"use client";
import React from "react";

export default function FamilyTreeView() {
  return (
    <div className="p-6">
      {/* Parents */}
      <div className="flex justify-center items-center space-x-6">
        <div className="member-box">👨 Husband</div>
        <div className="member-box">👩 Wife</div>
      </div>

      {/* Line */}
      <div className="h-10 w-px bg-gray-500 mx-auto"></div>

      {/* Children */}
      <div className="flex justify-center space-x-6">
        <div className="member-box">👶 Child 1</div>
        <div className="member-box">👶 Child 2</div>
      </div>

      <style jsx>{`
        .member-box {
          padding: 8px 16px;
          border: 2px solid #d4af37;
          border-radius: 8px;
          background-color: #fffbea;
          font-weight: bold;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
