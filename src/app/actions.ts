'use server';

import {
  type CareerPathGeneratorInput as CareerPathGeneratorInputType,
  careerPathGenerator as careerPathGeneratorFlow,
} from '@/ai/flows/career-path-generator';
import type {
  CareerPathGeneratorInput,
  CareerPathGeneratorOutput,
} from '@/app/actions.shared';

export async function generateCareerPath(
  input: CareerPathGeneratorInput
): Promise<CareerPathGeneratorOutput> {
  try {
    const result = await careerPathGeneratorFlow(
      input as CareerPathGeneratorInputType
    );
    return result;
  } catch (e) {
    console.error('AI career path generation failed:', e);
    throw new Error(
      'Не удалось связаться с ИИ-ассистентом. Пожалуйста, попробуйте позже.'
    );
  }
}
