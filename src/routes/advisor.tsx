import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Send, Repeat, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { PhoneShell, ScreenHeader, Card } from "@/components/PhoneShell";
import { recommendations } from "@/lib/business-data";

export const Route = createFileRoute("/advisor")({
  component: Advisor,
  head: () => ({
    meta: [
      { title: "Рекомендации советника для роста бизнеса" },
      {
        name: "description",
        content:
          "Персональные рекомендации: вернуть клиентов из базы, увеличить частоту покупок и средний чек.",
      },
      { property: "og:title", content: "Рекомендации советника" },
      {
        property: "og:description",
        content: "Конкретные шаги для роста выручки и удержания клиентов.",
      },
    ],
  }),
});

const icons = { return: Send, frequency: Repeat, basket: ShoppingBag } as const;
const accents = {
  blue: "bg-info/12 text-info",
  green: "bg-success/12 text-success",
  violet: "bg-violet/12 text-violet",
};

function Advisor() {
  const router = useRouter();
  const [tab, setTab] = useState<"you" | "all">("you");

  return (
    <PhoneShell>
      <ScreenHeader
        title="Рекомендации"
        left={
          <button onClick={() => router.history.back()} aria-label="Назад">
            <ChevronLeft className="size-5" />
          </button>
        }
      />
      <div className="border-b border-border bg-card px-5">
        <div className="flex gap-6 text-sm">
          {(
            [
              ["you", "Для вас"],
              ["all", "Все рекомендации"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`-mb-px border-b-2 py-3 font-medium transition-colors ${
                tab === key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 p-4">
        {(tab === "you" ? recommendations : [...recommendations].reverse()).map((r) => {
          const Icon = icons[r.id as keyof typeof icons];
          return (
            <Card key={r.id}>
              <div className="flex gap-3">
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${accents[r.accent]}`}
                >
                  <Icon className="size-5" />
                </span>
                <div className="flex-1">
                  <div className="flex items-start gap-2">
                    <h2 className="flex-1 text-base font-semibold leading-snug">{r.title}</h2>
                    <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
                  <p className="mt-3 text-xs text-muted-foreground">Приоритет: {r.priority}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </PhoneShell>
  );
}
