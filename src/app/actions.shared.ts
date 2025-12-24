import { z } from 'zod';

export const CareerPathGeneratorInputSchema = z.object({
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

export const CareerPathGeneratorOutputSchema = z.object({
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

export const careerPathSchema = z.object({
  location: z
    .string()
    .min(2, { message: 'Местоположение должно содержать не менее 2 символов.' }),
  educationLevel: z
    .string()
    .min(3, { message: 'Уровень образования должен быть указан.' }),
  context: z.string().optional(),
});
