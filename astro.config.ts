import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://hulpbijhuid.nl",
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "nl",
        locales: {
          nl: "nl-NL",
          en: "en-US",
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: "nl",
    locales: ["nl", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
