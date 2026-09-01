import { useMemo, useState } from "react";
import {
  Megaphone,
  CreditCard,
  Wallet,
  Banknote,
  Sparkles,
  PiggyBank,
  Globe,
  QrCode,
  ReceiptText,
  TrendingUp,
  FileText,
  ShieldCheck,
  Users,
  Calculator,
  MapPin,
  Smartphone,
  Check,
  ChevronRight,
  X,
} from "lucide-react";
import { Card } from "@/components/PhoneShell";
import {
  products,
  productCategories,
  type Product,
  type ProductCategory,
} from "@/lib/products-data";

const iconMap: Record<string, typeof Megaphone> = {
  megaphone: Megaphone,
  card: CreditCard,
  wallet: Wallet,
  banknote: Banknote,
  sparkles: Sparkles,
  piggy: PiggyBank,
  globe: Globe,
  qr: QrCode,
  receipt: ReceiptText,
  trend: TrendingUp,
  file: FileText,
  shield: ShieldCheck,
  users: Users,
  calc: Calculator,
  map: MapPin,
  terminal: Smartphone,
};

const toneByCategory: Record<ProductCategory, string> = {
  money: "bg-primary/12 text-primary",
  payments: "bg-info/12 text-info",
  sales: "bg-warning/12 text-warning",
  management: "bg-violet/12 text-violet",
  staff: "bg-success/12 text-success",
  accounting: "bg-secondary text-foreground",
  growth: "bg-info/12 text-info",
};

export function ProductIcon({ product }: { product: Product }) {
  const Icon = iconMap[product.icon] ?? Sparkles;
  return (
    <span
      className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${toneByCategory[product.category]}`}
    >
      <Icon className="size-5" />
    </span>
  );
}

export function ProductCard({
  product,
  reason,
  onOpen,
}: {
  product: Product;
  reason?: string;
  onOpen: (p: Product) => void;
}) {
  const connected = product.status === "connected";
  return (
    <button
      type="button"
      onClick={() => onOpen(product)}
      className="w-full rounded-2xl bg-card p-4 text-left shadow-card"
    >
      <div className="flex gap-3">
        <ProductIcon product={product} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold leading-snug">{product.name}</h3>
            {product.status === "new" && (
              <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[10px] font-semibold text-primary">
                Новинка
              </span>
            )}
            {product.status === "recommended" && (
              <span className="rounded-full bg-success/12 px-2 py-0.5 text-[10px] font-semibold text-success">
                Рекомендуем
              </span>
            )}
            {connected && (
              <span className="flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                <Check className="size-3" /> Подключено
              </span>
            )}
            {product.status === "unavailable" && (
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                Недоступно
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">{product.tagline}</p>
          <p className="mt-1 text-xs leading-snug text-muted-foreground">{product.description}</p>
          {(reason ?? product.reason) && product.status === "recommended" && (
            <p className="mt-2 rounded-xl bg-secondary p-2 text-[11px] leading-snug">
              {reason ?? product.reason}
            </p>
          )}
          {product.price && !connected && (
            <p className="mt-2 text-[11px] text-muted-foreground">{product.price}</p>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm font-semibold">
        <span className={connected ? "text-muted-foreground" : "text-primary"}>
          {product.status === "unavailable"
            ? "Недоступно для вашего типа бизнеса"
            : connected
              ? "Управлять"
              : product.cta}
        </span>
        <ChevronRight className="size-4 text-muted-foreground" />
      </div>
    </button>
  );
}

export function ProductModal({
  product,
  reason,
  onClose,
}: {
  product: Product;
  reason?: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40">
      <div className="max-h-[88vh] w-full max-w-[430px] overflow-y-auto rounded-t-2xl bg-card p-5 pb-8">
        <div className="flex items-start gap-3">
          <ProductIcon product={product} />
          <div className="flex-1">
            <h3 className="text-base font-semibold">{product.name}</h3>
            <p className="text-xs text-muted-foreground">{product.tagline}</p>
          </div>
          <button type="button" aria-label="Закрыть" onClick={onClose}>
            <X className="size-5 text-muted-foreground" />
          </button>
        </div>

        <section className="mt-4">
          <p className="text-xs text-muted-foreground">Зачем вам это</p>
          <p className="mt-1 text-sm leading-snug">
            {reason ?? product.reason ?? product.description}
          </p>
        </section>

        <section className="mt-4">
          <p className="text-xs text-muted-foreground">Что получите</p>
          <ul className="mt-1 space-y-1.5">
            {product.benefits.map((b) => (
              <li key={b} className="flex gap-2 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-success" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-4">
          <p className="text-xs text-muted-foreground">Как подключить</p>
          <ol className="mt-1 space-y-1.5">
            {product.steps.map((s, i) => (
              <li key={s} className="flex gap-2 text-sm">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] font-semibold">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-4 rounded-xl bg-secondary p-3">
          <p className="text-xs text-muted-foreground">Условия</p>
          <p className="mt-1 text-sm">{product.price ?? "Индивидуальные условия"}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">{product.terms}</p>
        </section>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground active:opacity-80"
        >
          {product.status === "connected" ? "Управлять" : product.cta}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 w-full rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground active:opacity-80"
        >
          Подробнее
        </button>
      </div>
    </div>
  );
}

export function CategoryFilter({
  value,
  onChange,
}: {
  value: ProductCategory | "all";
  onChange: (v: ProductCategory | "all") => void;
}) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
      {productCategories.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onChange(c.id)}
          className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            value === c.id
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}

/** Полная витрина с фильтрами (экран «Все решения»). */
export function ProductCatalog({ ids }: { ids?: string[] }) {
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [open, setOpen] = useState<Product | null>(null);

  const list = useMemo(() => {
    const base = ids
      ? (ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[])
      : products;
    return category === "all" ? base : base.filter((p) => p.category === category);
  }, [category, ids]);

  return (
    <>
      <CategoryFilter value={category} onChange={setCategory} />
      <div className="mt-3 space-y-3">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} onOpen={setOpen} />
        ))}
        {list.length === 0 && (
          <Card>
            <p className="text-sm text-muted-foreground">В этой категории пока нет решений.</p>
          </Card>
        )}
      </div>
      {open && <ProductModal product={open} onClose={() => setOpen(null)} />}
    </>
  );
}
