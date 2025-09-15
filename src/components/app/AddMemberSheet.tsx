"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import type { FamilyMember } from "@/lib/types"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

// Form validation schema
const memberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  birthYear: z.string().regex(/^\d{4}$/, "Enter a valid 4-digit year"),
  deathYear: z.string().regex(/^\d{4}$/, "Enter a valid 4-digit year").optional().or(z.literal('')),
  story: z.string().optional(),
})

type MemberFormData = z.infer<typeof memberSchema>

interface AddMemberSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSave: (memberData: Omit<FamilyMember, 'imageHint' | 'parents' | 'spouseId' | 'imageUrl'> & {id: string}) => void
  member: FamilyMember | null
  members: FamilyMember[]
  connection: { memberId: string, type: 'parent' | 'spouse' } | null
}

export function AddMemberSheet({ 
  isOpen, 
  onOpenChange, 
  onSave,
  member,
}: AddMemberSheetProps) {
  const form = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: member?.name || "",
      birthYear: member?.birthYear || "",
      deathYear: member?.deathYear || "",
      story: member?.story || "",
    },
  })

  React.useEffect(() => {
    form.reset({
      name: member?.name || "",
      birthYear: member?.birthYear || "",
      deathYear: member?.deathYear || "",
      story: member?.story || "",
    });
  }, [member, form]);

  const onSubmit = (data: MemberFormData) => {
    const memberId = member ? member.id : Date.now().toString();
    onSave({
      id: memberId,
      ...data,
      deathYear: data.deathYear || undefined,
    })
    form.reset()
    onOpenChange(false)
  }
  
  const title = member ? "Edit Member" : "Add New Member";
  const description = member ? "Update the details of this family member." : "Add a new person to your family tree.";

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            {description}
          </SheetDescription>
        </SheetHeader>
        
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="flex h-full flex-col space-y-6 pt-6"
          >
            <div className="flex-1 space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="birthYear"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Birth Year</FormLabel>
                      <FormControl>
                        <Input placeholder="YYYY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deathYear"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Death Year (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="YYYY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="story"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Life Story</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share a brief story about their life..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <SheetFooter className="pt-6">
              <div className="flex gap-3 w-full">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Save Changes
                </Button>
              </div>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
