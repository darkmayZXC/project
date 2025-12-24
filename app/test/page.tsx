import { PageLayout } from '@/components/layout/page-layout';
import { TestComponent } from '@/components/test-component';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { questions, RiasecTheme } from '@/lib/riasec-data';

export default function TestPage() {
  return (
    <PageLayout>
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">
              Тест на профориентацию (по Холланду)
            </CardTitle>
            <CardDescription className="text-lg">
              Оцените, насколько вам нравятся следующие виды деятельности.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TestComponent questions={questions} resultsPage="/results" />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
