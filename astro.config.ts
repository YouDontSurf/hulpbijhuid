import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Default site URL — override via SITE_URL env var for path-based deployments
const site = process.env.SITE_URL || "https://hulpbijhuid.nl";
// Optional base path (e.g. "/hulpbijhuid") for path-based GitHub Pages
const base = process.env.ASTRO_BASE || undefined;

export default defineConfig({
	site,
	base,
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
		build: {
			assetsInlineLimit: 4096,
		},
	},
	i18n: {
		defaultLocale: "nl",
		locales: ["nl", "en"],
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
