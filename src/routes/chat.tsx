import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useState } from "react";
import { PhoneShell, ScreenHeader } from "@/components/PhoneShell";
import { TabBar } from "@/components/TabBar";

export const Route = createFileRoute("/chat")({
  component: Chat,
  head: () => ({
    meta: [
      { title: "Чат с ИИ-помощником — Бизнес Пульс" },
      {
        name: "description",
        content:
          "Задайте вопрос ИИ-помощнику Бизнес Пульс: выручка, клиенты, рекомендации по росту бизнеса.",
      },
      { property: "og:title", content: "Чат с ИИ-помощником — Бизнес Пульс" },
      {
        property: "og:description",
        content: "ИИ-помощник объясняет показатели бизнеса и подсказывает следующие шаги.",
      },
    ],
  }),
});

type Msg = { id: number; role: "user" | "agent"; text: string };

const demoDialog: Msg[] = [
  {
    id: 1,
    role: "agent",
    text: "Добрый день, Григорий Александрович! Я ИИ-помощник Бизнес Пульс. Балл здоровья бизнеса сегодня — 82, это на 5 пунктов выше, чем неделю назад.",
  },
  { id: 2, role: "user", text: "Почему просел показатель «Клиенты»?" },
  {
    id: 3,
    role: "agent",
    text: "Основная причина — повторные покупки снизились на 14%. Доля повторных клиентов упала с 42% до 36%, а средний интервал между покупками вырос на 5 дней.",
  },
  { id: 4, role: "user", text: "Что можно сделать в ближайшую неделю?" },
  {
    id: 5,
    role: "agent",
    text: "Рекомендую три шага:\n1. Рассылка клиентам без покупок за 30 дней.\n2. Персональные акции по истории покупок.\n3. Предложение сопутствующих товаров для роста среднего чека.",
  },
  { id: 6, role: "user", text: "Сколько клиентов попадёт в рассылку?" },
  {
    id: 7,
    role: "agent",
    text: "Около 1 240 человек. По похожим кампаниям возврат составляет 6–9%, это примерно 75–110 повторных покупок за две недели.",
  },
];

function Chat() {
  const [messages, setMessages] = useState<Msg[]>(demoDialog);
  const [input, setInput] = useState("");

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, role: "user", text },
      {
        id: prev.length + 2,
        role: "agent",
        text: "Спасибо за вопрос! Это демо-режим прототипа: скоро помощник будет отвечать на основе данных вашего бизнеса.",
      },
    ]);
    setInput("");
  };

  return (
    <PhoneShell>
      <div className="pb-28">
        <ScreenHeader title="Чат" subtitle="ИИ-помощник Бизнес Пульс" />

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
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-[62px] left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2 border-t border-border bg-card px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Спросите о вашем бизнесе"
            aria-label="Сообщение"
            className="h-11 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-primary"
          />
          <button
            type="button"
            onClick={send}
            aria-label="Отправить"
            className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground"
          >
            <Send className="size-4" />
          </button>
        </div>
      </div>

      <TabBar active="/chat" />
    </PhoneShell>
  );
}
