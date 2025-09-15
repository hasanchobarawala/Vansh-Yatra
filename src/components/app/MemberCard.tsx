'use client';

import Image from 'next/image';
import type { FamilyMember } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { BookOpen, MoreVertical, Trash2, Edit, UserPlus, Heart } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MemberCardProps {
  member: FamilyMember;
  onAddRelative: (memberId: string, type: 'parent' | 'spouse') => void;
  onEdit: (member: FamilyMember) => void;
  onDelete: (memberId: string) => void;
  onViewStory: (member: FamilyMember) => void;
}

export function MemberCard({ member, onAddRelative, onEdit, onDelete, onViewStory }: MemberCardProps) {
  return (
    <TooltipProvider>
    <Card className="w-48 text-center shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
      <CardContent className="p-4">
        <div className="relative mx-auto h-28 w-28">
          <Image
            src={member.imageUrl}
            alt={member.name}
            width={112}
            height={112}
            data-ai-hint={member.imageHint}
            className="rounded-full object-cover border-2 border-primary/50"
          />
        </div>
        <h3 className="mt-3 font-headline text-lg font-bold text-foreground">{member.name}</h3>
        <p className="text-sm text-muted-foreground">
          {member.birthYear} - {member.deathYear || 'Present'}
        </p>
        <div className="mt-3 flex justify-center gap-1">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onViewStory(member)}>
                        <BookOpen className="h-4 w-4 text-accent" />
                        <span className="sr-only">View Story</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>View Story</TooltipContent>
            </Tooltip>
            
          <DropdownMenu>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">More Options</span>
                    </Button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>More Options</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onAddRelative(member.id, 'parent')}>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Add Child</span>
              </DropdownMenuItem>
              {!member.spouseId && (
                <DropdownMenuItem onClick={() => onAddRelative(member.id, 'spouse')}>
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Add Spouse</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onEdit(member)}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => onDelete(member.id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
    </TooltipProvider>
  );
}
