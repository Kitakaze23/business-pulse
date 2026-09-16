import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronRight, FileText, Plus, Settings2, Send, ArrowDownLeft, X, Check } from "lucide-react";
import { PhoneShell, ScreenHeader, Card } from "@/components/PhoneShell";
import { TabBar } from "@/components/TabBar";
import { ChatFab } from "@/components/ChatFab";
import {
  bankAccount,
  bankGroups,
  defaultQuickActions,
  quickActionCatalog,
} from "@/lib/bank-data";

const QUICK_KEY = "bp-bank-quick-actions";

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
  const [quick, setQuick] = useState<string[]>(defaultQuickActions);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(QUICK_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.every((x) => typeof x === "string")) setQuick(parsed);
    } catch {
      /* ignore */
    }
  }, []);

  const save = (next: string[]) => {
    setQuick(next);
    localStorage.setItem(QUICK_KEY, JSON.stringify(next));
  };

  const quickItems = quick
    .map((id) => quickActionCatalog.find((a) => a.id === id))
    .filter((a): a is (typeof quickActionCatalog)[number] => Boolean(a));

  return (
    <PhoneShell>
      <div className="pb-28">
        <ScreenHeader title="Банк" subtitle="Деньги и операции бизнеса" />

        <div className="space-y-3 p-4">
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
              <p className="text-sm font-semibold">Быстрый доступ</p>
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
              <p className="text-base font-semibold">Настроить быстрый доступ</p>
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

      <ChatFab />
      <TabBar active="/bank" />
    </PhoneShell>
  );
}
