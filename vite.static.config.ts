import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Полностью статическая сборка (SPA, без SSR и без серверного рантайма).
// Результат: dist/ — обычные HTML/CSS/JS файлы для static hosting (Timeweb Apps).
export default defineConfig({
  root: fileURLToPath(new URL("./static", import.meta.url)),
  publicDir: fileURLToPath(new URL("./public", import.meta.url)),
  base: "/",
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: fileURLToPath(new URL("./src/routes", import.meta.url)),
      generatedRouteTree: fileURLToPath(new URL("./src/routeTree.gen.ts", import.meta.url)),
    }),
    react(),
    tailwindcss(),
    tsConfigPaths({ projects: [fileURLToPath(new URL("./tsconfig.json", import.meta.url))] }),
  ],
  build: {
    outDir: fileURLToPath(new URL("./dist", import.meta.url)),
    emptyOutDir: true,
  },
  preview: {
    port: 4173,
  },
});
