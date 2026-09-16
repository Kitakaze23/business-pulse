import { createFileRoute, Link } from "@tanstack/react-router";
import { Send, ChevronLeft, X, Phone, Star } from "lucide-react";
import { useState } from "react";
import { PhoneShell, ScreenHeader } from "@/components/PhoneShell";
import managerAvatar from "@/assets/manager-avatar.jpg";

export const Route = createFileRoute("/chat")({
  component: Chat,
  head: () => ({
    meta: [
      { title: "Бизнес-помощник — чат Бизнес Пульс" },
      {
        name: "description",
        content:
          "Спросите бизнес-помощника, почему изменились показатели, что сделать на неделе и какие сервисы помогут.",
      },
      { property: "og:title", content: "Бизнес-помощник — чат Бизнес Пульс" },
      {
        property: "og:description",
        content: "Помощник объясняет показатели бизнеса и предлагает следующий шаг.",
      },
    ],
  }),
});

type Action = { label: string; flow: string };
type Msg = { id: number; role: "user" | "agent"; text: string; action?: Action };

const demoDialog: Msg[] = [
  {
    id: 1,
    role: "agent",
    text: "Добрый день, Григорий Александрович! Я ваш бизнес-помощник. Бизнес Пульс сегодня — 82, это на 5 пунктов выше, чем неделю назад.",
  },
  { id: 2, role: "user", text: "Почему снизился показатель клиентов?" },
  {
    id: 3,
    role: "agent",
    text: "Показатель «Клиенты» — 68 из 100. Основной негативный фактор — повторные покупки, они снизились на 14%. Доля повторных клиентов упала с 42% до 36%.",
  },
  {
    id: 4,
    role: "agent",
    text: "Рекомендую вернуть клиентов, которые давно не покупали. Поможет СберТаргет: аудитория — около 1 240 человек, ожидаемый возврат 6–9%.",
    action: { label: "Запустить рассылку", flow: "clients" },
  },
];

const answers: { match: string[]; text: string; action?: Action }[] = [
  {
    match: ["клиент", "повторн", "снизил"],
    text: "Показатель «Клиенты» — 68. Главная причина — повторные покупки снизились на 14%, а средний интервал между покупками вырос на 5 дней.",
    action: { label: "Вернуть клиентов", flow: "clients" },
  },
  {
    match: ["пульс", "влия", "показател"],
    text: "Ваш Бизнес Пульс — 82. Сильнее всего его сейчас тянут вниз повторные покупки (-14%) и рост расходов на закупки (+24%). Поддерживают — выручка (91) и рост (84).",
    action: { label: "Посмотреть рекомендацию", flow: "clients" },
  },
  {
    match: ["недел", "сделать", "шаг"],
    text: "На неделю: 1) рассылка клиентам без покупок 30 дней, 2) перевести расходы бизнеса на бизнес-карту, 3) оценить кредитный потенциал под расширение.",
    action: { label: "Открыть план действий", flow: "clients" },
  },
  {
    match: ["продаж", "выручк", "серви"],
    text: "Для роста продаж подойдут СберТаргет для возврата базы, акции по истории покупок и приём оплаты по СБП с меньшей комиссией.",
    action: { label: "Подобрать сервисы", flow: "clients" },
  },
  {
    match: ["кредит", "финансир", "деньг"],
    text: "Выручка растёт третий месяц подряд, кассовых разрывов не было — бизнес выглядит готовым к финансированию. Рассчитаем кредитный потенциал?",
    action: { label: "Рассчитать потенциал", flow: "growth" },
  },
  {
    match: ["расход", "затрат", "эффектив"],
    text: "Эффективность — 71. Расходы на закупки выросли на 24%, часть трат идёт с личных карт. Разделите расходы бизнеса и задайте лимиты.",
    action: { label: "Разделить расходы", flow: "costs" },
  },
];

const suggestions = [
  "Почему снизился показатель клиентов?",
  "Что сильнее всего влияет на мой Пульс?",
  "Что мне сделать в ближайшую неделю?",
  "Какие сервисы помогут увеличить продажи?",
  "Готов ли мой бизнес к кредиту?",
];

function reply(question: string): { text: string; action?: Action } {
  const q = question.toLowerCase();
  const found = answers.find((a) => a.match.some((m) => q.includes(m)));
  return (
    found ?? {
      text: "Пока у меня нет данных по этому вопросу в прототипе. Могу рассказать про Бизнес Пульс, клиентов, расходы или готовность к финансированию.",
    }
  );
}

const manager = {
  name: "Полякова Елена Викторовна",
  role: "Ваш менеджер",
  phones: ["+7 495 500-55-50, доб. 1247", "+7 916 204-71-33"],
};

const managerDialog: Msg[] = [
  {
    id: 1,
    role: "agent",
    text: "Григорий Александрович, здравствуйте! Это Елена, ваш клиентский менеджер. Подготовила расчёт по кредитному лимиту, о котором вы спрашивали.",
  },
  { id: 2, role: "user", text: "Добрый день! Какой лимит получается?" },
  {
    id: 3,
    role: "agent",
    text: "Предварительно до 2 500 000 ₽ на 24 месяца. Нужны выписки за последние 3 месяца — их можно выгрузить прямо в разделе «Банк».",
  },
];

const managerSuggestions = [
  "Когда будет готово решение?",
  "Какие документы нужны?",
  "Можно назначить встречу?",
];

