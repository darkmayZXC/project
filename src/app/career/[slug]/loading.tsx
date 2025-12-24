import { PageLayout } from '@/components/layout/page-layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <PageLayout>
      <div className="container mx-auto max-w-4xl py-8 px-4 space-y-8">
        <div className="text-center">
          <Skeleton className="h-10 w-1/2 mx-auto" />
          <Skeleton className="h-6 w-1/3 mx-auto mt-2" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-5 w-2/3 mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-full mt-4" />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
