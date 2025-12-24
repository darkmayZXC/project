
'use client';

import { Suspense, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { PageLayout } from '@/components/layout/page-layout';
import {
  klimovData,
  klimovCareers,
  klimovOrder,
  KlimovType,
} from '@/lib/klimov-data';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import Loading from './loading';
import { Download, Loader2 } from 'lucide-react';


function ResultsComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const scores: { type: KlimovType; score: number }[] = klimovOrder.map(
    (type) => ({
      type,
      score: parseInt(searchParams.get(type) || '0', 10),
    })
  );

  const totalScore = scores.reduce((acc, s) => acc + s.score, 0);

  const handleDownloadPdf = async () => {
    const content = resultsRef.current;
    if (!content) return;

    setIsGeneratingPdf(true);
    try {
      const canvas = await html2canvas(content, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('Klimov-Test-Results.pdf');
    } catch (error) {
      console.error('Error creating PDF:', error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };


  if (totalScore === 0) {
    let paramsReady = false;
    searchParams.forEach(() => (paramsReady = true));
    if (!paramsReady) return null;

    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Результаты не найдены</h2>
        <p className="text-muted-foreground mb-6">
          Пожалуйста, пройдите тест, чтобы увидеть свои результаты.
        </p>
        <Button onClick={() => router.push('/klimov/test')}>Пройти тест</Button>
      </div>
    );
  }

  const sortedScores = [...scores].sort((a, b) => b.score - a.score);
  const topThree = sortedScores.slice(0, 3);
  const primaryType = topThree[0].type;
  const suggestedCareers = klimovCareers[primaryType];

  const chartData = klimovOrder.map((type) => ({
    type: klimovData[type].name,
    score: scores.find((s) => s.type === type)?.score || 0,
    fill: `var(--chart-${klimovOrder.indexOf(type) + 1})`,
  }));

  const chartConfig = klimovOrder.reduce((acc, type, index) => {
    acc[type] = {
      label: klimovData[type].name,
      color: `hsl(var(--chart-${index + 1}))`,
    };
    return acc;
  }, {} as ChartConfig);
  chartConfig['score'] = {
      label: 'Баллы',
      color: 'hsl(var(--primary))',
  };


  return (
    <div className="container mx-auto max-w-5xl py-8 px-4 space-y-8">
       <div ref={resultsRef} className="bg-background rounded-lg p-4 sm:p-8">
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Ваши результаты (Тест Климова)</CardTitle>
            <CardDescription className="text-lg">
              Ваши ведущие типы:
              <span className="font-bold text-primary">
                {' '}{topThree.map((s) => klimovData[s.type].name).join(', ')}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Распределение баллов</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                  <ResponsiveContainer>
                    <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
                      <XAxis
                        dataKey="type"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        interval={0}
                        tickFormatter={(value) => value.split('-')[1] || value}
                      />
                      <YAxis />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                      />
                      <Bar dataKey="score" fill="var(--color-score)" radius={8} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {topThree.map((item, index) => {
                  const typeData = klimovData[item.type];
                  return (
                    <Card key={item.type}>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 p-3 rounded-lg w-fit">
                            <typeData.Icon className="h-8 w-8 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl">
                              {typeData.name}
                            </CardTitle>
                            <CardDescription>
                              {index === 0
                                ? 'Ваш основной тип'
                                : 'Дополнительный тип'}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{typeData.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Рекомендуемые профессии</CardTitle>
                <CardDescription>
                  На основе вашего основного типа, вот несколько
                  карьерных путей для рассмотрения:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suggestedCareers.map((career) => (
                    <Button
                      key={career.name}
                      variant="outline"
                      className="w-full h-full justify-start p-4 text-left flex-col items-start"
                      asChild
                    >
                      <Link href={`/career/${encodeURIComponent(career.name)}`}>
                        <span className="font-semibold whitespace-normal break-words">{career.name}</span>
                        <p className="text-xs text-muted-foreground mt-1 whitespace-normal">
                          {career.description}
                        </p>
                      </Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>

       <div className="text-center mt-8">
        <Button
          size="lg"
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {isGeneratingPdf ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          {isGeneratingPdf ? 'Создание PDF...' : 'Скачать результаты в PDF'}
        </Button>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <PageLayout>
      <Suspense fallback={<Loading />}>
        <ResultsComponent />
      </Suspense>
    </PageLayout>
  );
}
