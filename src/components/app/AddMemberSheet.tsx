"use client";

import React, { useState } from "react";
import { ref, push } from "firebase/database";
import { db, auth } from "../../lib/firebase";

type Props = {
  onClose: () => void;
};

export default function AddMemberForm({ onClose }: Props) {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [dob, setDob] = useState(""); // yyyy-mm-dd
  const [dod, setDod] = useState(""); // yyyy-mm-dd (optional)
  const [photoUrl, setPhotoUrl] = useState("");
  const [stories, setStories] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !relation.trim()) {
      setError("Name aur Relation zaroori hai.");
      return;
    }

    try {
      setSaving(true);

      // User-wise path, guest ke liye "public"
      const uid = auth.currentUser?.uid ?? "public";
      const membersRef = ref(db, `trees/${uid}/members`);

      await push(membersRef, {
        name: name.trim(),
        relation: relation.trim(),
        dob: dob || null,
        dod: dod || null,
        photoUrl: photoUrl.trim() || null,
        stories: stories.trim() || null,
        createdAt: Date.now(),
      });

      // Success
      setName("");
      setRelation("");
      setDob("");
      setDod("");
      setPhotoUrl("");
      setStories("");
      onClose(); // modal band
      alert("Member added ✅");
    } catch (err: any) {
      console.error(err);
      setError("Save karte waqt error aayi. Thoda baad try karein.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <h2 className="text-xl font-semibold text-yellow-400">Add Family Member</h2>

      {error ? (
        <div className="rounded bg-red-600/80 px-3 py-2 text-sm">{error}</div>
      ) : null}

      {/* Name */}
      <div>
        <label className="mb-1 block text-sm text-gray-300">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Member name"
          className="w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 outline-none focus:border-yellow-500"
          required
        />
      </div>

      {/* Relation */}
      <div>
        <label className="mb-1 block text-sm text-gray-300">Relation</label>
        <input
          type="text"
          value={relation}
          onChange={(e) => setRelation(e.target.value)}
          placeholder="Father, Mother, Brother..."
          className="w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 outline-none focus:border-yellow-500"
          required
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-gray-300">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white outline-none focus:border-yellow-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-300">
            Date of Death (Optional)
          </label>
          <input
            type="date"
            value={dod}
            onChange={(e) => setDod(e.target.value)}
            className="w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white outline-none focus:border-yellow-500"
          />
        </div>
      </div>

      {/* Photo URL */}
      <div>
        <label className="mb-1 block text-sm text-gray-300">Photo URL (optional)</label>
        <input
          type="url"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          placeholder="https://example.com/photo.jpg"
          className="w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 outline-none focus:border-yellow-500"
        />
      </div>

      {/* Stories */}
      <div>
        <label className="mb-1 block text-sm text-gray-300">Stories / Memories</label>
        <textarea
          rows={4}
          value={stories}
          onChange={(e) => setStories(e.target.value)}
          placeholder="Write a short memory or story..."
          className="w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 outline-none focus:border-yellow-500"
        />
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-yellow-500 px-4 py-2 font-semibold text-black hover:bg-yellow-400 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Add Member"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
