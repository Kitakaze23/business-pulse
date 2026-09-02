import { Link } from "@tanstack/react-router";
import { MessageCircle, Activity, BarChart3 } from "lucide-react";

const tabs = [
  { to: "/chat", label: "Чат", Icon: MessageCircle },
  { to: "/", label: "Пульс", Icon: Activity },
  { to: "/pro-analytics", label: "Аналитика", Icon: BarChart3 },
] as const;

export function TabBar({ active }: { active: "/chat" | "/" | "/pro-analytics" }) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2 border-t border-border bg-card pb-[env(safe-area-inset-bottom)]">
      <ul className="flex">
        {tabs.map(({ to, label, Icon }) => {
          const isActive = active === to;
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="size-5" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
