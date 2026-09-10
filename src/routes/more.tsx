import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { PhoneShell, ScreenHeader, Card } from "@/components/PhoneShell";

export const Route = createFileRoute("/more")({
  component: More,
  head: () => ({
    meta: [
      { title: "Ещё — настройки Бизнес Пульс" },
      {
        name: "description",
        content: "Профиль компании, источники данных и настройки отчётов Бизнес Пульс.",
      },
      { property: "og:title", content: "Ещё — настройки Бизнес Пульс" },
      {
        property: "og:description",
        content: "Профиль компании, источники данных и настройки отчётов.",
      },
    ],
  }),
});

const sections = [
  { to: "/my-business", title: "Мой бизнес", text: "Стадия развития и задачи этапа" },
  { to: "/my-services", title: "Мои сервисы", text: "Чем вы уже пользуетесь" },
  { to: "/tasks", title: "Мои задачи", text: "Что хотите сделать с бизнесом" },
] as const;


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
      <div className="space-y-3 p-4">
        <Card className="divide-y divide-border p-0">
          {sections.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="flex items-center justify-between px-4 py-3.5"
            >
              <span>
                <span className="block text-sm font-medium">{s.title}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{s.text}</span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
          <Link
            to="/solutions"
            search={{ mode: "pulse" as const }}
            className="flex items-center justify-between px-4 py-3.5"
          >
            <span>
              <span className="block text-sm font-medium">Сервисы для вас</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                Персональные рекомендации
              </span>
            </span>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
          </Link>
        </Card>


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
          className="block rounded-2xl bg-card p-4 text-sm font-medium shadow-card"
        >
          Открыть последний инсайт
        </Link>
      </div>
    </PhoneShell>
  );
}

