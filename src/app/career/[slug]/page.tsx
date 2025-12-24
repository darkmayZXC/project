'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import {
  careerPathSchema,
  type CareerPathGeneratorOutput,
  generateCareerPath,
} from '@/app/actions';

import { PageLayout } from '@/components/layout/page-layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { School, Briefcase, TrendingUp, Loader2 } from 'lucide-react';

type FormData = z.infer<typeof careerPathSchema>;

function renderMarkdown(markdown: string) {
  const html = markdown
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-primary/80">$1</a>')
    .replace(/\n/g, '<br />')
    .replace(/\* /g, '&bull; ');
  
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}


export default function CareerPage({ params }: { params: { slug: string } }) {
  const career = decodeURIComponent(params.slug);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CareerPathGeneratorOutput | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(careerPathSchema),
    defaultValues: {
      location: '',
      educationLevel: '',
      context: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setResult(null);
    try {
      const aiResult = await generateCareerPath({ ...data, career });
      if (aiResult) {
        setResult(aiResult);
      } else {
        throw new Error('Не удалось сгенерировать карьерный путь.');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description:
          error instanceof Error
            ? error.message
            : 'Произошла неизвестная ошибка.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto max-w-4xl py-8 px-4 space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold">{career}</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Персональный план развития карьеры
          </p>
        </header>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Создайте свой карьерный путь</CardTitle>
            <CardDescription>
              Заполните форму ниже, чтобы получить персональные рекомендации от
              нашего ИИ-ассистента.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ваше местоположение (город, страна)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Например, Москва, Россия"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="educationLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ваш текущий уровень образования</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Например, Бакалавр компьютерных наук"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="context"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Дополнительный контекст (необязательно)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Например, имею 2 года опыта в веб-разработке, хочу сменить стек."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {loading ? 'Генерация...' : 'Сгенерировать план'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {loading && (
          <div className="text-center py-10">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">
              Наш ИИ-ассистент готовит для вас рекомендации...
            </p>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">
              Ваш персональный карьерный план
            </h2>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <School className="h-8 w-8 text-primary" />
                <CardTitle>Образовательные пути</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none break-words">
                {renderMarkdown(result.educationalPaths)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Briefcase className="h-8 w-8 text-primary" />
                <CardTitle>Развитие навыков</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none break-words">
                {renderMarkdown(result.skillDevelopmentResources)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <TrendingUp className="h-8 w-8 text-primary" />
                <CardTitle>Анализ рынка труда</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none break-words">
                 {renderMarkdown(result.jobMarketInsights)}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
export async function generateStaticParams() {
  // Возвращаем список всех возможных slug-ов
  // Например, это создаст страницы /career/developer и /career/manager
  return [
    { slug: 'developer' },
    { slug: 'manager' },
  ];
}