function managerReply(question: string): { text: string } {
  const q = question.toLowerCase();
  if (q.includes("документ"))
    return { text: "Нужны выписки за 3 месяца и устав. Всё остальное подтянем из вашего профиля." };
  if (q.includes("встреч") || q.includes("звон"))
    return { text: "Давайте созвонимся завтра в 11:00 — подойдёт? Или подъеду в офис в четверг." };
  if (q.includes("решен") || q.includes("когда"))
    return { text: "Решение будет в течение 2 рабочих дней после загрузки выписок." };
  return {
    text: "Приняла ваш вопрос, уточню и вернусь с ответом в течение рабочего дня.",
  };
}

function Chat() {
  const [tab, setTab] = useState<"ai" | "manager">("ai");
  const [aiMessages, setAiMessages] = useState<Msg[]>(demoDialog);
  const [managerMessages, setManagerMessages] = useState<Msg[]>(managerDialog);
  const [input, setInput] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);

  const isAi = tab === "ai";
  const messages = isAi ? aiMessages : managerMessages;

  const ask = (text: string) => {
    const q = text.trim();
    if (!q) return;
    const answer = isAi ? reply(q) : managerReply(q);
    const setter = isAi ? setAiMessages : setManagerMessages;
    setter((prev) => [
      ...prev,
      { id: prev.length + 1, role: "user", text: q },
      { id: prev.length + 2, role: "agent", ...answer },
    ]);
    setInput("");
  };

  return (
    <PhoneShell>
      <div className="pb-40">
        <ScreenHeader
          title="Бизнес Пульс"
          subtitle={isAi ? "Ваш бизнес-помощник" : manager.role}
          left={
            <Link to="/" aria-label="Назад">
              <ChevronLeft className="size-5" />
            </Link>
          }
          right={
            !isAi ? (
              <button
                type="button"
                onClick={() => setProfileOpen(true)}
                aria-label="Профиль менеджера"
              >
                <img
                  src={managerAvatar}
                  alt={manager.name}
                  loading="lazy"
                  width={816}
                  height={816}
                  className="size-9 rounded-full object-cover"
                />
              </button>
            ) : undefined
          }
        />

        <div className="px-4 pt-3">
          <div className="flex rounded-full bg-secondary p-1">
            {(
              [
                { key: "manager", label: "Ваш менеджер" },
                { key: "ai", label: "ИИ Агент" },
              ] as const
            ).map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`flex-1 rounded-full py-2 text-xs font-medium transition-colors ${
                  tab === t.key
                    ? "bg-card text-foreground shadow-card"
                    : "text-muted-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {!isAi && (
          <button
            type="button"
            onClick={() => setProfileOpen(true)}
            className="mx-4 mt-3 flex w-[calc(100%-2rem)] items-center gap-3 rounded-2xl bg-card p-3 text-left shadow-card"
          >
            <img
              src={managerAvatar}
              alt={manager.name}
              loading="lazy"
              width={816}
              height={816}
              className="size-12 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{manager.name}</p>
              <p className="text-xs text-muted-foreground">
                {manager.role} · нажмите, чтобы посмотреть контакты
              </p>
            </div>
          </button>
        )}

        <div className="space-y-3 p-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {!isAi && m.role === "agent" && (
                <button type="button" onClick={() => setProfileOpen(true)} aria-label="Менеджер">
                  <img
                    src={managerAvatar}
                    alt={manager.name}
                    loading="lazy"
                    width={816}
                    height={816}
                    className="size-8 shrink-0 rounded-full object-cover"
                  />
                </button>
              )}
              <div
                className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-card-foreground shadow-card"
                }`}
              >
                {m.text}
                {m.action && (
                  <Link
                    to="/advisor"
                    search={{ flow: m.action.flow }}
                    className="mt-3 block rounded-xl bg-primary py-2.5 text-center text-xs font-semibold text-primary-foreground"
                  >
                    {m.action.label}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2 border-t border-border bg-card px-4 py-3">
        <div className="mb-2 flex gap-2 overflow-x-auto pb-1">
          {(isAi ? suggestions : managerSuggestions).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => ask(s)}
              className="shrink-0 rounded-full bg-secondary px-3 py-1.5 text-[11px] text-muted-foreground"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && ask(input)}
            placeholder={isAi ? "Спросите о вашем бизнесе" : "Сообщение менеджеру"}
            aria-label="Сообщение"
            className="h-11 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-primary"
          />
          <button
            type="button"
            onClick={() => ask(input)}
            aria-label="Отправить"
            className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground"
          >
            <Send className="size-4" />
          </button>
        </div>
      </div>

      {profileOpen && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-foreground/40 px-4 pb-6">
          <div className="w-full max-w-[400px] rounded-3xl bg-card p-5 shadow-card">
            <div className="mb-4 flex items-start gap-3">
              <img
                src={managerAvatar}
                alt={manager.name}
                loading="lazy"
                width={816}
                height={816}
                className="size-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-base font-semibold">{manager.name}</p>
                <p className="text-xs text-muted-foreground">{manager.role}</p>
              </div>
              <button type="button" onClick={() => setProfileOpen(false)} aria-label="Закрыть">
                <X className="size-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-2">
              {manager.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-3 rounded-xl bg-secondary px-4 py-3 text-sm"
                >
                  <Phone className="size-4 text-primary" />
                  {p}
                </a>
              ))}
            </div>

            <div className="mt-5">
              <p className="text-sm font-medium">Оцените работу менеджера</p>
              <div className="mt-2 flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-label={`Оценка ${n}`}
                    onClick={() => {
                      setRating(n);
                      setRated(true);
                    }}
                  >
                    <Star
                      className={`size-7 ${
                        n <= rating ? "fill-primary text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rated && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Спасибо! Ваша оценка — {rating} из 5.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </PhoneShell>
  );
}
