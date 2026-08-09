export type Metric = {
  id: string;
  name: string;
  value: number;
  delta: number;
  tone: "good" | "warn" | "bad";
};

export const pulse = {
  score: 82,
  label: "Хорошее состояние",
  weekDelta: 5,
  updated: "Обновлено сегодня, 09:41",
};

export const metrics: Metric[] = [
  { id: "revenue", name: "Доход", value: 91, delta: 8, tone: "good" },
  { id: "clients", name: "Клиенты", value: 68, delta: -6, tone: "bad" },
  { id: "growth", name: "Рост", value: 84, delta: 4, tone: "good" },
  { id: "stability", name: "Стабильность", value: 79, delta: 2, tone: "good" },
  { id: "efficiency", name: "Эффективность", value: 71, delta: 1, tone: "warn" },
];

export const factors = [
  { name: "Снижение повторных покупок", delta: "-14%", positive: false },
  { name: "Рост новых клиентов", delta: "+9%", positive: true },
  { name: "Увеличение среднего чека", delta: "+8%", positive: true },
];

export const insight = {
  title: "Повторные покупки снизились на 14%",
  tag: "Риск",
  summary:
    "Клиенты стали реже возвращаться. Это основная причина снижения показателя «Клиенты».",
  what: [
    "Доля повторных клиентов снизилась с 42% до 36%",
    "Количество повторных покупок уменьшилось на 14%",
    "Средний интервал между покупками увеличился на 5 дней",
  ],
  impact:
    "Снижение повторных покупок влияет на выручку и рост бизнеса.",
};

export const recommendations = [
  {
    id: "return",
    title: "Верните клиентов из базы",
    text: "Запустите рассылку для клиентов, которые не совершали покупки последние 30 дней.",
    priority: "Высокий",
    accent: "blue" as const,
  },
  {
    id: "frequency",
    title: "Увеличьте частоту покупок",
    text: "Предложите персональные акции на основе истории покупок.",
    priority: "Средний",
    accent: "green" as const,
  },
  {
    id: "basket",
    title: "Работайте с чеком",
    text: "Предлагайте сопутствующие товары и наборы.",
    priority: "Средний",
    accent: "violet" as const,
  },
];
