import { Header } from '@/components/common/Header';

export function AnalysisPage() {
  return (
    <>
      <Header title="Analysis" />
      <div className="flex flex-1 items-center justify-center text-muted-foreground">
        <div className="text-center">
          <p className="text-lg font-medium">Results Analysis</p>
          <p className="mt-1 text-sm">Comprehension scores, ANOVA results, and confidence-comprehension gap analysis.</p>
        </div>
      </div>
    </>
  );
}
