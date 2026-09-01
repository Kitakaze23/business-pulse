import { useState } from "react";
import { Check, Circle, ChevronRight } from "lucide-react";
import { Card } from "@/components/PhoneShell";
import { ProductCard, ProductModal } from "@/components/ProductShowcase";
import { launchKit, launchStages, products, type Product } from "@/lib/products-data";

const launchOrder = [
  "account",
  "acquiring",
  "sbp",
  "kassa",
  "card",
  "accounting",
  "target",
  "location",
];

export function LaunchShowcase({ onPickLocation }: { onPickLocation?: () => void }) {
  const [open, setOpen] = useState<Product | null>(null);
  const list = launchOrder
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];
  const doneCount = launchKit.items.filter((i) => i.done).length;

  return (
    <>
      <Card>
        <h2 className="text-base font-semibold leading-snug">
          Всё необходимое для запуска бизнеса
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Подберите решения, которые помогут подготовить бизнес к первым продажам.
        </p>

        <div className="mt-4 border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">{launchKit.title}</p>
            <span className="text-xs text-muted-foreground">
              {doneCount} из {launchKit.items.length} готово
            </span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{launchKit.subtitle}</p>
          <ul className="mt-3 space-y-1.5">
            {launchKit.items.map((item) => {
              const product = products.find((p) => p.id === item.id);
              return (
                <li key={item.id} className="flex items-center gap-2 text-sm">
                  {item.done ? (
                    <Check className="size-4 shrink-0 text-success" />
                  ) : (
                    <Circle className="size-4 shrink-0 text-muted-foreground/50" />
                  )}
                  <span className={item.done ? "text-muted-foreground" : ""}>
                    {product?.name ?? item.id}
                  </span>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => setOpen(products.find((p) => p.id === "target") ?? null)}
            className="mt-4 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground active:opacity-80"
          >
            Завершить подготовку
          </button>
        </div>
      </Card>

      <Card>
        <p className="text-sm font-semibold">Что за чем подключать</p>
        <div className="mt-3 space-y-3">
          {launchStages.map((stage) => (
            <div key={stage.title} className="rounded-xl bg-secondary p-3">
              <p className="text-xs font-semibold">{stage.title}</p>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                {[
                  ...stage.productIds.map((id) => products.find((p) => p.id === id)?.name ?? id),
                  ...(stage.extra ?? []),
                ].map((name, i, arr) => (
                  <span key={name} className="flex items-center gap-1.5">
                    <span className="rounded-full bg-card px-2 py-1 text-[11px]">{name}</span>
                    {i < arr.length - 1 && (
                      <ChevronRight className="size-3 text-muted-foreground" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {list.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onOpen={(prod) => {
            if (prod.id === "location" && onPickLocation) onPickLocation();
            else setOpen(prod);
          }}
        />
      ))}

      {open && <ProductModal product={open} onClose={() => setOpen(null)} />}
    </>
  );
}
