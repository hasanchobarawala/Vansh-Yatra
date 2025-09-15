"use client";

import { useState } from "react";

type Member = {
  id: number;
  name: string;
  relation: string;
};

export default function FamilyTreeContainer() {
  const [members, setMembers] = useState<Member[]>([]);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");

  const addMember = () => {
    if (!name || !relation) return;
    setMembers([
      ...members,
      { id: Date.now(), name, relation },
    ]);
    setName("");
    setRelation("");
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
        Family Members
      </h2>

      {/* Add member form */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 rounded bg-neutral-800 text-white outline-none"
        />
        <input
          type="text"
          placeholder="Relation"
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
          className="px-3 py-2 rounded bg-neutral-800 text-white outline-none"
        />
        <button
          onClick={addMember}
          className="px-4 py-2 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-500"
        >
          Add
        </button>
      </div>

      {/* Members list */}
      {members.length === 0 ? (
        <p className="text-gray-400">No members added yet.</p>
      ) : (
        <ul className="space-y-2">
          {members.map((m) => (
            <li
              key={m.id}
              className="px-4 py-2 rounded bg-neutral-800"
            >
              <strong>{m.name}</strong> — {m.relation}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
