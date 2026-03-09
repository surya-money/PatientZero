import type { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  children?: ReactNode;
}

export function Header({ title, children }: HeaderProps) {
  return (
    <header className="flex h-12 items-center justify-between border-b border-border bg-background px-4">
      <span className="text-sm font-medium text-muted-foreground truncate">{title}</span>
      {children && <div className="shrink-0">{children}</div>}
    </header>
  );
}
