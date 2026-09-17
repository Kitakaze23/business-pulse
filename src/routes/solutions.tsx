import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { PhoneShell, ScreenHeader, Card } from "@/components/PhoneShell";
import {
  CategoryFilter,
  ProductCard,
  ProductModal,
} from "@/components/ProductShowcase";
import {
  products,
  launchServiceOrder,
  launchStages,
  pulseScenarios,
  type Product,
  type ProductCategory,
} from "@/lib/products-data";

type Mode = "pulse" | "launch";

export const Route = createFileRoute("/solutions")({
  component: Solutions,
  validateSearch: (search: Record<string, unknown>): { mode: Mode } => ({
    mode: search["mode"] === "launch" ? "launch" : "pulse",
  }),
  head: () => ({
    meta: [
      { title: "Сервисы для вас — Бизнес Пульс" },
      {
        name: "description",
        content:
          "Сервисы и решения для задач вашего бизнеса: счёт, приём оплаты, продвижение, бухгалтерия и управление — подобраны по данным Бизнес Пульс.",
      },
      { property: "og:title", content: "Сервисы для вас — Бизнес Пульс" },
      {
        property: "og:description",
        content: "Персональная подборка сервисов и полный каталог с категориями.",
      },
    ],
  }),
});

function Solutions() {
  const { mode } = Route.useSearch();
  const isLaunch = mode === "launch";
  const [open, setOpen] = useState<Product | null>(null);
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [catalogOpen, setCatalogOpen] = useState(false);

  const personal = useMemo(() => {
    const ids = isLaunch ? launchServiceOrder.slice(0, 3) : pulseScenarios[0]!.recommended;
    return ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];
  }, [isLaunch]);

  const catalog = useMemo(() => {
    const base = isLaunch
      ? [
          ...(launchServiceOrder
            .map((id) => products.find((p) => p.id === id))
            .filter(Boolean) as Product[]),
          ...products.filter((p) => !launchServiceOrder.includes(p.id)),
        ]
      : products;
    return category === "all" ? base : base.filter((p) => p.category === category);
  }, [category, isLaunch]);

  return (
    <PhoneShell>
      <ScreenHeader
        title="Сервисы для вас"
        subtitle="Решения и сервисы для задач вашего бизнеса"
        left={
          <Link to="/" aria-label="Назад">
            <ChevronLeft className="size-5" />
          </Link>
        }
      />
      <div className="space-y-3 p-4">
        <Card>
          <h2 className="text-base font-semibold leading-snug">
            {isLaunch ? "Сервисы для запуска бизнеса" : "Подобрали для вас"}
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {isLaunch
              ? "Всё необходимое, чтобы подготовить бизнес к первым продажам."
              : "Сервисы подобраны по данным Бизнес Пульс и текущим задачам бизнеса."}
          </p>
        </Card>

        {personal.map((p) => (
          <ProductCard key={p.id} product={p} onOpen={setOpen} />
        ))}

        {isLaunch && (
          <Card>
            <p className="text-sm font-semibold">Что за чем подключать</p>
            <div className="mt-3 space-y-3">
              {launchStages.map((stage) => (
                <div key={stage.title} className="rounded-xl bg-secondary p-3">
                  <p className="text-xs font-semibold">{stage.title}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {[
                      ...stage.productIds.map(
                        (id) => products.find((p) => p.id === id)?.name ?? id
                      ),
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
        )}

        <button
          type="button"
          onClick={() => setCatalogOpen((v) => !v)}
          aria-expanded={catalogOpen}
          className="flex w-full items-center justify-between rounded-2xl bg-card px-4 py-3 text-left shadow-card"
        >
          <span className="text-sm font-semibold">Каталог сервисов</span>
          <ChevronDown
            className={`size-4 text-muted-foreground transition-transform ${
              catalogOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {catalogOpen && (
          <div className="space-y-3">
            <CategoryFilter value={category} onChange={setCategory} />
            {catalog.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={setOpen} />
            ))}
            {catalog.length === 0 && (
              <Card>
                <p className="text-sm text-muted-foreground">В этой категории пока нет сервисов.</p>
              </Card>
            )}
          </div>
        )}
      </div>
      {open && <ProductModal product={open} onClose={() => setOpen(null)} />}
    </PhoneShell>
  );
}
