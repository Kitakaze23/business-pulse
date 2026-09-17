import {
  ArrowLeftRight,
  Banknote,
  Building2,
  Calculator,
  CreditCard,
  FileText,
  Landmark,
  Percent,
  QrCode,
  Receipt,
  ScrollText,
  Send,
  Smartphone,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const bankAccount = {
  title: "Расчетный счет",
  balance: "1 284 560 ₽",
  masked: "•••• 1234",
  hint: "Поступления за месяц — 862 400 ₽",
};

export type QuickAction = { id: string; label: string; Icon: LucideIcon; target: string };

export const quickActionCatalog: QuickAction[] = [
  { id: "payment", label: "Создать платеж", Icon: Send, target: "payments" },
  { id: "transfer", label: "Перевод", Icon: ArrowLeftRight, target: "transfers" },
  { id: "qr", label: "QR / СБП", Icon: QrCode, target: "sbp" },
  { id: "statement", label: "Выписка", Icon: FileText, target: "account" },
  { id: "cards", label: "Бизнес-карты", Icon: CreditCard, target: "cards" },
  { id: "taxes", label: "Налоги", Icon: Calculator, target: "taxes" },
  { id: "acquiring", label: "Эквайринг", Icon: Smartphone, target: "acquiring" },
  { id: "credit", label: "Кредиты", Icon: Landmark, target: "credits" },
  { id: "salary", label: "Зарплата", Icon: Users, target: "salary" },
  { id: "cashbox", label: "Онлайн-касса", Icon: Receipt, target: "cashbox" },
];

export const defaultQuickActions = ["payment", "transfer", "qr", "statement"];

export const QUICK_ACTIONS_KEY = "bp-bank-quick-actions";

export type BankItem = {
  id: string;
  title: string;
  subtitle: string;
  Icon: LucideIcon;
  functions: { title: string; note: string }[];
};

export type BankGroup = { id: string; title: string; items: BankItem[] };

export const bankGroups: BankGroup[] = [
  {
    id: "money",
    title: "Деньги",
    items: [
      {
        id: "account",
        title: "Расчетный счет / РКО",
        subtitle: "Остаток 1 284 560 ₽",
        Icon: Wallet,
        functions: [
          { title: "Остаток", note: "1 284 560 ₽ доступно" },
          { title: "Выписка", note: "За сентябрь — 214 операций" },
          { title: "Реквизиты", note: "Счет •••• 1234, ПАО Сбербанк" },
        ],
      },
      {
        id: "payments",
        title: "Платежи",
        subtitle: "2 платежа ждут подписи",
        Icon: Send,
        functions: [
          { title: "Создать платеж", note: "Новое платежное поручение" },
          { title: "Платежи контрагентам", note: "18 контрагентов в справочнике" },
          { title: "Налоги", note: "Ближайший платеж — 28 сентября" },
          { title: "Регулярные платежи", note: "3 активных шаблона" },
          { title: "История", note: "За месяц — 96 платежей" },
        ],
      },
      {
        id: "transfers",
        title: "Переводы",
        subtitle: "Между счетами и контрагентам",
        Icon: ArrowLeftRight,
        functions: [
          { title: "Между своими счетами", note: "2 счета в банке" },
          { title: "Физлицам", note: "Лимит — 300 000 ₽ в день" },
          { title: "Контрагентам", note: "Перевод по реквизитам или ИНН" },
        ],
      },
      {
        id: "cards",
        title: "Бизнес-карты",
        subtitle: "3 карты",
        Icon: CreditCard,
        functions: [
          { title: "Выпустить карту", note: "Выпуск за 1 минуту" },
          { title: "Расходы", note: "За месяц — 184 200 ₽" },
          { title: "Лимиты", note: "Лимит на снятие — 100 000 ₽" },
          { title: "Заблокировать / разблокировать", note: "Мгновенно, без визита" },
          { title: "Карты сотрудников", note: "2 карты у сотрудников" },
        ],
      },
    ],
  },
  {
    id: "income",
    title: "Прием денег",
    items: [
      {
        id: "acquiring",
        title: "Эквайринг",
        subtitle: "Оборот за месяц — 428 300 ₽",
        Icon: Smartphone,
        functions: [
          { title: "Терминалы", note: "2 терминала активны" },
          { title: "Оборот", note: "428 300 ₽ за месяц" },
          { title: "Операции", note: "1 246 операций" },
          { title: "Возвраты", note: "4 возврата на 7 800 ₽" },
          { title: "Комиссии", note: "Средняя ставка — 1,6%" },
        ],
      },
      {
        id: "sbp",
        title: "Оплата по QR / СБП",
        subtitle: "Комиссия от 0,4%",
        Icon: QrCode,
        functions: [
          { title: "Подключение", note: "Подключено, работает" },
          { title: "QR", note: "Статический и динамический код" },
          { title: "Платежная ссылка", note: "Отправьте клиенту в мессенджер" },
          { title: "История", note: "312 оплат за месяц" },
          { title: "Возвраты", note: "Возврат за пару минут" },
        ],
      },
      {
        id: "cashbox",
        title: "Онлайн-касса",
        subtitle: "Касса на связи",
        Icon: Receipt,
        functions: [
          { title: "Чеки", note: "1 558 чеков за месяц" },
          { title: "Возвраты", note: "6 чеков возврата" },
          { title: "Состояние кассы", note: "ФН заканчивается через 94 дня" },
        ],
      },
    ],
  },
  {
    id: "financing",
    title: "Финансирование",
    items: [
      {
        id: "credits",
        title: "Кредиты",
        subtitle: "Действующих кредитов нет",
        Icon: Landmark,
        functions: [
          { title: "Оборотный кредит", note: "Ставка от 17,9%" },
          { title: "Инвестиционный кредит", note: "На развитие до 5 лет" },
        ],
      },
      {
        id: "credit-potential",
        title: "Кредитный потенциал",
        subtitle: "до 2 500 000 ₽",
        Icon: Percent,
        functions: [
          { title: "Ваш лимит", note: "Предварительно до 2 500 000 ₽" },
          { title: "Что влияет", note: "Обороты растут 3 месяца подряд" },
        ],
      },
      {
        id: "overdraft",
        title: "Овердрафт",
        subtitle: "Лимит до 400 000 ₽",
        Icon: Banknote,
        functions: [
          { title: "Подключить", note: "Деньги на счете при нехватке средств" },
          { title: "Условия", note: "Бесплатно, если не пользуетесь" },
        ],
      },
      {
        id: "leasing",
        title: "Лизинг",
        subtitle: "Оборудование и транспорт",
        Icon: Building2,
        functions: [
          { title: "Подобрать предмет лизинга", note: "Аванс от 10%" },
          { title: "Расчет платежа", note: "Срок до 5 лет" },
        ],
      },
    ],
  },
  {
    id: "staff",
    title: "Выплаты сотрудникам",
    items: [
      {
        id: "salary",
        title: "Зарплатный проект",
        subtitle: "Сотрудники пока не добавлены",
        Icon: Users,
        functions: [
          { title: "Выплаты сотрудникам", note: "Реестр зарплаты в пару кликов" },
          { title: "Бизнес-карты сотрудников", note: "Карты с лимитами на расходы" },
        ],
      },
    ],
  },
  {
    id: "taxes-group",
    title: "Налоги и бухгалтерия",
    items: [
      {
        id: "taxes",
        title: "Налоги",
        subtitle: "Ближайший платеж — 28 сентября",
        Icon: Calculator,
        functions: [
          { title: "Расчет", note: "УСН 6% — 38 400 ₽ за квартал" },
          { title: "Платеж", note: "Оплата в один клик" },
          { title: "Календарь", note: "Напомним за 5 дней" },
          { title: "История", note: "Все платежи за год" },
        ],
      },
      {
        id: "accounting",
        title: "Бухгалтерия",
        subtitle: "Отчетность и первичка",
        Icon: ScrollText,
        functions: [
          { title: "Отчетность", note: "Сдача деклараций онлайн" },
          { title: "Документы", note: "Счета, акты, накладные" },
        ],
      },
    ],
  },
];

export const allBankItems: BankItem[] = bankGroups.flatMap((g) => g.items);

export function findBankItem(id: string) {
  return allBankItems.find((i) => i.id === id);
}


export type OperationPurpose = "all" | "payments" | "transfers" | "taxes" | "credits" | "acquiring";
export type OperationPeriod = "today" | "week" | "month" | "quarter";

export const operationPeriods: { id: OperationPeriod; label: string }[] = [
  { id: "today", label: "Сегодня" },
  { id: "week", label: "Неделя" },
  { id: "month", label: "Месяц" },
  { id: "quarter", label: "Квартал" },
];

export const operationPurposes: { id: OperationPurpose; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "payments", label: "Оплаты" },
  { id: "transfers", label: "Переводы" },
  { id: "taxes", label: "Налоги" },
  { id: "credits", label: "Кредиты" },
  { id: "acquiring", label: "Эквайринг" },
];

