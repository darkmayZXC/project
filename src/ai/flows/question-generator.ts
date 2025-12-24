'use server';

/**
 * @fileOverview An AI agent that dynamically generates questions for the RIASEC test.
 *
 * - questionGenerator - A function that generates the next question based on previous answers.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { RiasecTheme } from '@/lib/riasec-data';

const AnswerSchema = z.object({
  question: z.string(),
  theme: z.nativeEnum(RiasecTheme),
  answer: z.number().min(0).max(5),
});

const QuestionGeneratorInputSchema = z.object({
  history: z.array(AnswerSchema).describe('The list of questions already answered by the user.'),
});
export type QuestionGeneratorInput = z.infer<typeof QuestionGeneratorInputSchema>;

const QuestionGeneratorOutputSchema = z.object({
  text: z.string().describe('The new question to ask the user.'),
  theme: z.nativeEnum(RiasecTheme).describe('The RIASEC theme of the new question.'),
});
export type QuestionGeneratorOutput = z.infer<typeof QuestionGeneratorOutputSchema>;

const questionGeneratorFlow = ai.defineFlow(
  {
    name: 'questionGeneratorFlow',
    inputSchema: QuestionGeneratorInputSchema,
    outputSchema: QuestionGeneratorOutputSchema,
  },
  async (input) => {
    const prompt = ai.definePrompt({
      name: 'questionGeneratorPrompt',
      input: { schema: QuestionGeneratorInputSchema },
      output: { schema: QuestionGeneratorOutputSchema },
      prompt: `You are an expert career counselor administering a RIASEC (Holland Code) test. Your task is to dynamically generate the next question based on the user's previous answers.

The user rates activities on a scale of 0 (dislike) to 5 (like). The goal is to create a test of about 15-20 questions.

Analyze the user's answer history:
1. Identify the themes with the highest scores. Generate a question that delves deeper into one of these themes to confirm the user's interest.
2. If the user's answers seem inconsistent (e.g., they like and dislike very similar activities), generate a "control" question to verify their preferences.
3. If a theme is clearly not of interest, avoid asking more questions about it.
4. The question should be a short, clear description of an activity.
5. You MUST assign one of the following RIASEC themes to the question: 'R', 'I', 'A', 'S', 'E', 'C'.

Answer History:
{{#if history.length}}
{{#each history}}
- Question: "{{this.question}}" (Theme: {{this.theme}}), Answer: {{this.answer}}
{{/each}}
{{else}}
This is the first question. Start with a general question.
{{/if}}

Generate the next question and its theme.`,
    });

    const { output } = await prompt(input);
    return output!;
  }
);

export async function questionGenerator(
  input: QuestionGeneratorInput
): Promise<QuestionGeneratorOutput> {
  return questionGeneratorFlow(input);
}
