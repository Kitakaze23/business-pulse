import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Sparkles } from "lucide-react";
import { PhoneShell, ScreenHeader, Card } from "@/components/PhoneShell";
import { ProductCatalog, ProductCard, ProductModal } from "@/components/ProductShowcase";
import { products, type Product } from "@/lib/products-data";

export const Route = createFileRoute("/solutions")({
  component: Solutions,
  head: () => ({
    meta: [
      { title: "Решения для бизнеса — Бизнес Пульс" },
      {
        name: "description",
        content:
          "Продукты и сервисы для бизнеса: счёт, приём оплаты, продвижение, бухгалтерия и управление — подобраны под задачи вашего бизнеса.",
      },
      { property: "og:title", content: "Решения для бизнеса — Бизнес Пульс" },
      {
        property: "og:description",
        content: "Каталог решений под текущие задачи бизнеса с фильтрами по категориям.",
      },
    ],
  }),
});

function Solutions() {
  const [open, setOpen] = useState<Product | null>(null);
  // Последние добавленные в витрину продукты — в конце каталога, показываем свежие первыми.
  const fresh = useMemo(
    () => [...products].filter((p) => p.status === "new").reverse().slice(0, 5),
    []
  );

  return (
    <PhoneShell>
      <ScreenHeader
        title="Все решения"
        subtitle="Подобрано под задачи вашего бизнеса"
        left={
          <Link to="/" aria-label="Назад">
            <ChevronLeft className="size-5" />
          </Link>
        }
      />
      <div className="space-y-3 p-4">
        <Card>
          <div className="flex gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
              <Sparkles className="size-5" />
            </span>
            <div className="flex-1">
              <h2 className="text-base font-semibold leading-snug">Новое в витрине</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Последние добавленные решения для вашего бизнеса.
              </p>
            </div>
          </div>
        </Card>

        {fresh.map((p) => (
          <ProductCard key={p.id} product={p} onOpen={setOpen} />
        ))}

        <p className="px-1 pt-2 text-xs font-semibold text-muted-foreground">Каталог решений</p>
        <ProductCatalog />
      </div>
      {open && <ProductModal product={open} onClose={() => setOpen(null)} />}
    </PhoneShell>
  );
}
