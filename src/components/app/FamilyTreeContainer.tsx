"use client";

import React, { useEffect, useState } from "react";
import AddMemberSheet from "@/components/app/AddMemberSheet";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref, remove } from "firebase/database";

type Member = {
  id: string;
  name: string;
  relation: string;
  dob?: string | null;
  dod?: string | null;
  photoUrl?: string | null;
  stories?: string | null;
  createdAt?: number;
};

export default function FamilyTreeContainer() {
  const [uid, setUid] = useState<string>("public");
  const [members, setMembers] = useState<Member[]>([]);
  const [showAdd, setShowAdd] = useState(false);

  // Listen to auth & subscribe to members
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      const currentUid = user?.uid ?? "public";
      setUid(currentUid);

      const treeRef = ref(db, `trees/${currentUid}/members`);
      const unsubscribeData = onValue(treeRef, (snap) => {
        const val = snap.val() as Record<string, any> | null;
        const list: Member[] = val
          ? Object.entries(val).map(([id, v]) => ({ id, ...(v as any) }))
          : [];
        list.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
        setMembers(list);
      });

      return unsubscribeData;
    });

    return () => unsubscribeAuth();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this member?")) return;
    await remove(ref(db, `trees/${uid}/members/${id}`));
  };

  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-yellow-400">आपका Family Tree</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="rounded bg-yellow-500 px-4 py-2 font-semibold text-black hover:bg-yellow-400"
        >
          Add Member
        </button>
      </div>

      {/* Members list */}
      <div className="space-y-3">
        {members.length === 0 ? (
          <p className="text-gray-400">No members added yet.</p>
        ) : (
          members.map((m) => (
            <div
              key={m.id}
              className="rounded border border-gray-700 bg-gray-800/60 p-4 text-white"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-yellow-300">
                    {m.name}{" "}
                    <span className="text-sm text-gray-400">({m.relation})</span>
                  </div>
                  <div className="text-sm text-gray-300">
                    {m.dob ? `DOB: ${m.dob}` : null}
                    {m.dod ? ` • DOD: ${m.dod}` : null}
                  </div>
                  {m.photoUrl ? (
                    <img
                      src={m.photoUrl}
                      alt={m.name}
                      className="mt-2 h-24 w-24 rounded object-cover"
                    />
                  ) : null}
                  {m.stories ? (
                    <p className="mt-2 text-sm text-gray-300">{m.stories}</p>
                  ) : null}
                </div>

                <button
                  onClick={() => handleDelete(m.id)}
                  className="rounded bg-red-600 px-3 py-1 text-sm font-semibold hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for adding member */}
      {showAdd ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-xl rounded-lg border border-gray-700 bg-gray-900 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Add Member</h3>
              <button
                onClick={() => setShowAdd(false)}
                className="rounded bg-gray-700 px-2 py-1 text-sm text-white hover:bg-gray-600"
              >
                Close
              </button>
            </div>
            <AddMemberSheet onClose={() => setShowAdd(false)} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
