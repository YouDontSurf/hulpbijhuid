export const defaultLocale = "nl" as const;
export const locales = ["nl", "en"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  nl: "Nederlands",
  en: "English",
};

export const localeFlags: Record<Locale, string> = {
  nl: "🇳🇱",
  en: "🇬🇧",
};

export interface LocalizedRoute {
  nl: string;
  en: string;
}

export const routeMap: Record<string, LocalizedRoute> = {
  home: { nl: "/", en: "/en/" },
  conditions: { nl: "/aandoeningen/", en: "/en/conditions/" },
  blog: { nl: "/blog/", en: "/en/blog/" },
  about: { nl: "/over-ons/", en: "/en/about/" },
  doctor: { nl: "/wanneer-naar-de-dokter/", en: "/en/when-to-see-doctor/" },
};

export function getLocalizedPath(
  path: string,
  targetLocale: Locale,
  currentLocale: Locale,
): string {
  let stripped = path;
  if (currentLocale !== "nl") {
    stripped = path.replace(`/${currentLocale}`, "") || "/";
  }
  if (targetLocale === "nl") return stripped;
  return `/${targetLocale}${stripped === "/" ? "/" : stripped}`;
}

export function getAlternateUrls(
  path: string,
  currentLocale: Locale = "nl",
): { nl: string; en: string } {
  return {
    nl: getLocalizedPath(path, "nl", currentLocale),
    en: getLocalizedPath(path, "en", currentLocale),
  };
}
