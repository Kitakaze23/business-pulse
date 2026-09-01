import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PhoneShell, ScreenHeader } from "@/components/PhoneShell";
import { ProductCatalog } from "@/components/ProductShowcase";

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
      <div className="p-4">
        <ProductCatalog />
      </div>
    </PhoneShell>
  );
}
