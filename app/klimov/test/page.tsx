import { PageLayout } from '@/components/layout/page-layout';
import { TestComponent } from '@/components/test-component';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { questions, KlimovType } from '@/lib/klimov-data';

export default function KlimovTestPage() {
  return (
    <PageLayout>
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">
              Тест по методике Е.А. Климова
            </CardTitle>
            <CardDescription className="text-lg">
              Оцените, насколько вам нравятся следующие виды деятельности.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TestComponent questions={questions} resultsPage="/klimov/results" />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
