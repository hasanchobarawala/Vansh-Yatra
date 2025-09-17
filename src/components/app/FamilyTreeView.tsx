"use client";

import React, { useEffect, useMemo, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

/**
 * Minimal member shape we expect. Your actual docs can have more fields.
 * This code tries to be defensive: if fields missing, we fallback nicely.
 */
type Member = {
  id: string;
  name?: string;
  gender?: "male" | "female" | "other";
  spouseId?: string | null;
  parentIds?: string[]; // optional: if you have it
  createdAt?: any;
};

export default function FamilyTreeView() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = auth.currentUser;
    if (!u) {
      setLoading(false);
      return;
    }

    // NOTE: update "members" collection name if your app uses a different one.
    // We fetch only documents created by the current user (ownerId = uid).
    const run = async () => {
      try {
        const q = query(
          collection(db, "members"),
          where("ownerId", "==", u.uid),
          orderBy("createdAt", "desc"),
          limit(100)
        );
        const snap = await getDocs(q);
        const data: Member[] = snap.docs.map((d) => {
          const x = d.data() as any;
          return {
            id: d.id,
            name: (x.name || x.fullName || "").trim(),
            gender: x.gender || undefined,
            spouseId: x.spouseId ?? null,
            parentIds: Array.isArray(x.parentIds) ? x.parentIds : undefined,
            createdAt: x.createdAt,
          };
        });
        setMembers(data);
      } catch (e) {
        console.error("FamilyTreeView fetch error:", e);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  // --- Heuristic pairing & children bucketing ---
  const { coupleA, coupleB, children } = useMemo(() => {
    if (!members.length) return { coupleA: null as Member | null, coupleB: null as Member | null, children: [] as Member[] };

    // 1) Try to find two members who reference each other via spouseId
    const byId = new Map(members.map((m) => [m.id, m]));
    let A: Member | null = null;
    let B: Member | null = null;

    for (const m of members) {
      if (m.spouseId && byId.get(m.spouseId)?.spouseId === m.id) {
        A = m;
        B = byId.get(m.spouseId)!;
        break;
      }
    }

    // 2) Fallback: take top 2 recent members as a couple
    if (!A || !B) {
      A = members[0] || null;
      B = members[1] || null;
    }

    // 3) Children filter:
    // If your docs have parentIds, take children whose parentIds include A/B
    // Else fallback: remaining members except A/B
    let kids: Member[] = [];
    if (A && B) {
      const coupleIds = new Set([A.id, B.id]);
      const withParents = members.filter(
        (m) =>
          m.id !== A!.id &&
          m.id !== B!.id &&
          Array.isArray(m.parentIds) &&
          m.parentIds.some((pid) => coupleIds.has(pid))
      );
      if (withParents.length) {
        kids = withParents;
      } else {
        // simple fallback: remaining members (best-effort)
        kids = members.filter((m) => m.id !== A!.id && m.id !== B!.id);
      }
    }

    return { coupleA: A, coupleB: B, children: kids };
  }, [members]);

  if (loading) {
    return (
      <div className="rounded-lg border border-yellow-700/40 bg-yellow-50/5 p-6 text-sm text-neutral-300">
        Loading family layout…
      </div>
    );
  }

  if (!members.length) {
    return (
      <div className="rounded-lg border border-yellow-700/40 bg-yellow-50/5 p-6 text-sm text-neutral-300">
        अभी आपने कोई सदस्य नहीं जोड़ा है। पहले कुछ members जोड़ें — फिर यह section automatically
        husband–wife–children layout दिखा देगा.
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl border border-yellow-700/40 bg-yellow-50/5">
      {/* Parents row */}
      <div className="flex justify-center items-center gap-6">
        <MemberBox member={coupleA} fallback="Member 1" />
        <Connector type="spouse" />
        <MemberBox member={coupleB} fallback="Member 2" />
      </div>

      {/* vertical line */}
      <div className="h-8 w-px bg-gray-500/60 mx-auto my-2"></div>

      {/* Children row */}
      {children.length ? (
        <div className="flex flex-wrap justify-center gap-4">
          {children.map((c) => (
            <MemberBox key={c.id} member={c} fallback="Child" small />
          ))}
        </div>
      ) : (
        <div className="text-center text-neutral-300 text-sm">
          (Children not linked yet)
        </div>
      )}
    </div>
  );
}

function MemberBox({
  member,
  fallback,
  small,
}: {
  member: Member | null;
  fallback: string;
  small?: boolean;
}) {
  const label = (member?.name || fallback || "").trim() || fallback;
  return (
    <div
      className={[
        "px-3 py-2 rounded-md border-2",
        "border-amber-500 bg-amber-50/80 text-black",
        "shadow-sm text-center",
        small ? "text-sm" : "text-base",
        "min-w-[8rem]",
      ].join(" ")}
      title={label}
    >
      {label}
    </div>
  );
}

function Connector({ type }: { type: "spouse" }) {
  if (type === "spouse") {
    return <div className="h-px w-10 bg-gray-500/70" />;
  }
  return null;
}
