/** Данные слоёв «Мой бизнес», Health-детализация, Advisor-сценарии, задачи и мои сервисы. */

export const businessStage = {
  current: "Развивающийся",
  summary:
    "Выручка и количество клиентов растут. Сейчас основная задача — поддерживать темп роста и повышать эффективность.",
  path: ["Новый", "Молодой", "Развивающийся", "Зрелый"],
  focus: [
    "Увеличивать количество клиентов",
    "Контролировать эффективность",
    "Сохранять стабильность продаж",
    "Искать новые точки роста",
  ],
  facts: [
    { label: "В бизнесе", value: "2 года 4 месяца" },
    { label: "Клиентов за месяц", value: "1 860" },
    { label: "Динамика выручки", value: "+18% за квартал" },
  ],
};

export type MetricDetail = {
  id: string;
  title: string;
  question: string;
  dynamics: { period: string; value: number }[];
  changed: string[];
  influences: { name: string; delta: string; positive: boolean }[];
  cause: string;
  recommendation: string;
  flowId?: string;
};

export const metricDetails: MetricDetail[] = [
  {
    id: "revenue",
    title: "Доход",
    question: "Выручка растёт третий месяц подряд",
    dynamics: [
      { period: "Июнь", value: 78 },
      { period: "Июль", value: 84 },
      { period: "Август", value: 91 },
    ],
    changed: [
      "Выручка выросла на 18% за квартал",
      "Средний чек увеличился на 8%",
      "Доля безналичных оплат — 74%",
    ],
    influences: [
      { name: "Средний чек", delta: "+8%", positive: true },
      { name: "Количество продаж", delta: "+11%", positive: true },
      { name: "Расходы на закупки", delta: "+24%", positive: false },
    ],
    cause: "Рост выручки обеспечен новыми клиентами и увеличением среднего чека.",
    recommendation: "Бизнес готов к расширению — оцените возможности финансирования.",
    flowId: "growth",
  },
  {
    id: "clients",
    title: "Клиенты",
    question: "Повторные покупки снизились",
    dynamics: [
      { period: "Июнь", value: 79 },
      { period: "Июль", value: 74 },
      { period: "Август", value: 68 },
    ],
    changed: [
      "Доля повторных клиентов снизилась с 42% до 36%",
      "Количество повторных покупок уменьшилось на 14%",
      "Средний интервал между покупками вырос на 5 дней",
    ],
    influences: [
      { name: "Повторные покупки", delta: "-14%", positive: false },
      { name: "Новые клиенты", delta: "+9%", positive: true },
      { name: "Отток базы", delta: "-6%", positive: false },
    ],
    cause:
      "Клиенты перестали возвращаться после первой покупки: с базой давно не было коммуникации.",
    recommendation: "Верните клиентов, которые не покупали последние 30 дней.",
    flowId: "clients",
  },
  {
    id: "growth",
    title: "Рост",
    question: "Темп роста сохраняется",
    dynamics: [
      { period: "Июнь", value: 76 },
      { period: "Июль", value: 80 },
      { period: "Август", value: 84 },
    ],
    changed: [
      "Прирост новых клиентов — 9% за месяц",
      "Появился второй канал продаж",
      "Доля новых клиентов в выручке — 31%",
    ],
    influences: [
      { name: "Новые клиенты", delta: "+9%", positive: true },
      { name: "Реклама и продвижение", delta: "+4%", positive: true },
      { name: "Загрузка точки", delta: "-3%", positive: false },
    ],
    cause: "Рост держится за счёт притока новых клиентов, но точка близка к пределу загрузки.",
    recommendation: "Подумайте о новой точке или расширении текущей.",
    flowId: "growth",
  },
  {
    id: "stability",
    title: "Стабильность",
    question: "Продажи предсказуемы",
    dynamics: [
      { period: "Июнь", value: 76 },
      { period: "Июль", value: 77 },
      { period: "Август", value: 79 },
    ],
    changed: [
      "Разброс выручки по неделям сократился",
      "Доля постоянных клиентов — 36%",
      "Кассовых разрывов за квартал не было",
    ],
    influences: [
      { name: "Регулярные продажи", delta: "+2%", positive: true },
      { name: "Зависимость от сезона", delta: "-4%", positive: false },
      { name: "Остаток на счёте", delta: "+6%", positive: true },
    ],
    cause: "Стабильность держится на постоянных клиентах — их доля пока снижается.",
    recommendation: "Удерживайте постоянных клиентов, чтобы не потерять устойчивость выручки.",
    flowId: "clients",
  },
  {
    id: "efficiency",
    title: "Эффективность",
    question: "Расходы растут быстрее выручки",
    dynamics: [
      { period: "Июнь", value: 74 },
      { period: "Июль", value: 72 },
      { period: "Август", value: 71 },
    ],
    changed: [
      "Расходы на закупки выросли на 24%",
      "Доля расходов в выручке — 61%",
      "Часть платежей проходит с личных карт",
    ],
    influences: [
      { name: "Операционные закупки", delta: "+24%", positive: false },
      { name: "Комиссии за приём оплаты", delta: "-2%", positive: true },
      { name: "Контроль расходов", delta: "-5%", positive: false },
    ],
    cause: "Расходы плохо контролируются: траты бизнеса смешаны с личными.",
    recommendation: "Упростите управление расходами бизнеса.",
    flowId: "costs",
  },
];

