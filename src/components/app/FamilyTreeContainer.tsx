"use client";

import { useState } from "react";

type Member = {
  id: number;
  name: string;
  relation: string;
  dob?: string;
  dod?: string;
  photo?: string;
  story?: string;
};

export default function FamilyTreeContainer() {
  const [members, setMembers] = useState<Member[]>([]);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [dob, setDob] = useState("");
  const [dod, setDod] = useState("");
  const [photo, setPhoto] = useState("");
  const [story, setStory] = useState("");

  const addMember = () => {
    if (!name || !relation) return;
    setMembers((m) => [
      ...m,
      {
        id: Date.now(),
        name,
        relation,
        dob,
        dod,
        photo,
        story,
      },
    ]);
    setName("");
    setRelation("");
    setDob("");
    setDod("");
    setPhoto("");
    setStory("");
  };

  return (
    <div>
      <h2 className="text-4xl font-extrabold text-yellow-400 mb-2 text-center">
        आपका Family Tree
      </h2>
      <p className="text-center text-white/70 mb-8">
        यहाँ आप अपने परिवार के सदस्यों को जोड़ और देख सकते हैं।
      </p>

      <div className="space-y-4 max-w-3xl mx-auto">
        {/* Name */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full rounded bg-white/10 text-white placeholder-white/60 px-4 py-3 outline-none focus:ring-2 ring-yellow-400"
        />

        {/* Relation */}
        <input
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
          placeholder="Relation (e.g., Father, Mother, Brother)"
          className="w-full rounded bg-white/10 text-white placeholder-white/60 px-4 py-3 outline-none focus:ring-2 ring-yellow-400"
        />

        {/* DOB / DOD with labels */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/80 text-sm mb-1">
              Date of Birth
            </label>
            <input
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="dd-mm-yyyy"
              className="w-full rounded bg-white/10 text-white placeholder-white/60 px-4 py-3 outline-none focus:ring-2 ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-1">
              Date of Death (Optional)
            </label>
            <input
              value={dod}
              onChange={(e) => setDod(e.target.value)}
              placeholder="dd-mm-yyyy"
              className="w-full rounded bg-white/10 text-white placeholder-white/60 px-4 py-3 outline-none focus:ring-2 ring-yellow-400"
            />
          </div>
        </div>

        {/* Photo URL */}
        <input
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          placeholder="Photo URL (optional)"
          className="w-full rounded bg-white/10 text-white placeholder-white/60 px-4 py-3 outline-none focus:ring-2 ring-yellow-400"
        />

        {/* Stories */}
        <div>
          <label className="block text-white/80 text-sm mb-1">
            Stories / Memories
          </label>
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Write a short memory or story..."
            rows={4}
            className="w-full rounded bg-white/10 text-white placeholder-white/60 px-4 py-3 outline-none focus:ring-2 ring-yellow-400"
          />
        </div>

        <button
          onClick={addMember}
          className="w-full rounded bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3"
        >
          Add Member
        </button>
      </div>

      {/* LIST */}
      <div className="max-w-3xl mx-auto mt-10 text-white/90">
        {members.length === 0 ? (
          <p className="text-center text-white/60">No members added yet.</p>
        ) : (
          <ul className="space-y-3">
            {members.map((m) => (
              <li
                key={m.id}
                className="rounded border border-white/10 bg-white/5 px-4 py-3"
              >
                <div className="font-semibold text-yellow-300">{m.name}</div>
                <div className="text-white/80 text-sm">
                  Relation: {m.relation}
                  {m.dob && <> · DOB: {m.dob}</>}
                  {m.dod && <> · DOD: {m.dod}</>}
                </div>
                {m.photo && (
                  <div className="text-white/70 text-sm break-all">
                    Photo: {m.photo}
                  </div>
                )}
                {m.story && (
                  <div className="mt-2 text-white/80 text-sm">{m.story}</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      </div>
  );
}
