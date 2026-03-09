interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex h-12 items-center justify-center border-b border-border bg-background">
      <span className="text-sm font-medium text-muted-foreground">{title}</span>
    </header>
  );
}