export const metricDetailById = (id: string) => metricDetails.find((m) => m.id === id);

export type AdvisorFlow = {
  id: string;
  metricId: string;
  signal: string;
  what: string;
  why: string;
  recommend: string;
  action: string;
  serviceId: string;
  cta: string;
  priority: "Высокий" | "Средний";
  tone: "risk" | "growth" | "care";
};

export const advisorFlows: AdvisorFlow[] = [
  {
    id: "clients",
    metricId: "clients",
    signal: "Клиенты ↓",
    what: "Повторные покупки снизились на 14%.",
    why: "Это влияет на количество постоянных клиентов и снижает устойчивость выручки.",
    recommend: "Запустите рассылку для клиентов, которые не совершали покупки последние 30 дней.",
    action: "Запустить рассылку",
    serviceId: "target",
    cta: "Запустить",
    priority: "Высокий",
    tone: "risk",
  },
  {
    id: "growth",
    metricId: "revenue",
    signal: "Рост ↑",
    what: "Выручка растёт третий месяц подряд.",
    why: "Бизнес выходит на предел текущей загрузки — это момент для расширения.",
    recommend: "Оцените, какую сумму бизнес может привлечь без риска для оборота.",
    action: "Оценить финансирование",
    serviceId: "credit",
    cta: "Рассчитать",
    priority: "Средний",
    tone: "growth",
  },
  {
    id: "costs",
    metricId: "efficiency",
    signal: "Расходы ↑",
    what: "Расходы на операционные закупки выросли на 24%.",
    why: "Траты бизнеса смешаны с личными, поэтому эффективность снижается.",
    recommend: "Упростите управление расходами бизнеса и задайте лимиты.",
    action: "Разделить расходы",
    serviceId: "card",
    cta: "Подключить",
    priority: "Средний",
    tone: "care",
  },
];

export const flowById = (id?: string) => advisorFlows.find((f) => f.id === id);

export type BusinessTask = {
  id: string;
  name: string;
  diagnosis: string;
  steps: string[];
  serviceIds: string[];
};

