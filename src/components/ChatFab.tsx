import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";

export function ChatFab() {
  return (
    <div className="pointer-events-none fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2">
      <Link
        to="/chat"
        aria-label="Открыть чат Бизнес Пульса"
        className="pointer-events-auto absolute bottom-[78px] right-4 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-transform active:scale-95"
      >
        <MessageCircle className="size-5" />
      </Link>
    </div>
  );
}
