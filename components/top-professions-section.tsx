import { topProfessions } from '@/lib/top-professions-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Briefcase, RussianRuble } from 'lucide-react';

export function TopProfessionsSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">
            🔥 ТОП-10 востребованных профессий на ближайшие пять лет
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Обзор самых актуальных профессий на российском рынке труда.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {topProfessions.map((profession) => (
            <Card key={profession.title} className="flex flex-col">
              <CardHeader>
                <CardTitle>{profession.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col space-y-4">
                <p className="text-sm text-muted-foreground">{profession.description}</p>
                
                <div className="space-y-3 pt-4 border-t">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2"><Briefcase className="text-primary"/> Рекомендуемые навыки:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-1">
                      {profession.skills.map((skill, i) => <li key={i}>{skill}</li>)}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold flex items-center gap-2"><RussianRuble className="text-primary"/> Зарплата:</h4>
                    <p className="text-sm text-muted-foreground mt-1">{profession.salary}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold flex items-center gap-2"><GraduationCap className="text-primary"/> Образование:</h4>
                    <p className="text-sm text-muted-foreground mt-1">{profession.education}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
