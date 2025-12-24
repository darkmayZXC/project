'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Question {
  text: string;
  theme: string;
}

interface TestComponentProps {
  questions: Question[];
  resultsPage: string;
}

export function TestComponent({ questions, resultsPage }: TestComponentProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const progress = (Object.keys(answers).length / questions.length) * 100;
  const currentQuestion = questions[currentQuestionIndex];
  const currentSelection = answers[currentQuestionIndex]?.toString();

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: parseInt(value),
    });
  };

  const calculateResults = () => {
    const scores: Record<string, number> = {};
    questions.forEach((question, index) => {
      const answerValue = answers[index];
      if (answerValue !== undefined) {
        scores[question.theme] = (scores[question.theme] || 0) + answerValue;
      }
    });

    const query = new URLSearchParams(
      Object.entries(scores).map(([key, value]) => [key, value.toString()])
    ).toString();

    router.push(`${resultsPage}?${query}`);
  };

  return (
    <div className="space-y-6">
      <div className="sticky top-0 bg-card z-10 py-4">
        <Progress value={progress} className="w-full" />
        <p className="text-center text-sm text-muted-foreground mt-2">
          {Object.keys(answers).length} из {questions.length} вопросов отвечено
        </p>
      </div>

      <div className="p-4 border rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 min-h-[120px]">
        <p className="font-medium text-foreground flex-1">
          {currentQuestionIndex + 1}. {currentQuestion.text}
        </p>
        <RadioGroup
          key={currentQuestionIndex}
          value={currentSelection}
          onValueChange={handleAnswerChange}
          className="flex gap-2 shrink-0"
        >
          {[0, 1, 2, 3, 4, 5].map((value) => (
            <div key={value} className="flex flex-col items-center gap-1">
              <Label
                htmlFor={`q${currentQuestionIndex}-v${value}`}
                className="text-xs"
              >
                {value}
              </Label>
              <RadioGroupItem
                value={value.toString()}
                id={`q${currentQuestionIndex}-v${value}`}
              />
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex justify-between items-center pt-4">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          variant="outline"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Предыдущий вопрос
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentSelection === undefined}
        >
          {currentQuestionIndex === questions.length - 1
            ? 'Посмотреть результаты'
            : 'Следующий вопрос'}
          {currentQuestionIndex < questions.length - 1 && (
            <ChevronRight className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
