import { Link } from "@tanstack/react-router";
import { Check, Circle, ChevronRight } from "lucide-react";
import { Card } from "@/components/PhoneShell";
import { ProductIcon } from "@/components/ProductShowcase";
import { products, launchServiceOrder, launchKit, type Product } from "@/lib/products-data";

const pulsePreview = ["target", "card", "credit"];

function pick(ids: string[]) {
  return ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];
}

/** Компактный виджет «Сервисы для вас» для работающего бизнеса. */
export function ServicesWidget() {
  const list = pick(pulsePreview);

  return (
    <Link to="/solutions" search={{ mode: "pulse" as const }} className="block">
      <Card>
        <h2 className="text-base font-semibold leading-snug">Сервисы для вас</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Подобрали решения с учётом состояния вашего бизнеса.
        </p>

        <ul className="mt-3 space-y-2.5">
          {list.map((p) => (
            <li key={p.id} className="flex items-center gap-3">
              <ProductIcon product={p} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold leading-snug">{p.name}</p>
                <p className="truncate text-xs text-muted-foreground">{p.tagline}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm font-semibold text-primary">
          Все сервисы
          <ChevronRight className="size-4 text-muted-foreground" />
        </div>
      </Card>
    </Link>
  );
}

/** Компактный виджет «Сервисы для вас» для режима «Новый бизнес». */
export function LaunchServicesWidget() {
  const items = launchServiceOrder.map((id) => ({
    product: products.find((p) => p.id === id)!,
    done: launchKit.items.find((i) => i.id === id)?.done ?? false,
  }));
  const done = items.filter((i) => i.done).length;

  return (
    <Link to="/solutions" search={{ mode: "launch" as const }} className="block">
      <Card>
        <h2 className="text-base font-semibold leading-snug">Сервисы для вас</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Для первой продажи вам сейчас нужны:
        </p>

        <ul className="mt-3 space-y-1.5">
          {items.map(({ product, done: isDone }) => (
            <li key={product.id} className="flex items-center gap-2 text-sm">
              {isDone ? (
                <Check className="size-4 shrink-0 text-success" />
              ) : (
                <Circle className="size-4 shrink-0 text-muted-foreground/50" />
              )}
              <span className={isDone ? "text-muted-foreground" : ""}>{product.name}</span>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-xs font-semibold text-muted-foreground">
          {done} из {items.length} сервисов подключено
        </p>

        <div className="mt-3 rounded-xl bg-secondary p-3">
          <p className="text-[11px] font-semibold text-muted-foreground">
            Следующий рекомендуемый шаг
          </p>
          <p className="mt-1 text-sm leading-snug">
            Подключите приём платежей, чтобы быть готовым к первой продаже.
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm font-semibold text-primary">
          Подключить
          <ChevronRight className="size-4 text-muted-foreground" />
        </div>
      </Card>

      </Card>
    </Link>
  );
}
