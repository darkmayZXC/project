import { Logo } from '@/components/logo';

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="p-4 md:p-6">
        <Logo />
      </header>
      <main className="flex-1">{children}</main>
      <footer className="p-4 md:p-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Компас Карьеры. Все права защищены.
      </footer>
    </>
  );
}
