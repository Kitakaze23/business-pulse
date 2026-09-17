import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Home, Plus, Settings2, X, Zap } from "lucide-react";
import {
  QUICK_ACTIONS_KEY,
  defaultQuickActions,
  quickActionCatalog,
} from "@/lib/bank-data";

function loadQuick(): string[] {
  try {
    const raw = localStorage.getItem(QUICK_ACTIONS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.every((x) => typeof x === "string") && parsed.length)
        return parsed;
    }
  } catch {
    /* ignore */
  }
  return defaultQuickActions;
}

export function PullerFab() {
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [quick, setQuick] = useState<string[]>(defaultQuickActions);

  useEffect(() => {
    setQuick(loadQuick());
  }, []);

  const save = (next: string[]) => {
    setQuick(next);
    localStorage.setItem(QUICK_ACTIONS_KEY, JSON.stringify(next));
  };

  const quickItems = quick
    .map((id) => quickActionCatalog.find((a) => a.id === id))
    .filter((a): a is (typeof quickActionCatalog)[number] => Boolean(a));

  return (
    <>
      <div className="pointer-events-none fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2">
        <button
          type="button"
          aria-label="Быстрые действия"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="pointer-events-auto absolute bottom-[78px] right-4 flex size-12 items-center justify-center rounded-full bg-card text-primary shadow-lg shadow-foreground/10 ring-1 ring-border transition-transform active:scale-95"
        >
          <Zap className="size-5" />
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 flex items-end justify-center bg-foreground/40"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-[430px] rounded-t-3xl bg-card p-5 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold">Быстрые действия</p>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setSettingsOpen(true);
                }}
                className="flex items-center gap-1 text-xs font-medium text-primary"
              >
                <Settings2 className="size-4" /> Настроить
              </button>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="flex flex-col items-center gap-1.5 text-center"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Home className="size-5" />
                </span>
                <span className="text-[10px] leading-tight text-muted-foreground">На главную</span>
              </Link>
              {quickItems.map(({ id, label, Icon, target }) => (
                <Link
                  key={id}
                  to="/bank/$section"
                  params={{ section: target }}
                  onClick={() => setOpen(false)}
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
                  onClick={() => {
                    setOpen(false);
                    setSettingsOpen(true);
                  }}
                  className="flex flex-col items-center gap-1.5 text-center"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl border border-dashed border-border text-muted-foreground">
                    <Plus className="size-5" />
                  </span>
                  <span className="text-[10px] leading-tight text-muted-foreground">Добавить</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {settingsOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-foreground/40">
          <div className="max-h-[80vh] w-full max-w-[430px] overflow-y-auto rounded-t-3xl bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold">Настроить быстрые действия</p>
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
    </>
  );
}
