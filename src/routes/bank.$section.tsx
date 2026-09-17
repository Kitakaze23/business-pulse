import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PhoneShell, ScreenHeader, Card } from "@/components/PhoneShell";
import {
  accountOperations,
  findBankItem,
  operationPeriods,
  operationPurposes,
  type OperationPeriod,
  type OperationPurpose,
} from "@/lib/bank-data";

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
  const [period, setPeriod] = useState<OperationPeriod>("month");
  const [purpose, setPurpose] = useState<OperationPurpose>("all");

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

          {item.id === "account" && <AccountHistory period={period} purpose={purpose} setPeriod={setPeriod} setPurpose={setPurpose} />}

          <p className="px-1 text-[11px] text-muted-foreground">
            Демонстрационные данные прототипа.
          </p>
        </div>
      </div>
    </PhoneShell>
  );
}

function AccountHistory({
  period,
  purpose,
  setPeriod,
  setPurpose,
}: {
  period: OperationPeriod;
  purpose: OperationPurpose;
  setPeriod: (period: OperationPeriod) => void;
  setPurpose: (purpose: OperationPurpose) => void;
}) {
  const operations = accountOperations.filter(
    (operation) => operation.period.includes(period) && (purpose === "all" || operation.purpose === purpose)
  );
  const income = operations.reduce((sum, operation) => sum + Math.max(operation.amount, 0), 0);
  const outcome = operations.reduce((sum, operation) => sum + Math.abs(Math.min(operation.amount, 0)), 0);

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">История операций</p>
          <p className="mt-0.5 text-xs text-muted-foreground">Фильтр по периоду и назначению</p>
        </div>
        <div className="text-right text-[11px] text-muted-foreground">
          <p className="font-medium text-success">+{money(income)}</p>
          <p className="mt-0.5">−{money(outcome)}</p>
        </div>
      </div>

      <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
        {operationPeriods.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={period === option.id}
            onClick={() => setPeriod(option.id)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
              period === option.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
        {operationPurposes.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={purpose === option.id}
            onClick={() => setPurpose(option.id)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
              purpose === option.id ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <ul className="mt-3 divide-y divide-border">
        {operations.map((operation) => {
          const isIncome = operation.amount > 0;
          return (
            <li key={operation.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
              <span className="mt-1 size-2 rounded-full bg-primary" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{operation.title}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {operation.date}, {operation.time} · {operation.status}
                </span>
              </span>
              <span className={`shrink-0 text-sm font-semibold ${isIncome ? "text-success" : "text-foreground"}`}>
                {isIncome ? "+" : "−"}{money(Math.abs(operation.amount))}
              </span>
            </li>
          );
        })}
      </ul>

      {operations.length === 0 && (
        <p className="mt-4 rounded-xl bg-secondary p-3 text-sm text-muted-foreground">
          За выбранный период операций с таким назначением нет.
        </p>
      )}
    </Card>
  );
}

function money(value: number) {
  return `${value.toLocaleString("ru-RU")} ₽`;
}
