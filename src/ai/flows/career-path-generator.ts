'use server';

/**
 * @fileOverview A career path generator AI agent.
 *
 * - careerPathGenerator - A function that handles the career path generation process.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CareerPathGeneratorInputSchema = z.object({
  career: z.string().describe('The recommended career for the user.'),
  location: z.string().describe('The location of the user.'),
  educationLevel: z.string().describe('The education level of the user.'),
  context: z
    .string()
    .optional()
    .describe('Any other relevant context about the user.'),
});
export type CareerPathGeneratorInput = z.infer<
  typeof CareerPathGeneratorInputSchema
>;

const CareerPathGeneratorOutputSchema = z.object({
  educationalPaths: z
    .string()
    .describe('Suggested educational paths for the career, in Markdown format.'),
  skillDevelopmentResources: z
    .string()
    .describe('Recommended skill development resources, in Markdown format.'),
  jobMarketInsights: z
    .string()
    .describe('Job market insights for the career and location, in Markdown format.'),
});
export type CareerPathGeneratorOutput = z.infer<
  typeof CareerPathGeneratorOutputSchema
>;

const careerPathGeneratorFlow = ai.defineFlow(
  {
    name: 'careerPathGeneratorFlow',
    inputSchema: CareerPathGeneratorInputSchema,
    outputSchema: CareerPathGeneratorOutputSchema,
  },
  async (input) => {
    const prompt = ai.definePrompt({
      name: 'careerPathGeneratorPrompt',
      input: { schema: CareerPathGeneratorInputSchema },
      output: { schema: CareerPathGeneratorOutputSchema },
      prompt: `You are an AI-powered career path generator. You will suggest educational paths, skill development resources, and job market insights for the user's recommended career, considering their location, education level, and other relevant context.

You MUST format your entire response using Markdown. Use headings, lists, and bold text to structure the information clearly.

When suggesting educational paths, include a section with links to leading universities in Russia that are relevant to the specified career. Focus on universities in the following cities: Kuzbass (e.g., Kemerovo, Novokuznetsk), Tomsk, Novosibirsk, Krasnoyarsk, Moscow, and St. Petersburg. For each university, provide a brief, one-sentence description of its relevant faculty or program and format it as a clickable link.

Example of university link format:
*   [Название университета](https://example.com) - Краткое описание релевантного факультета или программы.

Career: {{{career}}}
Location: {{{location}}}
Education Level: {{{educationLevel}}}
Context: {{{context}}}
`,
    });

    const { output } = await prompt(input);
    return output!;
  }
);

export async function careerPathGenerator(
  input: CareerPathGeneratorInput
): Promise<CareerPathGeneratorOutput> {
  return careerPathGeneratorFlow(input);
}
