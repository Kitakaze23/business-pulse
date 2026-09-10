import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, AlertTriangle, TrendingUp, Wallet, Target } from "lucide-react";
import { useState } from "react";
import { PhoneShell, ScreenHeader, Card } from "@/components/PhoneShell";
import { ProductCard, ProductModal } from "@/components/ProductShowcase";
import { byId, type Product } from "@/lib/products-data";
import { advisorFlows } from "@/lib/advisor-data";

export const Route = createFileRoute("/advisor")({
  component: Advisor,
  validateSearch: (search: Record<string, unknown>): { flow?: string } =>
    typeof search["flow"] === "string" ? { flow: search["flow"] } : {},
  head: () => ({
    meta: [
      { title: "Советник — что делать дальше с бизнесом" },
      {
        name: "description",
        content:
          "Что произошло, почему это важно, что рекомендуем и какой сервис поможет сделать следующий шаг.",
      },
      { property: "og:title", content: "Советник — что делать дальше" },
      {
        property: "og:description",
        content: "Инсайт, рекомендация, действие и подходящий сервис в одном месте.",
      },
    ],
  }),
});

const toneStyles = {
  risk: { icon: AlertTriangle, box: "bg-danger/12 text-danger" },
  growth: { icon: TrendingUp, box: "bg-success/12 text-success" },
  care: { icon: Wallet, box: "bg-info/12 text-info" },
} as const;

function Advisor() {
  const router = useRouter();
  const { flow: flowParam } = Route.useSearch();
  const [open, setOpen] = useState<Product | null>(null);
  const [activeId, setActiveId] = useState<string>(
    advisorFlows.find((f) => f.id === flowParam)?.id ?? advisorFlows[0]!.id
  );

  const flow = advisorFlows.find((f) => f.id === activeId)!;
  const tone = toneStyles[flow.tone];
  const Icon = tone.icon;
  const service = byId(flow.serviceId);

  return (
    <PhoneShell>
      <ScreenHeader
        title="Советник"
        subtitle="Что мне делать дальше"
        left={
          <button onClick={() => router.history.back()} aria-label="Назад">
            <ChevronLeft className="size-5" />
          </button>
        }
      />

      <div className="border-b border-border bg-card px-5">
        <div className="flex gap-5 overflow-x-auto text-sm">
          {advisorFlows.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveId(f.id)}
              className={`-mb-px shrink-0 border-b-2 py-3 font-medium transition-colors ${
                activeId === f.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              {f.signal}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 p-4">
        <Card>
          <div className="flex gap-3">
            <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${tone.box}`}>
              <Icon className="size-5" />
            </span>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Что произошло</p>
              <h2 className="mt-1 text-base font-semibold leading-snug">{flow.what}</h2>
            </div>
          </div>

          <div className="mt-4 border-t border-border pt-3">
            <p className="text-xs font-semibold text-muted-foreground">Почему это важно</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{flow.why}</p>
          </div>

          <div className="mt-4 border-t border-border pt-3">
            <p className="text-xs font-semibold text-muted-foreground">Что рекомендуем</p>
            <p className="mt-1 text-sm leading-relaxed">{flow.recommend}</p>
            <p className="mt-2 text-[11px] text-muted-foreground">Приоритет: {flow.priority}</p>
          </div>

          <Link
            to="/metric/$id"
            params={{ id: flow.metricId }}
            className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm font-semibold text-primary"
          >
            Посмотреть показатель
            <ChevronRight className="size-4 text-muted-foreground" />
          </Link>
        </Card>

        <Card>
          <p className="text-xs text-muted-foreground">Следующий шаг</p>
          <p className="mt-1 text-base font-semibold leading-snug">{flow.action}</p>
          {service && (
            <p className="mt-2 text-xs text-muted-foreground">
              Поможет сервис: <span className="font-semibold text-foreground">{service.name}</span>
            </p>
          )}
          <button
            type="button"
            onClick={() => service && setOpen(service)}
            className="mt-3 h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
          >
            {flow.cta}
          </button>
        </Card>

        {service && (
          <>
            <p className="px-1 pt-1 text-xs font-semibold text-muted-foreground">
              Инструмент для этого шага
            </p>
            <ProductCard product={service} reason={flow.recommend} onOpen={setOpen} />
          </>
        )}

        <Link to="/tasks" className="block">
          <Card>
            <div className="flex gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <Target className="size-5" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold leading-snug">Мои задачи</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Выберите задачу — подберём диагностику, шаги и сервисы.
                </p>
              </div>
              <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
            </div>
          </Card>
        </Link>
      </div>

      {open && <ProductModal product={open} onClose={() => setOpen(null)} />}
    </PhoneShell>
  );
}
