'use client';

import type { FamilyMember } from '@/lib/types';
import { MemberCard } from './MemberCard';
import { useMemo } from 'react';

interface MemberNodeProps {
  memberId: string;
  members: FamilyMember[];
  memberMap: Map<string, FamilyMember>;
  onAddRelative: (memberId: string, type: 'parent' | 'spouse') => void;
  onEdit: (member: FamilyMember) => void;
  onDelete: (memberId: string) => void;
  onViewStory: (member: FamilyMember) => void;
}

export function MemberNode({ memberId, members, memberMap, ...props }: MemberNodeProps) {
  const member = memberMap.get(memberId);

  const { spouse, children } = useMemo(() => {
    if (!member) return { spouse: null, children: [] };
    
    const spouse = member.spouseId ? memberMap.get(member.spouseId) : null;
    const children = members.filter((m) => m.parents.includes(member.id) && (!m.spouseId || m.id < m.spouseId));
    
    return { spouse, children };
  }, [member, memberMap, members]);

  if (!member) {
    return null;
  }
  
  const hasChildren = children.length > 0;

  return (
    <div className="relative flex flex-col items-center">
      {/* Member and Spouse */}
      <div className="relative flex items-start justify-center">
        <MemberCard member={member} {...props} />
        {spouse && (
            <>
                <div className="relative self-center h-px w-8 bg-accent/50 mx-4 mt-8">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/50" />
                </div>
                <MemberCard member={spouse} {...props} onAddRelative={() => {}}/>
            </>
        )}
      </div>

      {/* Connectors and Children */}
      {hasChildren && (
        <div className="relative flex flex-col items-center">
          {/* Vertical line down from parents */}
          <div className="h-8 w-px bg-accent/50" />

          {/* Horizontal line connecting children */}
          <div className="relative flex justify-center">
            <div className={`absolute top-0 h-px bg-accent/50 ${children.length > 1 ? 'left-1/2 right-1/2 w-full -translate-x-1/2' : 'w-0'}`} style={{
                left: children.length > 1 ? '25%' : '50%',
                right: children.length > 1 ? '25%' : '50%',
            }}/>
            
            <div className="flex items-start justify-center gap-x-4 pt-8">
              {children.map((child) => (
                <div key={child.id} className="relative flex flex-col items-center">
                  {/* Vertical line up to horizontal connector */}
                  <div className="absolute top-0 h-8 w-px bg-accent/50" />
                  <MemberNode
                    memberId={child.id}
                    members={members}
                    memberMap={memberMap}
                    {...props}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
