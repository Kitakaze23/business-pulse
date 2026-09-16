import { createFileRoute, Link } from "@tanstack/react-router";
import { Send, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { PhoneShell, ScreenHeader } from "@/components/PhoneShell";

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

function Chat() {
  const [messages, setMessages] = useState<Msg[]>(demoDialog);
  const [input, setInput] = useState("");

  const ask = (text: string) => {
    const q = text.trim();
    if (!q) return;
    const answer = reply(q);
    setMessages((prev) => [
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
          subtitle="Ваш бизнес-помощник"
          left={
            <Link to="/" aria-label="Назад">
              <ChevronLeft className="size-5" />
            </Link>
          }
        />

        <div className="space-y-3 p-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
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
          {suggestions.map((s) => (
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
            placeholder="Спросите о вашем бизнесе"
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

    </PhoneShell>
  );
}
