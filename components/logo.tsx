import { Compass } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-3 text-xl font-bold', className)}
    >
      <div className="bg-primary p-2 rounded-lg">
        <Compass className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="text-foreground">Компас Карьеры</span>
    </Link>
  );
}
