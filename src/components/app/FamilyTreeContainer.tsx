"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue, push, remove } from "firebase/database";
import { auth, db } from "@/lib/firebase";

type Member = {
  id?: string;            // Realtime DB key
  name: string;
  relation: string;
  dob?: string;           // Date of Birth (dd-mm-yyyy)
  dod?: string;           // Date of Death (optional)
  photoUrl?: string;
  story?: string;
};

export default function FamilyTreeContainer() {
  // who is logged in
  const [uid, setUid] = useState<string | null>(null);

  // live list
  const [members, setMembers] = useState<Member[]>([]);

  // form state
  const [form, setForm] = useState<Member>({
    name: "",
    relation: "",
    dob: "",
    dod: "",
    photoUrl: "",
    story: "",
  });

  // watch auth + subscribe to user's members
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      const u = user?.uid ?? null;
      setUid(u);

      if (!u) {
        setMembers([]);
        return;
      }

      const membersRef = ref(db, `users/${u}/members`);
      onValue(membersRef, (snap) => {
        const val = snap.val();
        const list: Member[] = val
          ? Object.entries(val).map(([key, value]) => ({
              id: key,
              ...(value as Member),
            }))
          : [];
        setMembers(list);
      });
    });

    return () => unsub();
  }, []);

  // helpers
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const addMember = async () => {
    if (!uid) return;
    if (!form.name.trim() || !form.relation.trim()) return;

    const data: Member = {
      name: form.name.trim(),
      relation: form.relation.trim(),
      dob: form.dob?.trim() || "",
      dod: form.dod?.trim() || "",
      photoUrl: form.photoUrl?.trim() || "",
      story: form.story?.trim() || "",
    };

    await push(ref(db, `users/${uid}/members`), data);

    // clear form
    setForm({ name: "", relation: "", dob: "", dod: "", photoUrl: "", story: "" });
  };

  const deleteMember = async (id?: string) => {
    if (!uid || !id) return;
    const ok = confirm("Delete this member?");
    if (!ok) return;
    await remove(ref(db, `users/${uid}/members/${id}`));
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-4xl font-bold text-yellow-500 text-center mb-1">
        आपका Family Tree
      </h1>
      <p className="text-center text-gray-300 mb-10">
        यहाँ आप अपने परिवार के सदस्यों को जोड़ और देख सकते हैं।
      </p>

      {/* FORM */}
      <div className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Name"
          className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none"
        />
        <input
          name="relation"
          value={form.relation}
          onChange={onChange}
          placeholder="Relation (e.g., Father, Mother, Brother)"
          className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1 text-gray-300">Date of Birth</label>
            <input
              name="dob"
              value={form.dob}
              onChange={onChange}
              placeholder="dd-mm-yyyy"
              className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Date of Death (Optional)
            </label>
            <input
              name="dod"
              value={form.dod}
              onChange={onChange}
              placeholder="dd-mm-yyyy"
              className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none"
            />
          </div>
        </div>

        <input
          name="photoUrl"
          value={form.photoUrl}
          onChange={onChange}
          placeholder="Photo URL (optional)"
          className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none"
        />

        <textarea
          name="story"
          value={form.story}
          onChange={onChange}
          placeholder="Write a short memory or story..."
          rows={4}
          className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none"
        />

        <button
          onClick={addMember}
          disabled={!uid || !form.name.trim() || !form.relation.trim()}
          className="rounded-md border border-yellow-700 bg-yellow-600 px-6 py-3 font-semibold text-black hover:bg-yellow-500 disabled:opacity-50"
        >
          Add Member
        </button>
      </div>

      {/* LIST */}
      <div className="mt-10 space-y-4">
        {members.length === 0 ? (
          <p className="text-center text-gray-400">No members added yet.</p>
        ) : (
          members.map((m) => (
            <div
              key={m.id}
              className="rounded-md border border-gray-700 bg-gray-900 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-white">{m.name}</div>
                  <div className="text-sm text-gray-300">{m.relation}</div>
                  {(m.dob || m.dod) && (
                    <div className="text-sm text-gray-400 mt-1">
                      {m.dob && <>DOB: {m.dob}</>}{" "}
                      {m.dod && <span className="ml-2">DOD: {m.dod}</span>}
                    </div>
                  )}
                  {m.story && (
                    <p className="text-gray-300 mt-2 whitespace-pre-wrap">
                      {m.story}
                    </p>
                  )}
                  {m.photoUrl && (
                    <a
                      href={m.photoUrl}
                      target="_blank"
                      className="text-blue-400 underline mt-2 inline-block"
                    >
                      View Photo
                    </a>
                  )}
                </div>

                <button
                  onClick={() => deleteMember(m.id)}
                  className="rounded-md border border-red-700 bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
