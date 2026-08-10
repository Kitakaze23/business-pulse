# Business Pulse

Кликабельный интерактивный прототип мобильного сервиса «Business Pulse» — оценка здоровья бизнеса, инсайты и рекомендации.

Это **полностью статическое frontend-приложение**: backend, база данных, авторизация и API не требуются. Все данные — статические mock-данные в `src/lib/business-data.ts`.

## Быстрый старт

```sh
npm install
npm run dev          # локальная разработка
npm run build        # production-сборка статического сайта
npm run preview      # локальный просмотр собранного сайта (static server)
```

## Production build

- Команда сборки: `npm run build`
- Директория результата: `dist/`
- В `dist/` лежат только статические файлы (HTML/CSS/JS/assets) — Node.js runtime после сборки не нужен.
- Для client-side routing в сборку кладётся `dist/404.html` (копия `index.html`) как fallback.

## Deployment (Timeweb Apps)

Тип приложения: **Frontend (статический сайт)**

| Параметр | Значение |
| --- | --- |
| Install command | `npm install` |
| Build command | `npm run build` |
| Output directory | `dist` |
| SPA fallback | `index.html` |

## Структура

- `src/routes/` — экраны: `/` (главная), `/analytics`, `/insight`, `/advisor`, `/notifications`, `/more`
- `src/components/PhoneShell.tsx` — общая мобильная оболочка и карточки
- `src/lib/business-data.ts` — mock-данные прототипа
- `static/index.html`, `src/main.tsx` — точка входа статической SPA-сборки
- `vite.static.config.ts` — конфигурация статической сборки (output `dist/`)

## Environment variables

Не используются. Секретов в клиентском коде нет.
