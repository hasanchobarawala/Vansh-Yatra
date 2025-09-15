'use client';

import type { FamilyMember } from '@/lib/types';
import { MemberNode } from './MemberNode';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';

interface FamilyTreeProps {
  members: FamilyMember[];
  memberMap: Map<string, FamilyMember>;
  onAddRelative: (memberId: string, type: 'parent' | 'spouse') => void;
  onEdit: (member: FamilyMember) => void;
  onDelete: (memberId: string) => void;
  onViewStory: (member: FamilyMember) => void;
  onAddNew: () => void;
}

export function FamilyTree({ members, onAddNew, ...props }: FamilyTreeProps) {
  const rootMembers = useMemo(() => {
    const memberIds = new Set(members.map((m) => m.id));
    return members.filter((member) => {
      // A root has no parents, or its parents don't exist in the list.
      const hasNoParents = member.parents.length === 0;
      const parentsAreMissing = member.parents.every(pId => !memberIds.has(pId));
      
      // Do not render a spouse as a root if their partner is in the tree
      if (member.spouseId) {
        const spouse = props.memberMap.get(member.spouseId);
        if (spouse && member.id > spouse.id) return false;
      }

      return hasNoParents || parentsAreMissing;
    });
  }, [members, props.memberMap]);

  if (members.length === 0) {
    return (
        <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-4">
                <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary sm:text-5xl md:text-6xl">
                    Vansh Yatra
                </h1>
                <p className="font-headline text-lg text-foreground md:text-xl">
                    जानो अपनी जड़ें, बनाओ अपना वंश।
                </p>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                    वंश यात्रा एक अनोखा मोबाइल ऐप है जो आपके कुल व वंश की जानकारी को डिजिटल रूप में संरक्षित करता है। इस ऐप के माध्यम से आप अपने पूर्वजों की पीढ़ी-दर-पीढ़ी जानकारी एक ही स्थान पर जोड़ सकते हैं। परिवार वृक्ष (फैमिली ट्री) के रूप में सभी रिश्तों को सहज रूप से देखा जा सकता है। हर सदस्य की जन्म-तिथि, फोटो, और जीवन से जुड़ी बातें जोड़ना बहुत आसान है। यह ऐप परिवार को जोड़ने, विरासत को सहेजने और आने वाली पीढ़ियों को अपनी जड़ों से जोड़ने का माध्यम है।
                </p>
            </div>
            <div className="py-10">
              <h2 className="font-headline text-2xl text-muted-foreground">Your family tree is empty.</h2>
              <p className="mt-2 text-muted-foreground">Click the button to begin your Family Journey.</p>
              <Button onClick={onAddNew} className="mt-4">Start Building Your Tree</Button>
            </div>
        </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-12">
      {rootMembers.map((member) => (
        <MemberNode
          key={member.id}
          memberId={member.id}
          members={members}
          {...props}
        />
      ))}
    </div>
  );
}
