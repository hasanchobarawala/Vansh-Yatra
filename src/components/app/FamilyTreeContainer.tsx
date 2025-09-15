"use client";

import { useState } from "react";

interface FamilyMember {
  id: number;
  name: string;
  relation: string;
  birthDate?: string;
  deathDate?: string;
  photo?: string;
  story?: string;
}

export default function FamilyTreeContainer() {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [deathDate, setDeathDate] = useState("");
  const [story, setStory] = useState("");
  const [photo, setPhoto] = useState("");

  const addMember = () => {
    if (!name || !relation) return;

    const newMember: FamilyMember = {
      id: Date.now(),
      name,
      relation,
      birthDate,
      deathDate,
      story,
      photo,
    };

    setMembers((m) => [...m, newMember]);

    setName("");
    setRelation("");
    setBirthDate("");
    setDeathDate("");
    setStory("");
    setPhoto("");
  };

  return (
    <div className="p-4 text-white">
      {/* Form */}
      <div className="mx-auto mb-6 grid max-w-2xl grid-cols-1 gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full rounded bg-gray-800 p-2 outline-none"
        />
        <input
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
          placeholder="Relation (e.g., Father, Mother, Brother)"
          className="w-full rounded bg-gray-800 p-2 outline-none"
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder="Date of Birth"
            className="w-full rounded bg-gray-800 p-2 outline-none"
          />
          <input
            type="date"
            value={deathDate}
            onChange={(e) => setDeathDate(e.target.value)}
            placeholder="Date of Death (optional)"
            className="w-full rounded bg-gray-800 p-2 outline-none"
          />
        </div>
        <input
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          placeholder="Photo URL (optional)"
          className="w-full rounded bg-gray-800 p-2 outline-none"
        />
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Stories / Memories"
          className="min-h-[90px] w-full rounded bg-gray-800 p-2 outline-none"
        />
        <button
          onClick={addMember}
          className="mt-1 rounded bg-yellow-500 px-4 py-2 font-semibold text-black hover:bg-yellow-400"
        >
          Add Member
        </button>
      </div>

      {/* List */}
      <div className="mx-auto grid max-w-4xl gap-4">
        {members.length === 0 ? (
          <p className="text-center text-gray-400">No members added yet.</p>
        ) : (
          members.map((m) => (
            <div
              key={m.id}
              className="rounded border border-gray-800 bg-gray-900 p-4"
            >
              <div className="flex items-start gap-4">
                {m.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="h-20 w-20 rounded object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded bg-gray-800 text-sm text-gray-400">
                    No Photo
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold text-yellow-400">{m.name}</h3>
                  <p className="text-gray-300">Relation: {m.relation}</p>
                  {m.birthDate && <p className="text-gray-400">Born: {m.birthDate}</p>}
                  {m.deathDate && <p className="text-gray-400">Died: {m.deathDate}</p>}
                  {m.story && <p className="mt-2 text-gray-200">{m.story}</p>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
