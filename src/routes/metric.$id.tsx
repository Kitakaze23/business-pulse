import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PhoneShell, ScreenHeader, Card } from "@/components/PhoneShell";
import { metrics } from "@/lib/business-data";
import { metricDetailById, flowById } from "@/lib/advisor-data";

export const Route = createFileRoute("/metric/$id")({
  component: MetricScreen,
  head: () => ({
    meta: [
      { title: "Показатель бизнеса — динамика и причины изменений" },
      {
        name: "description",
        content:
          "Динамика показателя, что изменилось, что на него влияет, возможная причина и рекомендация.",
      },
      { property: "og:title", content: "Показатель бизнеса — что происходит" },
      {
        property: "og:description",
        content: "Разбор одного показателя здоровья бизнеса: динамика, влияние и причина.",
      },
    ],
  }),
});

function MetricScreen() {
  const { id } = Route.useParams();
  const router = useRouter();
  const detail = metricDetailById(id);
  const metric = metrics.find((m) => m.id === id);

  if (!detail || !metric) {
    return (
      <PhoneShell>
        <ScreenHeader
          title="Показатель"
          left={
            <button onClick={() => router.history.back()} aria-label="Назад">
              <ChevronLeft className="size-5" />
            </button>
          }
        />
        <div className="p-4">
          <Card>
            <p className="text-sm text-muted-foreground">Показатель не найден.</p>
          </Card>
        </div>
      </PhoneShell>
    );
  }

  const flow = flowById(detail.flowId);
  const max = Math.max(...detail.dynamics.map((d) => d.value));

  return (
    <PhoneShell>
      <ScreenHeader
        title={detail.title}
        subtitle="Что происходит с показателем"
        left={
          <button onClick={() => router.history.back()} aria-label="Назад">
            <ChevronLeft className="size-5" />
          </button>
        }
      />

      <div className="space-y-3 p-4">
        <Card>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold tracking-tight">{metric.value}</span>
            <span
              className={`pb-1.5 text-sm font-semibold ${
                metric.delta > 0 ? "text-success" : "text-danger"
              }`}
            >
              {metric.delta > 0 ? `+${metric.delta}` : metric.delta} за неделю
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{detail.question}</p>

          <div className="mt-5 flex items-end gap-3">
            {detail.dynamics.map((d) => (
              <div key={d.period} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-semibold">{d.value}</span>
                <div className="flex h-24 w-full items-end rounded-lg bg-secondary">
                  <div
                    className="w-full rounded-lg bg-primary"
                    style={{ height: `${(d.value / max) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] text-muted-foreground">{d.period}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold">Что изменилось</h2>
          <ul className="mt-3 space-y-2">
            {detail.changed.map((c) => (
              <li key={c} className="flex gap-2 text-sm text-muted-foreground">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
                {c}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold">Что влияет на показатель</h2>
          <ul className="mt-1 divide-y divide-border">
            {detail.influences.map((f) => (
              <li key={f.name} className="flex items-center gap-2 py-3 text-sm">
                <span className="flex-1 text-muted-foreground">{f.name}</span>
                <span className={`font-semibold ${f.positive ? "text-success" : "text-danger"}`}>
                  {f.delta}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold">Возможная причина</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail.cause}</p>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold">Рекомендация</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {detail.recommendation}
          </p>
          <Link
            to="/advisor"
            search={flow ? { flow: flow.id } : undefined}
            className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm font-semibold text-primary"
          >
            Перейти к советнику
            <ChevronRight className="size-4 text-muted-foreground" />
          </Link>
        </Card>
      </div>
    </PhoneShell>
  );
}
