import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Banknote,
  Users,
  TrendingUp,
  ShieldCheck,
  Gauge,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { PhoneShell, ScreenHeader, Card } from "@/components/PhoneShell";
import { metrics, factors, pulse } from "@/lib/business-data";

export const Route = createFileRoute("/analytics")({
  component: Analytics,
  head: () => ({
    meta: [
      { title: "Business Health — показатели бизнеса" },
      {
        name: "description",
        content:
          "Доход, клиенты, рост, стабильность и эффективность: подробная разбивка балла здоровья бизнеса.",
      },
      { property: "og:title", content: "Business Health — показатели бизнеса" },
      {
        property: "og:description",
        content: "Разбивка балла здоровья бизнеса по пяти ключевым метрикам.",
      },
    ],
  }),
});

const icons = [Banknote, Users, TrendingUp, ShieldCheck, Gauge];

function Analytics() {
  return (
    <PhoneShell>
      <ScreenHeader
        title="Business Health"
        subtitle={pulse.updated}
        left={
          <Link to="/" aria-label="Назад">
            <ChevronLeft className="size-5" />
          </Link>
        }
      />
      <div className="space-y-3 p-4">
        <Card className="space-y-5">
          {metrics.map((m, i) => {
            const Icon = icons[i] ?? Banknote;
            const bar =
              m.tone === "good" ? "bg-success" : m.tone === "warn" ? "bg-warning" : "bg-danger";
            return (
              <div key={m.id} className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-secondary">
                  <Icon className="size-4 text-primary" />
                </span>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium">{m.name}</span>
                    <span className="text-base font-semibold">{m.value}</span>
                  </div>
                  <div className="mt-2 h-1 w-full rounded-full bg-secondary">
                    <div className={`h-1 rounded-full ${bar}`} style={{ width: `${m.value}%` }} />
                  </div>
                </div>
                <span
                  className={`w-8 text-right text-xs font-semibold ${
                    m.delta > 0 ? "text-success" : "text-danger"
                  }`}
                >
                  {m.delta > 0 ? `+${m.delta}` : m.delta}
                </span>
              </div>
            );
          })}
        </Card>

        <Card>
          <h2 className="text-sm font-semibold">Что влияет на оценку</h2>
          <ul className="mt-3 divide-y divide-border">
            {factors.map((f) => (
              <li key={f.name} className="flex items-center gap-2 py-3 text-sm">
                <ChevronRight className="size-3.5 text-muted-foreground" />
                <span className="flex-1 text-muted-foreground">{f.name}</span>
                <span
                  className={`font-semibold ${f.positive ? "text-success" : "text-danger"}`}
                >
                  {f.delta}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </PhoneShell>
  );
}
