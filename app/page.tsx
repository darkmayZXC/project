import Image from 'next/image';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/page-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Users } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { UniversitySection } from '@/components/university-section';
import { TopProfessionsSection } from '@/components/top-professions-section';
import { CollegeSection } from '@/components/college-section';

export default function Home() {
  const heroImage = PlaceHolderImages.find(
    (img) => img.id === 'hero-career-guidance'
  );

  const features = [
    'Определите свой тип личности по одной из двух методик',
    'Получите список подходящих профессий',
    'Создайте персональный план развития карьеры с помощью ИИ',
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Найдите свой идеальный карьерный путь
            </h1>
            <p className="text-lg text-muted-foreground">
              Наши инструменты «Компас Карьеры» помогут вам раскрыть свои сильные стороны и найти
              профессию, которая вам действительно подходит.
            </p>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/test">
                  Тест по Холланду
                </Link>
              </Button>
               <Button size="lg" asChild variant="secondary">
                <Link href="/klimov/test">
                  Тест по Климову
                </Link>
              </Button>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl aspect-square flex items-center justify-center relative">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                quality={100}
                data-ai-hint={heroImage.imageHint}
                className="object-cover"
                priority
              />
            )}
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
             <h2 className="text-3xl font-bold tracking-tight">
              Выберите свой тест
            </h2>
             <p className="mt-4 text-lg text-muted-foreground">
              Мы предлагаем два популярных теста для профориентации.
            </p>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <Card className="hover:shadow-xl hover:-translate-y-1 transition-transform duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-lg w-fit">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4 text-center">Тест по Холланду (RIASEC)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Определите свой тип личности (Реалистичный, Исследовательский, Артистичный, Социальный, Предприимчивый, Конвенциональный) и узнайте, какие профессии соответствуют вашему профилю.
                </p>
                <Button className="w-full mt-6" asChild>
                  <Link href="/test">Пройти тест Холланда</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl hover:-translate-y-1 transition-transform duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-lg w-fit">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4 text-center">Тест по Климову</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Определите свою склонность к одному из пяти типов профессий: «человек-природа», «человек-техника», «человек-человек», «человек-знаковая система», «человек-художественный образ».
                </p>
                 <Button className="w-full mt-6" asChild>
                  <Link href="/klimov/test">Пройти тест Климова</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <TopProfessionsSection />

        <CollegeSection />

        <UniversitySection />
      </div>
    </PageLayout>
  );
}