export type AccountOperation = {
  id: string;
  date: string;
  time: string;
  title: string;
  purpose: Exclude<OperationPurpose, "all">;
  amount: number;
  period: OperationPeriod[];
  status: string;
};

export const accountOperations: AccountOperation[] = [
  {
    id: "op-1",
    date: "17 сен",
    time: "14:20",
    title: "Оплата от покупателя · СБП",
    purpose: "acquiring",
    amount: 4250,
    period: ["today", "week", "month", "quarter"],
    status: "Зачислено",
  },
  {
    id: "op-2",
    date: "17 сен",
    time: "11:05",
    title: "Платеж поставщику · ООО «Альфа»",
    purpose: "payments",
    amount: -38600,
    period: ["today", "week", "month", "quarter"],
    status: "Исполнено",
  },
  {
    id: "op-3",
    date: "16 сен",
    time: "18:42",
    title: "Перевод между счетами",
    purpose: "transfers",
    amount: -75000,
    period: ["week", "month", "quarter"],
    status: "Исполнено",
  },
  {
    id: "op-4",
    date: "15 сен",
    time: "09:10",
    title: "Налог УСН · авансовый платеж",
    purpose: "taxes",
    amount: -38400,
    period: ["week", "month", "quarter"],
    status: "Исполнено",
  },
  {
    id: "op-5",
    date: "12 сен",
    time: "16:35",
    title: "Эквайринг · торговая точка",
    purpose: "acquiring",
    amount: 128700,
    period: ["month", "quarter"],
    status: "Зачислено",
  },
  {
    id: "op-6",
    date: "8 сен",
    time: "12:18",
    title: "Погашение процентов по кредиту",
    purpose: "credits",
    amount: -16400,
    period: ["month", "quarter"],
    status: "Исполнено",
  },
  {
    id: "op-7",
    date: "29 авг",
    time: "10:00",
    title: "Регулярный платеж · аренда",
    purpose: "payments",
    amount: -120000,
    period: ["quarter"],
    status: "Исполнено",
  },
];
