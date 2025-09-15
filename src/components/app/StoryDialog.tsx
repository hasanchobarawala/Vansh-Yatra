'use client';

import type { FamilyMember } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useState } from 'react';
import { enhanceStoryWithAISuggestions } from '@/ai/flows/enhance-story-with-ai-suggestions';
import { Sparkles, Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '../ui/separator';

interface StoryDialogProps {
  member: FamilyMember | null;
  onOpenChange: (isOpen: boolean) => void;
}

export function StoryDialog({ member, onOpenChange }: StoryDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [checklist, setChecklist] = useState<string[]>([]);
  const { toast } = useToast();

  const handleEnhance = async () => {
    if (!member) return;

    setIsLoading(true);
    setChecklist([]);
    try {
      const result = await enhanceStoryWithAISuggestions({
        story: member.story,
        familyName: 'Yatra',
        memberFirstName: member.name.split(' ')[0],
      });
      setChecklist(result.checklistItems);
    } catch (error) {
      console.error('AI enhancement failed:', error);
      toast({
        variant: "destructive",
        title: "AI Enhancement Failed",
        description: "Could not get AI suggestions. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isOpen = !!member;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary">{member?.name}</DialogTitle>
          <DialogDescription>
            A glimpse into their life story.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
          <p className="text-foreground leading-relaxed">
            {member?.story || "No story has been added for this family member yet."}
          </p>

          {checklist.length > 0 && (
             <div className="space-y-4">
                <Separator />
                <h4 className="font-semibold text-foreground">Verification Checklist</h4>
                <p className="text-sm text-muted-foreground">AI suggests verifying these points for accuracy and consent before sharing.</p>
                <div className="space-y-3">
                {checklist.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                    <Checkbox id={`check-${index}`} />
                    <Label htmlFor={`check-${index}`} className="text-sm">
                        {item}
                    </Label>
                    </div>
                ))}
                </div>
            </div>
          )}

        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleEnhance} disabled={isLoading || !member?.story}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Enhance Story
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
