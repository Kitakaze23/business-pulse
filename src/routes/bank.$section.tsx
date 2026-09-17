import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PhoneShell, ScreenHeader, Card } from "@/components/PhoneShell";
import { findBankItem } from "@/lib/bank-data";

export const Route = createFileRoute("/bank/$section")({
  component: BankSection,
  head: () => ({
    meta: [
      { title: "Банковский раздел — Отраслевой банк" },
      {
        name: "description",
        content: "Детали банковского раздела: доступные операции и состояние по счету бизнеса.",
      },
      { property: "og:title", content: "Банковский раздел — Отраслевой банк" },
      {
        property: "og:description",
        content: "Операции, состояние и настройки банковского сервиса.",
      },
    ],
  }),
});

function BankSection() {
  const { section } = Route.useParams();
  const item = findBankItem(section);

  const back = (
    <Link to="/bank" aria-label="Назад">
      <ChevronLeft className="size-5" />
    </Link>
  );

  if (!item) {
    return (
      <PhoneShell>
        <ScreenHeader title="Раздел не найден" left={back} />
        <div className="p-4">
          <Card>
            <p className="text-sm text-muted-foreground">Этот банковский раздел недоступен.</p>
          </Card>
        </div>
      </PhoneShell>
    );
  }

  const { title, subtitle, functions, Icon } = item;

  return (
    <PhoneShell>
      <div className="pb-24">
        <ScreenHeader title={title} subtitle={subtitle} left={back} />
        <div className="space-y-3 p-4">
          <Card>
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              </div>
            </div>
          </Card>

          <Card>
            <p className="text-sm font-semibold">Действия</p>
            <ul className="mt-1">
              {functions.map((f) => (
                <li
                  key={f.title}
                  className="flex items-center gap-3 border-t border-border py-3 text-left"
                >
                  <span className="flex-1">
                    <span className="block text-sm font-medium">{f.title}</span>
                    <span className="block text-xs text-muted-foreground">{f.note}</span>
                  </span>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                </li>
              ))}
            </ul>
          </Card>

          <p className="px-1 text-[11px] text-muted-foreground">
            Демонстрационные данные прототипа.
          </p>
        </div>
      </div>
    </PhoneShell>
  );
}
