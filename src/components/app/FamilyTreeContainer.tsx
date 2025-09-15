'use client';

import type { FamilyMember } from '@/lib/types';
import { useState, useMemo } from 'react';
import { FamilyTree } from './FamilyTree';
import { AddMemberSheet } from './AddMemberSheet';
import { StoryDialog } from './StoryDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface FamilyTreeContainerProps {
  initialData: FamilyMember[];
}

type Connection = {
  memberId: string;
  type: 'parent' | 'spouse';
}

export function FamilyTreeContainer({ initialData }: FamilyTreeContainerProps) {
  const [members, setMembers] = useState<FamilyMember[]>(initialData);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [connection, setConnection] = useState<Connection | null>(null);
  const [storyMember, setStoryMember] = useState<FamilyMember | null>(null);

  const memberMap = useMemo(() => {
    return new Map(members.map((m) => [m.id, m]));
  }, [members]);

  const handleAddNew = () => {
    setEditingMember(null);
    setConnection(null);
    setSheetOpen(true);
  };
  
  const handleAddRelative = (memberId: string, type: 'parent' | 'spouse') => {
    setEditingMember(null);
    setConnection({ memberId, type });
    setSheetOpen(true);
  }

  const handleEdit = (member: FamilyMember) => {
    setEditingMember(member);
    setConnection(null);
    setSheetOpen(true);
  };

  const handleDelete = (memberId: string) => {
    if (!window.confirm('Are you sure you want to delete this member and their entire branch?')) {
      return;
    }

    setMembers(currentMembers => {
      const membersToDelete = new Set<string>();
      const queue: string[] = [memberId];
      const visited = new Set<string>();
      
      const memberMap = new Map(currentMembers.map(m => [m.id, m]));
      const member = memberMap.get(memberId);
      if(member?.spouseId) {
        queue.push(member.spouseId);
      }

      while (queue.length > 0) {
        const currentId = queue.shift()!;
        if (visited.has(currentId)) {
          continue;
        }
        visited.add(currentId);
        membersToDelete.add(currentId);

        const currentMember = memberMap.get(currentId);
        if(!currentMember) continue;
        
        // Add spouse to the deletion set
        if (currentMember.spouseId && !visited.has(currentMember.spouseId)) {
           queue.push(currentMember.spouseId);
        }

        // Add children to the queue
        const children = currentMembers.filter(m => m.parents.includes(currentId));
        for (const child of children) {
          if (!visited.has(child.id)) {
            queue.push(child.id);
          }
        }
      }

      // Filter out the deleted members and clean up any dangling references
      return currentMembers
        .filter(m => !membersToDelete.has(m.id))
        .map(m => {
          const newParents = m.parents.filter(pId => !membersToDelete.has(pId));
          const newSpouseId = (m.spouseId && membersToDelete.has(m.spouseId)) ? undefined : m.spouseId;
          
          if(newParents.length !== m.parents.length || newSpouseId !== m.spouseId) {
            return { ...m, parents: newParents, spouseId: newSpouseId };
          }
          return m;
        });
    });
  };

  const handleSave = (memberData: Omit<FamilyMember, 'imageHint'>) => {
    if (editingMember) {
      // Update existing member
      setMembers(prev => prev.map(m => m.id === editingMember.id ? { ...m, ...memberData, imageHint: m.imageHint } : m));
    } else {
      // Add new member
      const newMember: FamilyMember = {
        ...memberData,
        imageUrl: memberData.imageUrl || `https://picsum.photos/seed/${memberData.id}/400/400`,
        imageHint: 'person portrait',
        parents: connection?.type === 'parent' ? [connection.memberId] : [],
      };
      
      let newMembersList = [...members, newMember];

      if (connection?.type === 'spouse') {
        const spouseToUpdate = newMembersList.find(m => m.id === connection.memberId);
        if (spouseToUpdate) {
            newMembersList = newMembersList.map(m => {
                if(m.id === connection.memberId) return {...m, spouseId: newMember.id};
                if(m.id === newMember.id) return {...m, spouseId: connection.memberId, parents: spouseToUpdate.parents};
                return m;
            });
        }
      }

      setMembers(newMembersList);
    }
    setSheetOpen(false);
    setEditingMember(null);
    setConnection(null);
  };
  
  const handleViewStory = (member: FamilyMember) => {
    setStoryMember(member);
  };

  return (
    <div className="space-y-6">
      <FamilyTree
        members={members}
        memberMap={memberMap}
        onAddRelative={handleAddRelative}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onViewStory={handleViewStory}
        onAddNew={handleAddNew}
      />
      <AddMemberSheet
        isOpen={isSheetOpen}
        onOpenChange={setSheetOpen}
        onSave={handleSave}
        member={editingMember}
        members={members}
        connection={connection}
      />
      <StoryDialog
        member={storyMember}
        onOpenChange={() => setStoryMember(null)}
      />
    </div>
  );
}
