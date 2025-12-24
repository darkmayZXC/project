import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type College = {
  name: string;
  url: string;
};

const collegeData: College[] = [
    { name: 'Кузбасский педагогический колледж', url: 'https://www.kuzpk.ru/' },
    { name: 'Кемеровский коммунально-строительный техникум', url: 'https://kkst.ru/' },
    { name: 'Сибирский политехнический техникум', url: 'https://sibpt.ru/' },
    { name: 'Кузбасский технический колледж', url: 'https://www.kushtc.ru/' },
    { name: 'Новокузнецкий горнотранспортный колледж', url: 'https://ngtk.su/' },
    { name: 'Прокопьевский горнотехнический техникум', url: 'https://pgt.prokop-gs.ru/' },
    { name: 'Кузбасский колледж архитектуры, строительства и цифровых технологий', url: 'https://www.kkacdt.ru/' },
];


export function CollegeSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight">Ведущие колледжи и техникумы Кузбасса</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Ознакомьтесь с ведущими учреждениями среднего профессионального образования (СПО) в Кузбассе.
        </p>
      </div>
      <div className="max-w-4xl mx-auto mt-12">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="kuzbass-colleges">
              <AccordionTrigger className="text-xl">Колледжи и техникумы</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3 pl-4 list-disc">
                  {collegeData.map((college) => (
                    <li key={college.name}>
                      <Link href={college.url} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
                        {college.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
