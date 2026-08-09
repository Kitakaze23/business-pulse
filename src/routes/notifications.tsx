import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PhoneShell, ScreenHeader, Card } from "@/components/PhoneShell";

export const Route = createFileRoute("/notifications")({
  component: Notifications,
  head: () => ({
    meta: [
      { title: "Уведомления о состоянии бизнеса" },
      {
        name: "description",
        content: "Оповещения об изменениях балла здоровья бизнеса и новых инсайтах.",
      },
      { property: "og:title", content: "Уведомления о состоянии бизнеса" },
      {
        property: "og:description",
        content: "Изменения показателей и новые инсайты в одной ленте.",
      },
    ],
  }),
});

const items = [
  { t: "Балл вырос до 82", d: "Сегодня, 09:41", tone: "text-success" },
  { t: "Показатель «Клиенты» снизился на 6", d: "Вчера, 18:20", tone: "text-danger" },
  { t: "Новая рекомендация: вернуть клиентов из базы", d: "Вчера, 10:05", tone: "text-foreground" },
];

function Notifications() {
  return (
    <PhoneShell>
      <ScreenHeader title="Уведомления" subtitle="За последние 7 дней" />
      <div className="space-y-3 p-4">
        {items.map((i) => (
          <Card key={i.t}>
            <p className={`text-sm font-medium ${i.tone}`}>{i.t}</p>
            <p className="mt-1 text-xs text-muted-foreground">{i.d}</p>
          </Card>
        ))}
      </div>
    </PhoneShell>
  );
}
