import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { PhoneShell, ScreenHeader } from "@/components/PhoneShell";
import { insight } from "@/lib/business-data";

export const Route = createFileRoute("/insight")({
  component: Insight,
  head: () => ({
    meta: [
      { title: "Инсайт: повторные покупки снизились на 14%" },
      {
        name: "description",
        content:
          "Что произошло с повторными покупками, как это влияет на выручку и какие шаги предпринять.",
      },
      { property: "og:title", content: "Инсайт: повторные покупки снизились на 14%" },
      {
        property: "og:description",
        content: "Разбор причин снижения повторных покупок и влияния на бизнес.",
      },
    ],
  }),
});

function Insight() {
  const router = useRouter();
  return (
    <PhoneShell hideNav>
      <ScreenHeader
        title="Инсайт"
        left={
          <button onClick={() => router.history.back()} aria-label="Назад">
            <ArrowLeft className="size-5" />
          </button>
        }
        right={<MoreHorizontal className="size-5 text-muted-foreground" />}
      />
      <div className="min-h-screen bg-card">
        <div className="bg-danger/8 px-5 py-5">
          <h2 className="text-xl font-semibold leading-snug">{insight.title}</h2>
          <span className="mt-3 inline-block rounded-full bg-danger/12 px-3 py-1 text-xs font-medium text-danger">
            {insight.tag}
          </span>
        </div>

        <div className="space-y-6 px-5 py-5">
          <p className="text-sm leading-relaxed">{insight.summary}</p>

          <div>
            <h3 className="text-sm font-semibold">Что произошло</h3>
            <ul className="mt-2 space-y-2">
              {insight.what.map((w) => (
                <li key={w} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
                  {w}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Как это влияет</h3>
            <p className="mt-2 text-sm text-muted-foreground">{insight.impact}</p>
          </div>

          <Link
            to="/advisor"
            className="block rounded-xl bg-primary py-4 text-center text-sm font-semibold text-primary-foreground"
          >
            Смотреть рекомендации
          </Link>
        </div>
      </div>
    </PhoneShell>
  );
}
