import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2,
  ChevronDown,
  ChevronRight,
  FileText,
  MapPin,
  Send,
  ArrowDownLeft,
} from "lucide-react";
import { PhoneShell, Card } from "@/components/PhoneShell";
import { AppHeader } from "@/components/AppHeader";
import { TabBar } from "@/components/TabBar";
import { ChatFab } from "@/components/ChatFab";
import { PullerFab } from "@/components/PullerFab";
import { bankAccount, bankGroups } from "@/lib/bank-data";

export const Route = createFileRoute("/bank/")({
  component: Bank,
  head: () => ({
    meta: [
      { title: "Банк — счет, платежи и сервисы бизнеса" },
      {
        name: "description",
        content:
          "Остаток по расчетному счету, быстрые платежи и переводы, прием денег, финансирование и налоги в одном экране.",
      },
      { property: "og:title", content: "Банк — счет, платежи и сервисы бизнеса" },
      {
        property: "og:description",
        content: "Деньги, прием оплаты, финансирование и налоги для предпринимателя.",
      },
    ],
  }),
});

function Bank() {
  const [outlet, setOutlet] = useState("main");

  const outlets = [
    { id: "main", label: "Основная точка · ул. Ленина, 12" },
    { id: "mall", label: "ТЦ «Галерея» · 2 этаж" },
    { id: "market", label: "Маркетплейс · онлайн" },
  ];
  const outletLabel = outlets.find((o) => o.id === outlet)?.label ?? outlets[0]!.label;

  return (
    <PhoneShell>
      <div className="pb-28">
        <AppHeader />

        <div className="space-y-3 p-4">
          <div className="rounded-2xl bg-card p-3.5 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Building2 className="size-5" />
              </span>
              <div className="flex-1 leading-tight">
                <p className="text-[11px] text-muted-foreground">Организация</p>
                <p className="text-sm font-semibold">ООО «Ромашка»</p>
              </div>
              <ChevronRight className="size-4 text-muted-foreground" />
            </div>

            <div className="mt-2.5 flex items-center gap-2.5 border-t border-border pt-2.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-foreground">
                <MapPin className="size-5" />
              </span>
              <div className="flex-1 leading-tight">
                <p className="text-[11px] text-muted-foreground">Торговая точка</p>
                <p className="text-sm font-medium">{outletLabel}</p>
              </div>
              <div className="relative">
                <select
                  value={outlet}
                  onChange={(e) => setOutlet(e.target.value)}
                  aria-label="Выбор торговой точки"
                  className="appearance-none rounded-xl bg-secondary py-2 pl-3 pr-8 text-xs font-medium text-foreground outline-none"
                >
                  {outlets.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>

          <Card>
            <p className="text-xs text-muted-foreground">{bankAccount.title}</p>
            <p className="mt-1 text-3xl font-bold tracking-tight">{bankAccount.balance}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {bankAccount.masked} · {bankAccount.hint}
            </p>
            <div className="mt-3 flex gap-2 border-t border-border pt-3">
              <Link
                to="/bank/$section"
                params={{ section: "account" }}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-secondary py-2 text-xs font-medium"
              >
                <FileText className="size-4" /> Выписка
              </Link>
              <Link
                to="/bank/$section"
                params={{ section: "account" }}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-secondary py-2 text-xs font-medium"
              >
                Реквизиты
              </Link>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Link
                to="/bank/$section"
                params={{ section: "payments" }}
                className="flex flex-col items-center gap-1.5 rounded-xl bg-primary/8 py-3 text-[11px] font-medium text-primary"
              >
                <Send className="size-5" /> Платеж
              </Link>
              <Link
                to="/bank/$section"
                params={{ section: "transfers" }}
                className="flex flex-col items-center gap-1.5 rounded-xl bg-primary/8 py-3 text-[11px] font-medium text-primary"
              >
                <ArrowDownLeft className="size-5 rotate-180" /> Перевод
              </Link>
              <Link
                to="/bank/$section"
                params={{ section: "sbp" }}
                className="flex flex-col items-center gap-1.5 rounded-xl bg-primary/8 py-3 text-center text-[11px] font-medium leading-tight text-primary"
              >
                <ArrowDownLeft className="size-5" /> Получить деньги
              </Link>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Под рукой</p>
              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                className="flex items-center gap-1 text-xs font-medium text-primary"
              >
                <Settings2 className="size-4" /> Настроить
              </button>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {quickItems.map(({ id, label, Icon, target }) => (
                <Link
                  key={id}
                  to="/bank/$section"
                  params={{ section: target }}
                  className="flex flex-col items-center gap-1.5 text-center"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-foreground">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-[10px] leading-tight text-muted-foreground">{label}</span>
                </Link>
              ))}
              {quickItems.length < 8 && (
                <button
                  type="button"
                  onClick={() => setSettingsOpen(true)}
                  className="flex flex-col items-center gap-1.5 text-center"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl border border-dashed border-border text-muted-foreground">
                    <Plus className="size-5" />
                  </span>
                  <span className="text-[10px] leading-tight text-muted-foreground">Добавить</span>
                </button>
              )}
            </div>
          </Card>

          {bankGroups.map((group) => (
            <Card key={group.id}>
              <p className="text-sm font-semibold">{group.title}</p>
              <ul className="mt-2">
                {group.items.map(({ id, title, subtitle, Icon }) => (
                  <li key={id}>
                    <Link
                      to="/bank/$section"
                      params={{ section: id }}
                      className="flex items-center gap-3 border-t border-border py-3"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-foreground">
                        <Icon className="size-4" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-medium">{title}</span>
                        <span className="block text-xs text-muted-foreground">{subtitle}</span>
                      </span>
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      {settingsOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-foreground/40">
          <div className="max-h-[80vh] w-full max-w-[430px] overflow-y-auto rounded-t-3xl bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold">Настроить «Под рукой»</p>
              <button type="button" aria-label="Закрыть" onClick={() => setSettingsOpen(false)}>
                <X className="size-5 text-muted-foreground" />
              </button>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Выберите действия и задайте порядок — настройки сохранятся.
            </p>

            <ul className="mt-4 space-y-2">
              {quickActionCatalog.map(({ id, label, Icon }) => {
                const index = quick.indexOf(id);
                const selected = index >= 0;
                return (
                  <li
                    key={id}
                    className="flex items-center gap-3 rounded-2xl border border-border px-3 py-2.5"
                  >
                    <Icon className="size-4 text-muted-foreground" />
                    <span className="flex-1 text-sm">{label}</span>
                    {selected && (
                      <span className="flex gap-1">
                        <button
                          type="button"
                          aria-label="Выше"
                          disabled={index === 0}
                          onClick={() => {
                            const next = [...quick];
                            [next[index - 1], next[index]] = [next[index]!, next[index - 1]!];
                            save(next);
                          }}
                          className="rounded-lg bg-secondary px-2 py-1 text-xs disabled:opacity-40"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          aria-label="Ниже"
                          disabled={index === quick.length - 1}
                          onClick={() => {
                            const next = [...quick];
                            [next[index + 1], next[index]] = [next[index]!, next[index + 1]!];
                            save(next);
                          }}
                          className="rounded-lg bg-secondary px-2 py-1 text-xs disabled:opacity-40"
                        >
                          ↓
                        </button>
                      </span>
                    )}
                    <button
                      type="button"
                      aria-pressed={selected}
                      aria-label={selected ? `Убрать ${label}` : `Добавить ${label}`}
                      onClick={() =>
                        save(selected ? quick.filter((q) => q !== id) : [...quick, id])
                      }
                      className={`flex size-7 items-center justify-center rounded-full ${
                        selected ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {selected ? <Check className="size-4" /> : <Plus className="size-4" />}
                    </button>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={() => setSettingsOpen(false)}
              className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
            >
              Готово
            </button>
          </div>
        </div>
      )}

      <PullerFab />
      <ChatFab />
      <TabBar active="/bank" />
    </PhoneShell>
  );
}
