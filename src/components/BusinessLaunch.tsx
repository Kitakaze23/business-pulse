import { useMemo, useState, type ReactNode } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Circle,
  MapPin,
  Users,
  Megaphone,
  Sparkles,
  PartyPopper,
  Activity,
  Target,
  X,
} from "lucide-react";
import { ScreenHeader, Card } from "@/components/PhoneShell";
import {
  launchScore,
  launchSteps,
  locations,
  audience,
  channels,
  journey,
  firstSale,
  type LaunchStep,
} from "@/lib/launch-data";

type Screen = "main" | "location" | "audience" | "target" | "sale";

function ScoreRing({ score }: { score: number }) {
  const r = 78;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative mx-auto size-[200px]">
      <svg viewBox="0 0 200 200" className="size-full -rotate-90">
        <circle cx="100" cy="100" r={r} fill="none" strokeWidth="14" className="stroke-secondary" />
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          strokeWidth="14"
          strokeLinecap="round"
          className="stroke-info"
          strokeDasharray={c}
          strokeDashoffset={c - (c * score) / 100}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs text-muted-foreground">Готовность к старту</span>
        <span className="text-5xl font-bold tracking-tight">
          {score}
          <span className="text-lg text-muted-foreground"> / 100</span>
        </span>
      </div>
    </div>
    <p className="mt-3 text-center text-xs text-muted-foreground">
      {score >= 70 ? launchScore.label : launchScore.hint}
    </p>
  </>
  );
}

