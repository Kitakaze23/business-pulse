import type { ReactNode } from "react";

export function PhoneShell({ children }: { children: ReactNode; hideNav?: boolean }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-background">
      <div className="flex-1 pb-8">{children}</div>
    </div>
  );
}

export function ScreenHeader({
  title,
  subtitle,
  right,
  left,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  left?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-card px-5 pb-4 pt-5">
      <div className="flex items-center gap-3">
        {left}
        <h1 className="flex-1 text-xl font-semibold tracking-tight">{title}</h1>
        {right}
      </div>
      {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
    </header>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl bg-card p-4 shadow-card ${className}`}>{children}</section>
  );
}
