import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Check, AlertCircle } from "lucide-react";
import { PhoneShell, ScreenHeader, Card } from "@/components/PhoneShell";
import { ProductIcon } from "@/components/ProductShowcase";
import { byId } from "@/lib/products-data";
import { myServices } from "@/lib/advisor-data";

export const Route = createFileRoute("/my-services")({
  component: MyServices,
  head: () => ({
    meta: [
      { title: "Мои сервисы — что подключено и как используется" },
      {
        name: "description",
        content:
          "Сервисы, которыми вы уже пользуетесь: статус подключения, использование и что можно улучшить.",
      },
      { property: "og:title", content: "Мои сервисы — что подключено" },
      {
        property: "og:description",
        content: "Статус и эффективность подключённых сервисов бизнеса.",
      },
    ],
  }),
});

function MyServices() {
  const router = useRouter();
  const items = myServices
    .map((s) => ({ ...s, product: byId(s.id) }))
    .filter((s) => s.product);

  return (
    <PhoneShell>
      <ScreenHeader
        title="Мои сервисы"
        subtitle="Чем вы уже пользуетесь и насколько это эффективно"
        left={
          <button onClick={() => router.history.back()} aria-label="Назад">
            <ChevronLeft className="size-5" />
          </button>
        }
      />

      <div className="space-y-3 p-4">
        {items.map((s) => (
          <Card key={s.id}>
            <div className="flex gap-3">
              <ProductIcon product={s.product!} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold leading-snug">{s.product!.name}</h2>
                  <span
                    className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      s.connected
                        ? "bg-success/12 text-success"
                        : "bg-warning/12 text-warning"
                    }`}
                  >
                    {s.connected ? <Check className="size-3" /> : <AlertCircle className="size-3" />}
                    {s.connected ? "Работает" : "Почти не используется"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{s.status}</p>
                <p className="mt-2 rounded-xl bg-secondary p-2 text-[11px] leading-snug">
                  {s.usage}
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm font-semibold text-primary">
              {s.action}
              <ChevronRight className="size-4 text-muted-foreground" />
            </div>
          </Card>
        ))}

        <Link to="/solutions" search={{ mode: "pulse" as const }} className="block">
          <Card>
            <p className="text-sm font-semibold">Сервисы для вас</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Что ещё может помочь вашему бизнесу сейчас.
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm font-semibold text-primary">
              Смотреть подборку
              <ChevronRight className="size-4 text-muted-foreground" />
            </div>
          </Card>
        </Link>
      </div>
    </PhoneShell>
  );
}
