import { Link } from "@tanstack/react-router";
import { Bell, UserRound } from "lucide-react";
import { ScreenHeader } from "@/components/PhoneShell";
import { pulse } from "@/lib/business-data";

export function AppHeader({ rightExtra }: { rightExtra?: React.ReactNode }) {
  return (
    <ScreenHeader
      title="Отраслевой банк"
      subtitle={pulse.updated}
      right={
        <span className="flex items-center gap-3">
          {rightExtra}
          <Link to="/notifications" aria-label="Уведомления" className="relative">
            <Bell className="size-5 text-foreground" />
            <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-danger" />
          </Link>
          <Link to="/more" aria-label="Профиль">
            <UserRound className="size-5 text-foreground" />
          </Link>
        </span>
      }
    />
  );
}
