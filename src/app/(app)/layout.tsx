import Header from '@/components/common/header';

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto">
        {children}
      </main>
    </>
  );
}