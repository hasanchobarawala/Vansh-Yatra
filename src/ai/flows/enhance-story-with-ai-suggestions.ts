'use server';
/**
 * @fileOverview Enhances a family member's story with AI suggestions for sensitive details or gaps.
 *
 * - enhanceStoryWithAISuggestions - A function that takes a story and generates a checklist for verification.
 * - EnhanceStoryInput - The input type for the enhanceStoryWithAISuggestions function.
 * - EnhanceStoryOutput - The return type for the enhanceStoryWithAISuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceStoryInputSchema = z.object({
  story: z.string().describe('The life story of a family member.'),
  familyName: z.string().describe('The family name.'),
  memberFirstName: z.string().describe('The first name of the family member.'),
});
export type EnhanceStoryInput = z.infer<typeof EnhanceStoryInputSchema>;

const EnhanceStoryOutputSchema = z.object({
  checklistItems: z.array(
    z.string().describe('A list of checklist items to verify the story.')
  ).
describe('Checklist of potential sensitive details or gaps in the story.'),
});
export type EnhanceStoryOutput = z.infer<typeof EnhanceStoryOutputSchema>;

export async function enhanceStoryWithAISuggestions(
  input: EnhanceStoryInput
): Promise<EnhanceStoryOutput> {
  return enhanceStoryFlow(input);
}

const enhanceStoryPrompt = ai.definePrompt({
  name: 'enhanceStoryPrompt',
  input: {schema: EnhanceStoryInputSchema},
  output: {schema: EnhanceStoryOutputSchema},
  prompt: `You are a helpful assistant that helps enhance family stories by identifying potential sensitive details or gaps in the narrative.

  Given the following family story, generate a checklist of items the user should verify for accuracy and consent before publishing. Focus on potential privacy concerns, missing information, or areas where more context might be needed.

  Story: {{{story}}}
  Family Name: {{{familyName}}}
  Family Member Name: {{{memberFirstName}}}

  Format the output as a list of checklist items.
  `,
});

const enhanceStoryFlow = ai.defineFlow(
  {
    name: 'enhanceStoryFlow',
    inputSchema: EnhanceStoryInputSchema,
    outputSchema: EnhanceStoryOutputSchema,
  },
  async input => {
    const {output} = await enhanceStoryPrompt(input);
    return output!;
  }
);
