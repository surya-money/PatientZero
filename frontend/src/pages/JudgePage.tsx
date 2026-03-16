import { Header } from '@/components/common/Header';

export function JudgePage() {
  return (
    <>
      <Header title="Judge Calibration" />
      <div className="flex flex-1 items-center justify-center text-muted-foreground">
        <div className="text-center">
          <p className="text-lg font-medium">Judge Calibration</p>
          <p className="mt-1 text-sm">Inter-rater reliability, adversarial test results, and consistency checks.</p>
        </div>
      </div>
    </>
  );
}
