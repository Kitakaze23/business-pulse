import { createFileRoute } from "@tanstack/react-router";
import { Banknote, Wallet, Users, Building2, Lock } from "lucide-react";
import { PhoneShell, ScreenHeader, Card } from "@/components/PhoneShell";
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

function ProAnalytics() {
  return (
    <PhoneShell>
      <div className="pb-28">
        <ScreenHeader title="Детальная аналитика" subtitle="Расширенные данные о бизнесе" />

        <div className="space-y-3 p-4">
          <Card className="text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
              <Lock className="size-5" />
            </span>
            <p className="mt-3 text-sm text-muted-foreground">
              Детальная аналитика доступна при подключении Сбер Прайм.
            </p>
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
