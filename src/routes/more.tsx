import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { PhoneShell, ScreenHeader, Card } from "@/components/PhoneShell";

export const Route = createFileRoute("/more")({
  component: More,
  head: () => ({
    meta: [
      { title: "Ещё — настройки Business Pulse" },
      {
        name: "description",
        content: "Профиль компании, источники данных и настройки отчётов Business Pulse.",
      },
      { property: "og:title", content: "Ещё — настройки Business Pulse" },
      {
        property: "og:description",
        content: "Профиль компании, источники данных и настройки отчётов.",
      },
    ],
  }),
});

const links = ["Профиль компании", "Источники данных", "Отчёты", "Настройки уведомлений", "Помощь"];

function More() {
  return (
    <PhoneShell>
      <ScreenHeader
        title="Профиль"
        left={
          <Link to="/" aria-label="Назад">
            <ChevronLeft className="size-5" />
          </Link>
        }
      />
      <div className="p-4">
        <Card className="divide-y divide-border p-0">
          {links.map((l) => (
            <div key={l} className="flex items-center justify-between px-4 py-4 text-sm">
              {l}
              <ChevronRight className="size-4 text-muted-foreground" />
            </div>
          ))}
        </Card>
        <Link
          to="/insight"
          className="mt-3 block rounded-2xl bg-card p-4 text-sm font-medium shadow-card"
        >
          Открыть последний инсайт
        </Link>
      </div>
    </PhoneShell>
  );
}
