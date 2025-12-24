import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <PageLayout>
      <div className="container mx-auto max-w-5xl py-8 px-4 space-y-8">
        <Card>
          <CardHeader className="text-center">
            <Skeleton className="h-8 w-1/2 mx-auto" />
            <Skeleton className="h-6 w-1/3 mx-auto mt-2" />
          </CardHeader>
          <CardContent className="space-y-8">
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-[150px] w-full" />
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
