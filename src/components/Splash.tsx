import { useEffect, useState } from "react";
import logo from "@/assets/launch-logo.png";

const SPLASH_KEY = "bp-splash-shown";

export function Splash() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SPLASH_KEY) === "1") return;
    sessionStorage.setItem(SPLASH_KEY, "1");
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-1 bg-background px-8 text-center animate-in fade-in duration-300">
      <img src={logo} alt="Бизнес Пульс" width={180} height={180} className="size-[180px]" />
      <h1 className="mt-4 text-2xl font-bold tracking-tight">Бизнес Пульс</h1>
      <p className="text-sm text-muted-foreground">Управление бизнесом.</p>
      <p className="mt-6 text-sm font-medium text-primary">
        Добрый день, Григорий Александрович
      </p>
    </div>
  );
}
