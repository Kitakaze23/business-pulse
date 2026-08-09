import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BarChart3, MessageSquareHeart, Bell, MoreHorizontal } from "lucide-react";
import type { ReactNode } from "react";

const tabs = [
  { to: "/", label: "Главная", icon: Home },
  { to: "/analytics", label: "Аналитика", icon: BarChart3 },
  { to: "/advisor", label: "Советник", icon: MessageSquareHeart },
  { to: "/notifications", label: "Уведомления", icon: Bell },
  { to: "/more", label: "Ещё", icon: MoreHorizontal },
];

export function PhoneShell({
  children,
  hideNav = false,
}: {
  children: ReactNode;
  hideNav?: boolean;
}) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-background">
      <div className={hideNav ? "flex-1" : "flex-1 pb-24"}>{children}</div>
      {!hideNav && (
        <nav className="fixed inset-x-0 bottom-0 mx-auto flex w-full max-w-[430px] items-stretch justify-between border-t border-border bg-card px-2 pb-3 pt-2">
          {tabs.map((t) => {
            const active = path === t.to;
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`flex flex-1 flex-col items-center gap-1 rounded-lg py-1 text-[10px] transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="size-5" strokeWidth={active ? 2.4 : 1.8} />
                {t.label}
              </Link>
            );
          })}
        </nav>
      )}
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
