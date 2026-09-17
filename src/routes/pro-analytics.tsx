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

type RevenueBar = { label: string; cash: number; acquiring: number; future?: boolean };

const splitRevenue = (values: number[], labels: string[], cashShare: number): RevenueBar[] =>
  values.map((value, i) => ({
    label: labels[i] ?? String(i + 1),
    cash: Math.round(value * cashShare),
    acquiring: value - Math.round(value * cashShare),
    future: value === 0,
  }));

const revenuePeriods = [
  {
    key: "day",
    label: "День",
    hint: "по часам, сегодня",
    bars: splitRevenue(
      [
        1800, 1400, 1100, 900, 800, 1200, 2600, 4800, 7400, 9800, 12400, 15600,
        18200, 16900, 14200, 12800, 15600, 18900, 17400, 13600, 9800, 6400, 3600, 2200,
      ],
      Array.from({ length: 24 }, (_, i) => String(i)),
      0.42
    ),
  },
  {
    key: "week",
    label: "Неделя",
    hint: "по дням, текущая неделя",
    bars: splitRevenue(
      [62000, 71500, 68400, 84200, 96800, 112300, 74600],
      ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      0.38
    ),
  },
  {
    key: "month",
    label: "Месяц",
    hint: "по дням, сентябрь",
    bars: splitRevenue(
      [
        62000, 71500, 68400, 84200, 96800, 112300, 74600,
        64200, 73800, 70100, 86900, 99400, 115800, 76200,
        66800, 75200, 72600, 88300, 101200, 118400, 78900,
        69400, 76900, 74800, 90100, 103800, 121200, 81300,
        72100, 78400,
      ],
      Array.from({ length: 30 }, (_, i) => String(i + 1)),
      0.35
    ),
  },
  {
    key: "quarter",
    label: "Квартал",
    hint: "по месяцам, III квартал",
    bars: splitRevenue([742000, 806400, 862400], ["Июл", "Авг", "Сен"], 0.36),
  },
  {
    key: "year",
    label: "Год",
    hint: "по месяцам, 2026",
    bars: splitRevenue(
      [586000, 612000, 704000, 698000, 746000, 796000, 742000, 806400, 862400, 0, 0, 0],
      ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
      0.37
    ),
  },
] as const;

const money = (v: number) => `${v.toLocaleString("ru-RU")} ₽`;

function RevenueChart() {
  const [period, setPeriod] = useState<(typeof revenuePeriods)[number]["key"]>("week");
  const current = revenuePeriods.find((p) => p.key === period) ?? revenuePeriods[0];
  const totals = current.bars.map((b) => b.cash + b.acquiring);
  const max = Math.max(...totals);
  const cashTotal = current.bars.reduce((s, b) => s + b.cash, 0);
  const acquiringTotal = current.bars.reduce((s, b) => s + b.acquiring, 0);
  const total = cashTotal + acquiringTotal;

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

      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-primary" /> Наличные · {money(cashTotal)}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-info" /> Эквайринг · {money(acquiringTotal)}
        </span>
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

      <div className={`mt-4 flex h-40 items-end ${current.bars.length > 12 ? "gap-0.5" : "gap-2"}`}>
        {current.bars.map((b, i) => {
          const dense = current.bars.length > 12;
          const step = current.bars.length > 20 ? 4 : 2;
          const showLabel = !dense || i % step === 0;
          return (
            <div key={b.label} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
              {!dense && (
                <span className="text-[9px] text-muted-foreground">
                  {Math.round((b.cash + b.acquiring) / 1000)}к
                </span>
              )}
              <div
                className={`flex w-full flex-col-reverse overflow-hidden ${dense ? "rounded-t-sm" : "rounded-t-lg"} ${b.future ? "bg-border" : "bg-secondary"}`}
                style={{ height: `${Math.max(4, ((b.cash + b.acquiring) / max) * 118)}px` }}
              >
                {!b.future && (
                  <>
                    <span
                      className="block w-full bg-primary"
                      style={{ height: `${(b.cash / (b.cash + b.acquiring)) * 100}%` }}
                    />
                    <span
                      className="block w-full bg-info"
                      style={{ height: `${(b.acquiring / (b.cash + b.acquiring)) * 100}%` }}
                    />
                  </>
                )}
              </div>
              <span className="text-[10px] text-muted-foreground">
                {showLabel ? b.label : ""}
              </span>
            </div>
          );
        })}
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
