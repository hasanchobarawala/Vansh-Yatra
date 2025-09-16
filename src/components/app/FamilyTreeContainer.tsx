"use client";

import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { ref, onValue, push, set, remove } from "firebase/database";
import { auth, db } from "@/lib/firebase";

type Member = {
  id?: string;
  name: string;
  relation: string;
  dob?: string;
  dod?: string;
  photoUrl?: string;
  stories?: string;
  createdAt?: number;
};

export default function FamilyTreeContainer() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // form state
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [dob, setDob] = useState("");
  const [dod, setDod] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [stories, setStories] = useState("");

  // members
  const [members, setMembers] = useState<Member[]>([]);
  const [saving, setSaving] = useState(false);

  // --- Listen auth ---
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoadingUser(false);
    });
    return () => unsub();
  }, []);

  // --- DB path: users/{uid}/members ---
  const membersRef = useMemo(() => {
    if (!user) return null;
    return ref(db, `users/${user.uid}/members`);
  }, [user]);

  // --- Realtime listener ---
  useEffect(() => {
    if (!membersRef) {
      setMembers([]);
      return;
    }
    const unsub = onValue(membersRef, (snap) => {
      const val = snap.val() as Record<string, Member> | null;
      if (!val) {
        setMembers([]);
        return;
      }
      const list: Member[] = Object.entries(val).map(([id, v]) => ({
        id,
        ...v,
      }));
      // newest first
      list.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
      setMembers(list);
    });
    return () => unsub();
  }, [membersRef]);

  // --- Add member ---
  const handleAdd = async () => {
    if (!user || !membersRef) return;
    if (!name.trim() || !relation.trim()) return;

    setSaving(true);
    try {
      const keyRef = push(membersRef);
      const payload: Member = {
        name: name.trim(),
        relation: relation.trim(),
        dob: dob || undefined,
        dod: dod || undefined,
        photoUrl: photoUrl || undefined,
        stories: stories || undefined,
        createdAt: Date.now(),
      };
      await set(keyRef, payload);

      // clear form
      setName("");
      setRelation("");
      setDob("");
      setDod("");
      setPhotoUrl("");
      setStories("");
    } finally {
      setSaving(false);
    }
  };

  // --- Delete member ---
  const handleDelete = async (id?: string) => {
    if (!user || !id) return;
    await remove(ref(db, `users/${user.uid}/members/${id}`));
  };

  if (loadingUser) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center text-neutral-300">
        Loading…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center">
        <h2 className="text-3xl font-semibold text-yellow-400 mb-4">
          Please log in to manage your Family Tree
        </h2>
        <p className="text-neutral-300">
          लॉग-इन करने के बाद आप अपने परिवार के members जोड़ और देख सकेंगे।
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header with user + logout */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-yellow-400">
            आपका Family Tree
          </h1>
          <p className="text-neutral-300">
            {user.email ? user.email : "Logged in"} — स्वागत है!
          </p>
        </div>
        <button
          onClick={() => signOut(auth)}
          className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-600"
        >
          Logout
        </button>
      </div>

      {/* Form */}
      <div className="space-y-4 mb-8">
        <input
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-4 py-3 text-neutral-100 placeholder-neutral-400"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-4 py-3 text-neutral-100 placeholder-neutral-400"
          placeholder="Relation (e.g., Father, Mother, Brother)"
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-neutral-300 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-4 py-3 text-neutral-100"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-300 mb-1">
              Date of Death (Optional)
            </label>
            <input
              type="date"
              className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-4 py-3 text-neutral-100"
              value={dod}
              onChange={(e) => setDod(e.target.value)}
            />
          </div>
        </div>

        <input
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-4 py-3 text-neutral-100 placeholder-neutral-400"
          placeholder="Photo URL (optional)"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />

        <div>
          <label className="block text-sm text-neutral-300 mb-1">
            Stories / Memories
          </label>
          <textarea
            rows={4}
            className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-4 py-3 text-neutral-100 placeholder-neutral-400"
            placeholder="Write a short memory or story…"
            value={stories}
            onChange={(e) => setStories(e.target.value)}
          />
        </div>

        <button
          disabled={saving}
          onClick={handleAdd}
          className="w-full md:w-auto px-6 py-3 rounded-md bg-yellow-500 hover:bg-yellow-400 text-black font-semibold shadow disabled:opacity-60"
        >
          {saving ? "Saving…" : "Add Member"}
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {members.length === 0 ? (
          <p className="text-center text-neutral-400">
            No members added yet.
          </p>
        ) : (
          members.map((m) => (
            <div
              key={m.id}
              className="flex items-start justify-between gap-3 rounded-lg border border-neutral-700 bg-neutral-900 p-4"
            >
              <div className="space-y-1">
                <div className="text-lg font-semibold text-neutral-100">
                  {m.name}{" "}
                  <span className="text-neutral-400 font-normal">
                    • {m.relation}
                  </span>
                </div>
                {(m.dob || m.dod) && (
                  <div className="text-sm text-neutral-400">
                    {m.dob ? `DOB: ${m.dob}` : ""}{" "}
                    {m.dob && m.dod ? "• " : ""}
                    {m.dod ? `DOD: ${m.dod}` : ""}
                  </div>
                )}
                {m.photoUrl && (
                  <div className="text-sm">
                    <a
                      className="text-yellow-400 underline"
                      href={m.photoUrl}
                      target="_blank"
                    >
                      View photo
                    </a>
                  </div>
                )}
                {m.stories && (
                  <p className="text-neutral-300 whitespace-pre-line">
                    {m.stories}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleDelete(m.id)}
                className="px-3 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-600"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Single footer (gold & bold) */}
      <div className="text-center mt-12 font-semibold text-yellow-500">
        App Developed by Hasan Chobarawala · +91-9926652153
      </div>
    </div>
  );
}
