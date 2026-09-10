import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Check, Lock } from "lucide-react";
import { PhoneShell, ScreenHeader, Card } from "@/components/PhoneShell";
import { businessStage } from "@/lib/advisor-data";

export const Route = createFileRoute("/my-business")({
  component: MyBusiness,
  head: () => ({
    meta: [
      { title: "Мой бизнес — стадия развития и задачи этапа" },
      {
        name: "description",
        content:
          "Где сейчас ваш бизнес, путь развития от нового к зрелому и что важно делать на текущем этапе.",
      },
      { property: "og:title", content: "Мой бизнес — стадия развития" },
      {
        property: "og:description",
        content: "Текущая стадия бизнеса, путь развития и приоритеты этапа.",
      },
    ],
  }),
});

function MyBusiness() {
  const router = useRouter();
  const currentIndex = businessStage.path.indexOf(businessStage.current);

  return (
    <PhoneShell>
      <ScreenHeader
        title="Мой бизнес"
        subtitle="Где я сейчас и куда двигаюсь"
        left={
          <button onClick={() => router.history.back()} aria-label="Назад">
            <ChevronLeft className="size-5" />
          </button>
        }
      />

      <div className="space-y-3 p-4">
        <Card>
          <p className="text-xs text-muted-foreground">Где я сейчас</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">{businessStage.current}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {businessStage.summary}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3">
            {businessStage.facts.map((f) => (
              <div key={f.label}>
                <p className="text-[10px] leading-tight text-muted-foreground">{f.label}</p>
                <p className="mt-1 text-sm font-semibold leading-tight">{f.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold">Путь развития</h2>
          <ol className="mt-4 space-y-3">
            {businessStage.path.map((name, i) => {
              const done = i < currentIndex;
              const current = i === currentIndex;
              return (
                <li key={name} className="flex items-center gap-3">
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                      current
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/15"
                        : done
                          ? "bg-primary/15 text-primary"
                          : "bg-secondary text-muted-foreground/60"
                    }`}
                  >
                    {done ? <Check className="size-3.5" /> : i > currentIndex ? <Lock className="size-3" /> : i + 1}
                  </span>
                  <span
                    className={`text-sm ${
                      current
                        ? "font-semibold text-primary"
                        : i > currentIndex
                          ? "text-muted-foreground/60"
                          : "text-muted-foreground"
                    }`}
                  >
                    {name}
                  </span>
                  {current && (
                    <span className="ml-auto rounded-full bg-primary/12 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      Текущая стадия
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold">Что важно на этом этапе</h2>
          <ul className="mt-3 space-y-2.5">
            {businessStage.focus.map((f) => (
              <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </Card>

        <Link to="/advisor" className="block">
          <Card className="flex items-center justify-between">
            <span className="text-sm font-semibold text-primary">Что мне делать дальше</span>
            <ChevronRight className="size-4 text-muted-foreground" />
          </Card>
        </Link>
      </div>
    </PhoneShell>
  );
}
