import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Banknote, Wallet, Users, Building2, Lock, Check } from "lucide-react";
import { PhoneShell, Card } from "@/components/PhoneShell";
import { AppHeader } from "@/components/AppHeader";
import { TabBar } from "@/components/TabBar";

export const Route = createFileRoute("/pro-analytics")({
  component: ProAnalytics,
  head: () => ({
    meta: [
      { title: "Детальная аналитика — Бизнес Пульс" },
      {
        name: "description",
        content:
          "Детальная аналитика доходов, расходов, клиентов и конкурентов доступна при подключении Сбер Прайм.",
      },
      { property: "og:title", content: "Детальная аналитика — Бизнес Пульс" },
      {
        property: "og:description",
        content: "Доходы, расходы, клиенты и данные по конкурентам в одном разделе.",
      },
    ],
  }),
});

const unlocks = [
  "Структура выручки по каналам и товарам",
  "Динамика расходов по категориям",
  "Сегменты клиентов",
  "Повторные покупки и возвращаемость",
  "Дополнительные показатели бизнеса",
  "Более глубокие рекомендации советника",
];

const features = [

  {
    Icon: Banknote,
    title: "Доходы",
    text: "Структура выручки по каналам, товарам и периодам, прогноз поступлений.",
  },
  {
    Icon: Wallet,
    title: "Расходы",
    text: "Разбивка затрат по категориям, контроль лимитов и точки экономии.",
  },
  {
    Icon: Users,
    title: "Клиенты",
    text: "Сегменты аудитории, частота покупок, отток и возвращаемость клиентов.",
  },
  {
    Icon: Building2,
    title: "Конкуренты",
    text: "Общие данные по рынку и конкурентам в вашей отрасли и районе.",
  },
];

const revenuePeriods = [
  {
    key: "day",
    label: "День",
    hint: "по часам, сегодня",
    bars: [
      1800, 1400, 1100, 900, 800, 1200, 2600, 4800, 7400, 9800, 12400, 15600,
      18200, 16900, 14200, 12800, 15600, 18900, 17400, 13600, 9800, 6400, 3600, 2200,
    ].map((v, i) => ({ label: String(i), value: v })),
  },
  {
    key: "week",
    label: "Неделя",
    hint: "по дням, текущая неделя",
    bars: [
      { label: "Пн", value: 62000 },
      { label: "Вт", value: 71500 },
      { label: "Ср", value: 68400 },
      { label: "Чт", value: 84200 },
      { label: "Пт", value: 96800 },
      { label: "Сб", value: 112300 },
      { label: "Вс", value: 74600 },
    ],
  },
  {
    key: "month",
    label: "Месяц",
    hint: "по дням, сентябрь",
    bars: [
      62000, 71500, 68400, 84200, 96800, 112300, 74600,
      64200, 73800, 70100, 86900, 99400, 115800, 76200,
      66800, 75200, 72600, 88300, 101200, 118400, 78900,
      69400, 76900, 74800, 90100, 103800, 121200, 81300,
      72100, 78400,
    ].map((v, i) => ({ label: String(i + 1), value: v })),
  },
  {
    key: "quarter",
    label: "Квартал",
    hint: "по месяцам, III квартал",
    bars: [
      { label: "Июл", value: 742000 },
      { label: "Авг", value: 806400 },
      { label: "Сен", value: 862400 },
    ],
  },
  {
    key: "year",
    label: "Год",
    hint: "по месяцам, 2026",
    bars: [
      { label: "Янв", value: 586000 },
      { label: "Фев", value: 612000 },
      { label: "Мар", value: 704000 },
      { label: "Апр", value: 698000 },
      { label: "Май", value: 746000 },
      { label: "Июн", value: 796000 },
      { label: "Июл", value: 742000 },
      { label: "Авг", value: 806400 },
      { label: "Сен", value: 862400 },
      { label: "Окт", value: 0 },
      { label: "Ноя", value: 0 },
      { label: "Дек", value: 0 },
    ],
  },
] as const;

const money = (v: number) => `${v.toLocaleString("ru-RU")} ₽`;

function RevenueChart() {
  const [period, setPeriod] = useState<(typeof revenuePeriods)[number]["key"]>("week");
  const current = revenuePeriods.find((p) => p.key === period)!;
  const max = Math.max(...current.bars.map((b) => b.value));
  const total = current.bars.reduce((s, b) => s + b.value, 0);

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold">Выручка</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">{current.hint}</p>
        </div>
        <div className="text-right">
          <p className="text-base font-semibold">{money(total)}</p>
          <p className="text-[11px] text-muted-foreground">за период</p>
        </div>
      </div>

      <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
        {revenuePeriods.map((p) => (
          <button
            key={p.key}
            type="button"
            aria-pressed={p.key === period}
            onClick={() => setPeriod(p.key)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
              p.key === period
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex h-40 items-end gap-2">
        {current.bars.map((b) => (
          <div key={b.label} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[9px] text-muted-foreground">
              {Math.round(b.value / 1000)}к
            </span>
            <div
              className="w-full rounded-t-lg bg-primary/85"
              style={{ height: `${Math.max(8, (b.value / max) * 118)}px` }}
            />
            <span className="text-[10px] text-muted-foreground">{b.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ProAnalytics() {
  return (
    <PhoneShell>
      <div className="pb-28">
        <AppHeader />

        <div className="space-y-3 p-4">
          <RevenueChart />

          <Card>
            <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
              <Lock className="size-5" />
            </span>
            <h2 className="mt-3 text-base font-semibold leading-snug">
              Расширенная аналитика бизнеса
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              После подключения Сбер Прайм будут доступны:
            </p>
            <ul className="mt-3 space-y-2">
              {unlocks.map((u) => (
                <li key={u} className="flex gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {u}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-4 h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
            >
              Подключить Сбер Прайм
            </button>
          </Card>


          <Card>
            <h2 className="text-sm font-semibold">Что доступно в разделе</h2>
            <ul className="mt-3 space-y-4">
              {features.map(({ Icon, title, text }) => (
                <li key={title} className="flex gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <Icon className="size-4 text-primary" />
                  </span>
                  <div>
                    <p className="text-sm font-medium">{title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <TabBar active="/pro-analytics" />
    </PhoneShell>
  );
}
