import { Header } from '@/components/common/Header';

export function DashboardPage() {
  return (
    <>
      <Header title="Dashboard" />
      <div className="flex flex-1 items-center justify-center text-muted-foreground">
        <div className="text-center">
          <p className="text-lg font-medium">Experiment Dashboard</p>
          <p className="mt-1 text-sm">Run simulations to see progress and metrics here.</p>
        </div>
      </div>
    </>
  );
}
