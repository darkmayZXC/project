import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type University = {
  name: string;
  url: string;
};

type CityUniversities = {
  city: string;
  universities: University[];
};

const universityData: CityUniversities[] = [
  {
    city: 'Кузбасс (Кемерово, Новокузнецк)',
    universities: [
      { name: 'Кемеровский государственный университет', url: 'https://kemsu.ru/' },
      { name: 'Сибирский государственный индустриальный университет', url: 'https://www.sibsiu.ru/' },
      { name: 'Кузбасский государственный технический университет', url: 'https://kuzstu.ru/' },
      { name: 'Кемеровский государственный медицинский университет', url: 'https://www.kemsma.ru/' },
    ],
  },
  {
    city: 'Томск',
    universities: [
      { name: 'Национальный исследовательский Томский государственный университет', url: 'https://www.tsu.ru/' },
      { name: 'Национальный исследовательский Томский политехнический университет', url: 'https://tpu.ru/' },
      { name: 'Сибирский государственный медицинский университет', url: 'https://www.ssmu.ru/' },
    ],
  },
  {
    city: 'Новосибирск',
    universities: [
      { name: 'Новосибирский национальный исследовательский государственный университет', url: 'https://www.nsu.ru/n/' },
      { name: 'Новосибирский государственный технический университет', url: 'https://www.nstu.ru/' },
      { name: 'Сибирский государственный университет путей сообщения', url: 'https://www.stu.ru/' },
    ],
  },
  {
    city: 'Красноярск',
    universities: [
        { name: 'Сибирский федеральный университет', url: 'https://www.sfu-kras.ru/' },
        { name: 'Сибирский государственный университет науки и технологий имени академика М.Ф. Решетнева', url: 'https://www.sibsau.ru/' },
        { name: 'Красноярский государственный медицинский университет имени профессора В.Ф. Войно-Ясенецкого', url: 'https://krasgmu.ru/' },
    ],
  },
  {
    city: 'Москва',
    universities: [
      { name: 'Московский государственный университет имени М.В. Ломоносова', url: 'https://www.msu.ru/ ' },
      { name: 'Национальный исследовательский университет «Высшая школа экономики»', url: 'https://www.hse.ru/' },
      { name: 'Московский физико-технический институт', url: 'https://mipt.ru/' },
      { name: 'Национальный исследовательский технологический университет «МИСиС»', url: 'https://misis.ru/' },
    ],
  },
  {
    city: 'Санкт-Петербург',
    universities: [
      { name: 'Санкт-Петербургский государственный университет', url: 'https://spbu.ru/' },
      { name: 'Санкт-Петербургский политехнический университет Петра Великого', url: 'https://www.spbstu.ru/' },
      { name: 'Университет ИТМО', url: 'https://itmo.ru/ru/' },
    ],
  },
];


export function UniversitySection() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight">Ведущие вузы России</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Ознакомьтесь с ведущими университетами в ключевых городах для получения качественного образования.
        </p>
      </div>
      <div className="max-w-4xl mx-auto mt-12">
        <Accordion type="single" collapsible className="w-full">
          {universityData.map((cityGroup) => (
            <AccordionItem value={cityGroup.city} key={cityGroup.city}>
              <AccordionTrigger className="text-xl">{cityGroup.city}</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3 pl-4 list-disc">
                  {cityGroup.universities.map((uni) => (
                    <li key={uni.name}>
                      <Link href={uni.url} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
                        {uni.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
