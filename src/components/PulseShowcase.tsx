import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/PhoneShell";
import { ProductCard, ProductModal } from "@/components/ProductShowcase";
import { pulseScenarios, products, type Product } from "@/lib/products-data";

export function PulseShowcase() {
  const [scenarioId, setScenarioId] = useState(pulseScenarios[0]!.id);
  const [open, setOpen] = useState<Product | null>(null);
  const scenario = pulseScenarios.find((s) => s.id === scenarioId)!;
  const recommended = scenario.recommended
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <>
      <Card>
        <h2 className="text-base font-semibold leading-snug">Решения для вашего бизнеса</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Подобрали продукты и сервисы, которые могут помочь бизнесу расти и работать эффективнее.
        </p>

        <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1">
          {pulseScenarios.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setScenarioId(s.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                s.id === scenarioId
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="mt-3 rounded-xl bg-secondary p-3">
          <p className="text-xs text-muted-foreground">
            Бизнес Пульс <span className="font-semibold text-foreground">{scenario.score}</span>
          </p>
          <p className="mt-1 text-xs leading-snug">{scenario.signal}</p>
        </div>

        <Link
          to="/solutions"
          className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm font-semibold text-primary"
        >
          Все решения
          <ChevronRight className="size-4 text-muted-foreground" />
        </Link>
      </Card>

      <p className="px-1 pt-1 text-xs font-semibold text-muted-foreground">Рекомендуем сейчас</p>
      {recommended.map((p) => (
        <ProductCard key={p.id} product={p} onOpen={setOpen} />
      ))}

      {open && <ProductModal product={open} onClose={() => setOpen(null)} />}
    </>
  );
}
