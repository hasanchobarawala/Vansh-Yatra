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

type Member = {
  id: string;
  name?: string;
  gender?: "male" | "female" | "other";
  spouseId?: string | null;
  parentIds?: string[];
  createdAt?: any;
};

export default function FamilyTreeView() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [sourceInfo, setSourceInfo] = useState<string>("");

  useEffect(() => {
    const u = auth.currentUser;
    if (!u) {
      setLoading(false);
      return;
    }

    const run = async () => {
      try {
        // --- Try 1: top-level "members" with ownerId == uid ---
        let got: Member[] = [];
        try {
          const q1 = query(
            collection(db, "members"),
            where("ownerId", "==", u.uid),
            orderBy("createdAt", "desc"),
            limit(200)
          );
          const s1 = await getDocs(q1);
          got = s1.docs.map((d) => toMember(d.id, d.data() as any));
          if (got.length) {
            setMembers(got);
            setSourceInfo(`source: top-level "members" (ownerId=${u.uid}) count=${got.length}`);
            return;
          }
        } catch (e) {
          // ignore and fall through
          console.warn("Top-level members fetch failed (ok to ignore):", e);
        }

        // --- Try 2: subcollection "users/{uid}/members" ---
        try {
          const subRef = collection(db, "users", u.uid, "members");
          const q2 = query(subRef, orderBy("createdAt", "desc"), limit(200));
          const s2 = await getDocs(q2);
          const got2 = s2.docs.map((d) => toMember(d.id, d.data() as any));
          if (got2.length) {
            setMembers(got2);
            setSourceInfo(`source: users/${u.uid}/members count=${got2.length}`);
            return;
          }
        } catch (e) {
          console.warn("Subcollection members fetch failed (ok to ignore):", e);
        }

        // --- Try 3: last resort — top-level "members" without ownerId filter (NOT recommended for prod) ---
        try {
          const q3 = query(collection(db, "members"), orderBy("createdAt", "desc"), limit(200));
          const s3 = await getDocs(q3);
          const got3 = s3.docs.map((d) => toMember(d.id, d.data() as any));
          if (got3.length) {
            setMembers(got3);
            setSourceInfo(`source: top-level "members" (no filter) count=${got3.length}`);
            return;
          }
        } catch (e) {
          console.warn("Unfiltered top-level fetch failed:", e);
        }

        // Nothing found:
        setMembers([]);
        setSourceInfo("no members found in: members(ownerId), users/{uid}/members, members(all)");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  const { coupleA, coupleB, children } = useMemo(() => {
    if (!members.length) {
      return { coupleA: null as Member | null, coupleB: null as Member | null, children: [] as Member[] };
    }
    const byId = new Map(members.map((m) => [m.id, m]));
    let A: Member | null = null;
    let B: Member | null = null;

    // mutual spouseId
    for (const m of members) {
      if (m.spouseId && byId.get(m.spouseId)?.spouseId === m.id) {
        A = m;
        B = byId.get(m.spouseId)!;
        break;
      }
    }

    if (!A || !B) {
      A = members[0] || null;
      B = members[1] || null;
    }

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
      kids = withParents.length
        ? withParents
        : members.filter((m) => m.id !== A!.id && m.id !== B!.id);
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
        <div className="mt-2 text-xs text-neutral-400">{sourceInfo}</div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl border border-yellow-700/40 bg-yellow-50/5">
      {/* debug source (optional) */}
      <div className="text-xs text-neutral-400 mb-2">{sourceInfo}</div>

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

function toMember(id: string, x: any): Member {
  return {
    id,
    name: (x?.name || x?.fullName || "").trim(),
    gender: x?.gender || undefined,
    spouseId: x?.spouseId ?? null,
    parentIds: Array.isArray(x?.parentIds) ? x.parentIds : undefined,
    createdAt: x?.createdAt,
  };
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