export const businessTasks: BusinessTask[] = [
  {
    id: "sales",
    name: "Увеличить продажи",
    diagnosis:
      "Повторные покупки снизились на 14%, при этом новые клиенты продолжают приходить. Основной резерв — возврат существующей базы.",
    steps: [
      "Вернуть клиентов, которые не покупали 30 дней",
      "Предложить персональные акции по истории покупок",
      "Добавить сопутствующие товары к популярным позициям",
    ],
    serviceIds: ["target", "promo", "acquiring"],
  },
  {
    id: "clients",
    name: "Привлечь клиентов",
    diagnosis:
      "Темп привлечения новых клиентов замедлился: +9% против +17% в прошлом квартале.",
    steps: [
      "Запустить рекламу на аудиторию рядом с точкой",
      "Усилить присутствие в картах и поиске",
      "Собрать отзывы у постоянных клиентов",
    ],
    serviceIds: ["target", "promo", "location"],
  },
  {
    id: "costs",
    name: "Снизить расходы",
    diagnosis: "Расходы на закупки выросли на 24%, доля расходов в выручке — 61%.",
    steps: [
      "Разделить личные и бизнес-расходы",
      "Задать лимиты по категориям трат",
      "Автоматизировать учёт операций",
    ],
    serviceIds: ["card", "accounting", "edo"],
  },
  {
    id: "finance",
    name: "Получить финансирование",
    diagnosis:
      "Выручка растёт третий месяц подряд, кассовых разрывов не было — условия для привлечения средств благоприятные.",
    steps: [
      "Рассчитать доступный кредитный потенциал",
      "Сравнить условия по срокам и платежам",
      "Подать заявку онлайн",
    ],
    serviceIds: ["credit", "prime", "accounting"],
  },
  {
    id: "staff",
    name: "Нанять сотрудников",
    diagnosis: "Загрузка точки близка к пределу, персонала не хватает в пиковые часы.",
    steps: [
      "Рассчитать нагрузку на смену",
      "Подготовить выплаты сотрудникам",
      "Настроить кадровый учёт",
    ],
    serviceIds: ["salary", "accounting", "edo"],
  },
  {
    id: "point",
    name: "Открыть новую точку",
    diagnosis: "Текущая точка близка к пределу загрузки, спрос в соседних районах не покрыт.",
    steps: [
      "Оценить районы по спросу и конкурентам",
      "Рассчитать инвестиции и финансирование",
      "Подготовить приём оплаты на новой точке",
    ],
    serviceIds: ["location", "credit", "acquiring"],
  },
  {
    id: "automation",
    name: "Автоматизировать бизнес",
    diagnosis: "Часть операций ведётся вручную: документы, отчётность и сверки занимают время.",
    steps: [
      "Перевести документы в электронный вид",
      "Автоматизировать бухгалтерию и налоги",
      "Свести операции в один кабинет",
    ],
    serviceIds: ["edo", "accounting", "counterparty"],
  },
  {
    id: "efficiency",
    name: "Повысить эффективность",
    diagnosis: "Эффективность — 71 из 100: расходы растут быстрее выручки.",
    steps: [
      "Контролировать расходы по категориям",
      "Снизить комиссии за приём оплаты",
      "Работать над средним чеком",
    ],
    serviceIds: ["card", "sbp", "promo"],
  },
];

export const taskById = (id: string) => businessTasks.find((t) => t.id === id);

export type MyService = {
  id: string;
  connected: boolean;
  status: string;
  usage: string;
  action: string;
};

/** Сервисы, которыми предприниматель уже пользуется. */
export const myServices: MyService[] = [
  {
    id: "account",
    connected: true,
    status: "Подключён",
    usage: "384 операции за месяц",
    action: "Открыть счёт в приложении",
  },
  {
    id: "acquiring",
    connected: true,
    status: "Подключён",
    usage: "74% оплат проходят по карте",
    action: "Посмотреть комиссии",
  },
  {
    id: "sbp",
    connected: true,
    status: "Подключён",
    usage: "21% оплат — по QR, комиссия ниже",
    action: "Увеличить долю оплат по QR",
  },
  {
    id: "card",
    connected: false,
    status: "Выпущена, но почти не используется",
    usage: "3 операции за месяц из 41 расхода",
    action: "Перевести расходы на карту",
  },
  {
    id: "accounting",
    connected: true,
    status: "Подключена",
    usage: "Отчётность сдана вовремя, ближайший налог — 28 числа",
    action: "Посмотреть календарь налогов",
  },
];
