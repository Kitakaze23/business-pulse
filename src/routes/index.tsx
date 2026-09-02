import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, ChevronRight, UserRound, Lightbulb, Rocket, Lock } from "lucide-react";
import { useEffect, useState } from "react";

const LAUNCH_MODE_KEY = "bp-launch-mode";
import { PhoneShell, ScreenHeader, Card } from "@/components/PhoneShell";
import { TabBar } from "@/components/TabBar";
import { BusinessLaunch } from "@/components/BusinessLaunch";
import { ServicesWidget } from "@/components/ServicesWidget";
import { pulse, insight, recommendations } from "@/lib/business-data";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Бизнес Пульс — здоровье бизнеса в одном балле" },
      {
        name: "description",
        content:
          "Оценка состояния бизнеса, ключевые инсайты и персональные рекомендации по росту выручки и удержанию клиентов.",
      },
      { property: "og:title", content: "Бизнес Пульс — здоровье бизнеса" },
      {
        property: "og:description",
        content: "Балл здоровья бизнеса, инсайты и рекомендации каждый день.",
      },
    ],
  }),
});

function ScoreRing({ score }: { score: number }) {
  const r = 78;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative mx-auto size-[200px]">
      <svg viewBox="0 0 200 200" className="size-full -rotate-90">
        <circle cx="100" cy="100" r={r} fill="none" strokeWidth="14" className="stroke-secondary" />
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          strokeWidth="14"
          strokeLinecap="round"
          className="stroke-primary"
          strokeDasharray={c}
          strokeDashoffset={c - (c * score) / 100}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold tracking-tight">{score}</span>
        <span className="mt-1 text-xs text-muted-foreground">{pulse.label}</span>
        <span className="mt-1 text-xs font-medium text-success">
          +{pulse.weekDelta} за неделю
        </span>
      </div>
    </div>
  );
}

const levels = [
  { name: "Новичок", state: "done" },
  { name: "Молодой", state: "done" },
  { name: "Развивающийся", state: "current" },
  { name: "Зрелый", state: "locked" },
] as const;

function LevelProgress() {
  const currentIndex = levels.findIndex((l) => l.state === "current");
  const fill = (currentIndex / (levels.length - 1)) * 100;

  return (
    <div className="mt-6 border-t border-border pt-5">
      <p className="text-xs text-muted-foreground">Ваш уровень бизнеса</p>
      <div className="relative mt-6 px-1">
        <div className="h-1.5 rounded-full bg-secondary" />
        <div
          className="absolute left-1 top-0 h-1.5 rounded-full bg-primary"
          style={{ width: `calc(${fill}% - ${fill > 0 ? 0 : 0}px)` }}
        />
        <div className="absolute inset-x-1 top-0 flex -translate-y-1/2 justify-between">
          {levels.map((l, i) => (
            <span
              key={l.name}
              className={`flex size-4 items-center justify-center rounded-full border-2 border-card ${
                l.state === "locked"
                  ? "bg-muted-foreground/35"
                  : i <= currentIndex
                    ? "bg-primary"
                    : "bg-secondary"
              } ${l.state === "current" ? "ring-4 ring-primary/20" : ""}`}
            />
          ))}
        </div>
      </div>
      <div className="mt-3 flex justify-between gap-1">
        {levels.map((l) => (
          <span
            key={l.name}
            className={`flex-1 text-center text-[10px] leading-tight ${
              l.state === "current"
                ? "font-semibold text-primary"
                : l.state === "locked"
                  ? "text-muted-foreground/50"
                  : "text-muted-foreground"
            }`}
          >
            {l.state === "locked" && <Lock className="mx-auto mb-0.5 size-3" />}
            {l.name}
          </span>
        ))}
      </div>
    </div>
  );
}



function Index() {
  const [launchMode, setLaunchModeState] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(LAUNCH_MODE_KEY) === "1") setLaunchModeState(true);
  }, []);

  const setLaunchMode = (value: boolean | ((v: boolean) => boolean)) => {
    setLaunchModeState((prev) => {
      const next = typeof value === "function" ? value(prev) : value;
      localStorage.setItem(LAUNCH_MODE_KEY, next ? "1" : "0");
      return next;
    });
  };

  const headerRight = (
    <span className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={launchMode}
        aria-label="Новый бизнес"
        onClick={() => setLaunchMode((v) => !v)}
        className="flex items-center gap-2"
      >
        <span className="text-[11px] leading-tight text-muted-foreground">
          Новый
          <br />
          бизнес
        </span>
        <span
          className={`relative h-5 w-9 rounded-full transition-colors ${
            launchMode ? "bg-primary" : "bg-secondary"
          }`}
        >
          <span
            className={`absolute top-0.5 size-4 rounded-full bg-card shadow-card transition-all ${
              launchMode ? "left-[18px]" : "left-0.5"
            }`}
          />
        </span>
      </button>
      <Link to="/notifications" aria-label="Уведомления" className="relative">
        <Bell className="size-5 text-foreground" />
        <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-danger" />
      </Link>
      <Link to="/more" aria-label="Профиль">
        <UserRound className="size-5 text-foreground" />
      </Link>
    </span>
  );

  if (launchMode) {
    return (
      <PhoneShell>
        <div className="animate-in fade-in pb-24 duration-300">
          <BusinessLaunch headerRight={headerRight} onGoToPulse={() => setLaunchMode(false)} />
        </div>
        <TabBar active="/" />
      </PhoneShell>
    );
  }

  return (
    <PhoneShell>
      <div className="animate-in fade-in duration-300">
      <ScreenHeader title="Бизнес Пульс" subtitle={pulse.updated} right={headerRight} />

      <div className="space-y-3 p-4">
        <Link to="/analytics" className="block">
          <Card className="py-6">
            <ScoreRing score={pulse.score} />
            <LevelProgress />
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
              <span>Показатели бизнеса</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </div>
          </Card>
        </Link>

        <Link to="/insight" className="block">
          <Card>
            <div className="flex gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-warning/12 text-warning">
                <Lightbulb className="size-5" />
              </span>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Главный инсайт</p>
                <h2 className="mt-1 text-base font-semibold leading-snug">{insight.title}</h2>
                <p className="mt-2 text-xs text-muted-foreground">
                  Это влияет на показатель «Клиенты»
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm">
              <span>Смотреть детали</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </div>
          </Card>
        </Link>

        <Link to="/advisor" className="block">
          <Card>
            <div className="flex gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-info/12 text-info">
                <Rocket className="size-5" />
              </span>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Рекомендация</p>
                <h2 className="mt-1 text-base font-semibold leading-snug">
                  {recommendations[0]?.text}
                </h2>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm">
              <span>Смотреть рекомендации</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </div>
          </Card>
        </Link>

        <ServicesWidget />
      </div>
      </div>
      <TabBar active="/" />
    </PhoneShell>
  );
}