function MapPreview({ tall = false }: { tall?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-secondary ${tall ? "h-56" : "h-36"}`}
      aria-hidden
    >
      <svg viewBox="0 0 300 150" className="size-full">
        <rect width="300" height="150" className="fill-secondary" />
        {[30, 70, 110].map((y) => (
          <line key={y} x1="0" y1={y} x2="300" y2={y} className="stroke-border" strokeWidth="6" />
        ))}
        {[50, 120, 190, 250].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="150" className="stroke-border" strokeWidth="6" />
        ))}
        <circle cx="85" cy="50" r="34" className="fill-info/20" />
        <circle cx="210" cy="95" r="28" className="fill-success/20" />
        <circle cx="255" cy="35" r="20" className="fill-warning/20" />
        <circle cx="85" cy="50" r="6" className="fill-info" />
        <circle cx="210" cy="95" r="6" className="fill-success" />
        <circle cx="255" cy="35" r="6" className="fill-warning" />
      </svg>
      <div className="absolute bottom-2 left-2 flex gap-2 text-[10px]">
        <span className="rounded-full bg-card px-2 py-1 text-info">Высокий спрос</span>
        <span className="rounded-full bg-card px-2 py-1 text-success">Мало конкурентов</span>
      </div>
    </div>
  );
}

function CTA({
  children,
  onClick,
  variant = "primary",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mt-4 w-full rounded-xl px-4 py-3 text-sm font-semibold transition-opacity active:opacity-80 ${
        variant === "primary"
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function StepModal({ step, onClose }: { step: LaunchStep; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-0">
      <div className="w-full max-w-[430px] rounded-t-2xl bg-card p-5 pb-8">
        <div className="flex items-start gap-3">
          <h3 className="flex-1 text-base font-semibold">{step.title}</h3>
          <button type="button" aria-label="Закрыть" onClick={onClose}>
            <X className="size-5 text-muted-foreground" />
          </button>
        </div>
        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">Почему это важно</dt>
            <dd className="mt-1">{step.why}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Что сделать</dt>
            <dd className="mt-1">{step.action}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Следующий результат</dt>
            <dd className="mt-1">{step.result}</dd>
          </div>
        </dl>
        <CTA onClick={onClose}>{step.done ? "Понятно" : "Перейти к шагу"}</CTA>
      </div>
    </div>
  );
}

export function BusinessLaunch({
  headerRight,
  onGoToPulse,
}: {
  headerRight?: ReactNode;
  onGoToPulse: () => void;
}) {
  const [screen, setScreen] = useState<Screen>("main");
  const [openStep, setOpenStep] = useState<LaunchStep | null>(null);
  const [chosenLocation, setChosenLocation] = useState<string | null>(null);
  const [audienceReady, setAudienceReady] = useState(false);
  const [targetLaunched, setTargetLaunched] = useState(false);
  const [saleDone, setSaleDone] = useState(false);

  const steps = useMemo(
    () =>
      launchSteps.map((s) => ({
        ...s,
        done:
          s.done ||
          (s.id === "location" && !!chosenLocation) ||
          (s.id === "audience" && audienceReady) ||
          (s.id === "acquisition" && targetLaunched) ||
          (s.id === "firstsale" && saleDone),
      })),
    [chosenLocation, audienceReady, targetLaunched, saleDone],
  );
  const doneCount = steps.filter((s) => s.done).length;
  const score = Math.min(100, 72 + (doneCount - 4) * 7);
  const pulseProgress = Math.min(100, 60 + (doneCount - 4) * 10 + (saleDone ? 18 : 0));

  const currentStage = saleDone
    ? targetLaunched && doneCount === 8
      ? "Первая продажа"
      : "Первая продажа"
    : targetLaunched
      ? "Привлечение первых клиентов"
      : audienceReady
        ? "Привлечение клиентов"
        : chosenLocation
          ? "Целевая аудитория"
          : "Локация";

  const back = (
    <button type="button" aria-label="Назад" onClick={() => setScreen("main")}>
      <ChevronLeft className="size-5" />
    </button>
  );

  if (screen === "location") {
    return (
      <>
        <ScreenHeader title="Где открыть бизнес?" subtitle="Демонстрационные данные" left={back} />
        <div className="space-y-3 p-4">
          <Card>
            <p className="text-xs text-muted-foreground">Фильтры</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              {[
                "Город: Москва",
                "Район: любой",
                "Тип: кофейня",
                "Аренда: до 150 000 ₽",
                "Площадь: 40–80 м²",
                "Формат: street retail",
              ].map((f) => (
                <span key={f} className="rounded-full bg-secondary px-3 py-1.5">
                  {f}
                </span>
              ))}
            </div>
          </Card>

          <Card>
            <MapPreview tall />
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              {[
                ["Потенциальный спрос", "Высокий"],
                ["Целевая аудитория", "Концентрация 34%"],
                ["Конкуренты", "6 точек рядом"],
                ["Транспорт", "Метро 400 м"],
                ["Плотность населения", "12 300 чел/км²"],
                ["Привлекательность", "8.7 / 10"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-secondary p-3">
                  <p className="text-muted-foreground">{k}</p>
                  <p className="mt-0.5 font-semibold">{v}</p>
                </div>
              ))}
            </div>
          </Card>

          <p className="px-1 pt-1 text-sm font-semibold">Рекомендуемые локации</p>
          {locations.map((l, i) => (
            <Card key={l.id}>
              <div className="flex items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-info/12 text-xs font-bold text-info">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{l.name}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {l.rent} · {l.area}
                  </p>
                </div>
                <span className="text-sm font-bold text-info">{l.score}/100</span>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                {[
                  ["Спрос", l.demand],
                  ["Конкуренция", l.competition],
                  ["Аудитория", l.audience],
                  ["Транспорт", l.transport],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between rounded-lg bg-secondary px-3 py-2">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setOpenStep(steps[4] ?? null)}
                  className="flex-1 rounded-xl bg-secondary px-3 py-2.5 text-xs font-semibold"
                >
                  Посмотреть подробнее
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setChosenLocation(l.name);
                    setScreen("main");
                  }}
                  className="flex-1 rounded-xl bg-primary px-3 py-2.5 text-xs font-semibold text-primary-foreground"
                >
                  {chosenLocation === l.name ? "Выбрано" : "Выбрать локацию"}
                </button>
              </div>
            </Card>
          ))}
        </div>
        {openStep && <StepModal step={openStep} onClose={() => setOpenStep(null)} />}
      </>
    );
  }

  if (screen === "audience") {
    return (
      <>
        <ScreenHeader title="Ваша целевая аудитория" left={back} />
        <div className="space-y-3 p-4">
          <Card>
            <p className="text-xs text-muted-foreground">Основная аудитория</p>
            <ul className="mt-2 space-y-2 text-sm">
              {audience.main.map((m) => (
                <li key={m} className="flex gap-2">
                  <Users className="mt-0.5 size-4 shrink-0 text-info" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <p className="text-sm font-semibold">Где искать клиентов</p>
            <MapPreview />
            <ul className="mt-3 space-y-2">
              {audience.places.map((p) => (
                <li key={p.name}>
                  <div className="flex justify-between text-xs">
                    <span>{p.name}</span>
                    <span className="text-muted-foreground">{p.share}%</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-secondary">
                    <div className="h-1.5 rounded-full bg-info" style={{ width: `${p.share * 2.5}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <p className="text-xs text-muted-foreground">Потенциальный охват</p>
            <p className="mt-1 text-3xl font-bold tracking-tight">{audience.reach} человек</p>
            <CTA
              onClick={() => {
                setAudienceReady(true);
                setScreen("target");
              }}
            >
              Запустить привлечение клиентов
            </CTA>
          </Card>
        </div>
      </>
    );
  }

  if (screen === "target") {
    return (
      <>
        <ScreenHeader title="Привлечение клиентов" left={back} />
        <div className="space-y-3 p-4">
          <Card>
            <p className="text-sm font-semibold">Онлайн</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              {channels.online.map((c) => (
                <span key={c} className="rounded-full bg-info/12 px-3 py-1.5 text-info">
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm font-semibold">Оффлайн</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              {channels.offline.map((c) => (
                <span key={c} className="rounded-full bg-secondary px-3 py-1.5">
                  {c}
                </span>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-warning/12 text-warning">
                <Target className="size-5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">Рекомендация</p>
                <p className="mt-1 text-sm leading-snug">{channels.recommendation}</p>
              </div>
            </div>
            <dl className="mt-3 space-y-2 border-t border-border pt-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Потенциальный охват</dt>
                <dd className="font-semibold">{channels.reach}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Рекомендуемый бюджет</dt>
                <dd className="font-semibold">{channels.budget}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Период</dt>
                <dd className="font-semibold">{channels.period}</dd>
              </div>
            </dl>
            <CTA
              onClick={() => {
                setTargetLaunched(true);
                setScreen("main");
              }}
            >
              {targetLaunched ? "Кампания настроена" : "Настроить таргет"}
            </CTA>
            {targetLaunched && (
              <p className="mt-2 text-center text-xs text-success">
                Кампания запущена — первые показы уже идут
              </p>
            )}
          </Card>
        </div>
      </>
    );
  }

  if (screen === "sale") {
    return (
      <>
        <ScreenHeader title="Первая продажа" left={back} />
        <div className="space-y-3 p-4">
          <Card className="text-center">
            <PartyPopper className="mx-auto size-10 text-success" />
            <h2 className="mt-3 text-xl font-semibold">🎉 Первая продажа!</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Поздравляем. Теперь мы начинаем формировать историю вашего бизнеса.
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-2 text-left text-sm">
              {[
                ["Первая выручка", firstSale.revenue],
                ["Количество продаж", firstSale.count],
                ["Средний чек", firstSale.avg],
                ["Дата", firstSale.date],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-secondary p-3">
                  <dt className="text-xs text-muted-foreground">{k}</dt>
                  <dd className="mt-0.5 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <CTA variant="ghost" onClick={() => setScreen("main")}>
              Вернуться к маршруту
            </CTA>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <ScreenHeader
        title="Business Pulse"
        subtitle="Режим «Новый бизнес»"
        right={headerRight}
      />
      <div className="space-y-3 p-4">
        <Card className="py-6">
          <div className="px-1 text-center">
            <h2 className="text-xl font-semibold tracking-tight">Business Launch</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Запустите бизнес и быстрее приходите к первым продажам
            </p>
          </div>
          <div className="mt-4">
            <ScoreRing score={score} />
          </div>
          <p className="mt-4 border-t border-border pt-4 text-sm leading-snug text-muted-foreground">
            Ваш бизнес находится на старте. Поможем подготовить его к первым продажам, найти
            подходящую локацию и привлечь первых клиентов.
          </p>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Следующие шаги</p>
            <span className="text-xs text-muted-foreground">{doneCount} из 8 выполнено</span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-secondary">
            <div
              className="h-1.5 rounded-full bg-primary transition-all"
              style={{ width: `${(doneCount / 8) * 100}%` }}
            />
          </div>
          <ul className="mt-3 divide-y divide-border">
            {steps.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setOpenStep(s)}
                  className="flex w-full items-center gap-3 py-2.5 text-left"
                >
                  {s.done ? (
                    <Check className="size-4 shrink-0 text-success" />
                  ) : (
                    <Circle className="size-4 shrink-0 text-muted-foreground/50" />
                  )}
                  <span
                    className={`flex-1 text-sm ${s.done ? "text-muted-foreground line-through" : ""}`}
                  >
                    {s.title}
                  </span>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="flex gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-info/12 text-info">
              <MapPin className="size-5" />
            </span>
            <div className="flex-1">
              <h3 className="text-base font-semibold leading-snug">
                Подберите подходящую локацию
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Найдём районы и точки, где ваш бизнес потенциально может получить больше клиентов.
              </p>
            </div>
          </div>
          <div className="mt-3">
            <MapPreview />
          </div>
          {chosenLocation && (
            <p className="mt-2 text-xs text-success">Выбрана локация: {chosenLocation}</p>
          )}
          <CTA onClick={() => setScreen("location")}>
            {chosenLocation ? "Изменить локацию" : "Подобрать локацию"}
          </CTA>
        </Card>

        <Card>
          <div className="flex gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet/12 text-violet">
              <Users className="size-5" />
            </span>
            <div className="flex-1">
              <h3 className="text-base font-semibold leading-snug">
                Определите свою целевую аудиторию
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Поможем понять, кто ваши потенциальные клиенты и где их искать.
              </p>
              <p className="mt-2 text-xs">
                Потенциальный охват: <span className="font-semibold">{audience.reach}</span>
              </p>
            </div>
          </div>
          <CTA onClick={() => setScreen("audience")}>Подобрать аудиторию</CTA>
        </Card>

        <Card>
          <div className="flex gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-warning/12 text-warning">
              <Megaphone className="size-5" />
            </span>
            <div className="flex-1">
              <h3 className="text-base font-semibold leading-snug">Найдите первых клиентов</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Подскажем, где и как привлечь первых клиентов с учётом типа вашего бизнеса и
                выбранной локации.
              </p>
            </div>
          </div>
          <dl className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
            {[
              ["Охват", channels.reach],
              ["Бюджет", channels.budget],
              ["Период", channels.period],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-secondary p-2">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="mt-0.5 font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <CTA onClick={() => setScreen("target")}>
            {targetLaunched ? "Кампания настроена" : "Настроить таргет"}
          </CTA>
        </Card>

        <Card>
          <p className="text-sm font-semibold">Путь до первой продажи</p>
          <p className="mt-1 text-xs text-info">Вы сейчас здесь → {currentStage}</p>
          <ol className="mt-3 space-y-0">
            {journey.map((j, i) => {
              const currentIndex = journey.indexOf(currentStage) >= 0 ? journey.indexOf(currentStage) : 4;
              const state = i < currentIndex ? "done" : i === currentIndex ? "current" : "next";
              return (
                <li key={j} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span
                      className={`size-3 rounded-full ${
                        state === "done"
                          ? "bg-primary"
                          : state === "current"
                            ? "bg-info ring-4 ring-info/20"
                            : "bg-muted-foreground/30"
                      }`}
                    />
                    {i < journey.length - 1 && (
                      <span
                        className={`w-0.5 flex-1 ${state === "done" ? "bg-primary" : "bg-border"}`}
                      />
                    )}
                  </div>
                  <span
                    className={`pb-4 text-sm ${
                      state === "current"
                        ? "font-semibold text-info"
                        : state === "next"
                          ? "text-muted-foreground"
                          : ""
                    }`}
                  >
                    {j}
                  </span>
                </li>
              );
            })}
          </ol>
        </Card>

        <Card>
          <div className="flex gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-success/12 text-success">
              <Sparkles className="size-5" />
            </span>
            <div className="flex-1">
              <h3 className="text-base font-semibold leading-snug">Первая продажа</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {saleDone
                  ? "Первая продажа получена — история бизнеса начала формироваться."
                  : "Первая продажа ещё впереди"}
              </p>
            </div>
          </div>
          <CTA
            onClick={() => {
              setSaleDone(true);
              setScreen("sale");
            }}
          >
            {saleDone ? "Посмотреть первую продажу" : "Отметить первую продажу"}
          </CTA>
        </Card>

        <Card>
          <div className="flex gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
              <Activity className="size-5" />
            </span>
            <div className="flex-1">
              <h3 className="text-base font-semibold leading-snug">Business Pulse формируется</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {pulseProgress >= 100
                  ? "У нас уже достаточно данных, чтобы оценивать состояние бизнеса."
                  : "Копим данные о продажах и клиентах, чтобы начать оценивать состояние бизнеса."}
              </p>
            </div>
          </div>
          <div className="mt-3 h-1.5 rounded-full bg-secondary">
            <div
              className="h-1.5 rounded-full bg-primary transition-all"
              style={{ width: `${pulseProgress}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {pulseProgress >= 100 ? "Business Pulse 82" : `${pulseProgress}% до формирования Business Pulse`}
          </p>
          <CTA variant={pulseProgress >= 100 ? "primary" : "ghost"} onClick={onGoToPulse}>
            Перейти в Business Pulse
          </CTA>
        </Card>
      </div>
      {openStep && <StepModal step={openStep} onClose={() => setOpenStep(null)} />}
    </>
  );
}
