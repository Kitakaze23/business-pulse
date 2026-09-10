import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Target } from "lucide-react";
import { PhoneShell, ScreenHeader, Card } from "@/components/PhoneShell";
import { ProductCard, ProductModal } from "@/components/ProductShowcase";
import { byId, type Product } from "@/lib/products-data";
import { businessTasks } from "@/lib/advisor-data";

export const Route = createFileRoute("/tasks")({
  component: Tasks,
  head: () => ({
    meta: [
      { title: "Мои задачи — что хотите сделать с бизнесом" },
      {
        name: "description",
        content:
          "Выберите задачу бизнеса и получите диагностику, рекомендации и подходящие сервисы для её решения.",
      },
      { property: "og:title", content: "Мои задачи — Бизнес Пульс" },
      {
        property: "og:description",
        content: "Задача → диагностика → рекомендации → сервисы → действие.",
      },
    ],
  }),
});

function Tasks() {
  const router = useRouter();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState<Product | null>(null);
  const active = businessTasks.find((t) => t.id === activeId);

  return (
    <PhoneShell>
      <ScreenHeader
        title="Мои задачи"
        subtitle="Что хотите сделать?"
        left={
          <button onClick={() => router.history.back()} aria-label="Назад">
            <ChevronLeft className="size-5" />
          </button>
        }
      />

      <div className="space-y-3 p-4">
        <div className="flex flex-wrap gap-2">
          {businessTasks.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveId(activeId === t.id ? null : t.id)}
              className={`rounded-full px-3 py-2 text-xs font-medium transition-colors ${
                activeId === t.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground shadow-card"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {!active && (
          <Card className="text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
              <Target className="size-5" />
            </span>
            <p className="mt-3 text-sm text-muted-foreground">
              Выберите задачу — покажем, что происходит с бизнесом, что стоит сделать и какие
              сервисы помогут.
            </p>
          </Card>
        )}

        {active && (
          <>
            <Card>
              <p className="text-xs text-muted-foreground">Задача</p>
              <h2 className="mt-1 text-lg font-semibold leading-snug">{active.name}</h2>
              <p className="mt-3 text-xs font-semibold text-muted-foreground">Диагностика</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {active.diagnosis}
              </p>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold">Что рекомендуем</h3>
              <ol className="mt-3 space-y-3">
                {active.steps.map((s, i) => (
                  <li key={s} className="flex gap-3 text-sm">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/12 text-[11px] font-semibold text-primary">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground">{s}</span>
                  </li>
                ))}
              </ol>
            </Card>

            <p className="px-1 pt-1 text-xs font-semibold text-muted-foreground">
              Сервисы для этой задачи
            </p>
            {active.serviceIds.map((id) => {
              const p = byId(id);
              return p ? <ProductCard key={id} product={p} onOpen={setOpen} /> : null;
            })}

            <Card className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Задача → диагностика → рекомендации → сервисы
              </span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Card>
          </>
        )}
      </div>

      {open && <ProductModal product={open} onClose={() => setOpen(null)} />}
    </PhoneShell>
  );
}
