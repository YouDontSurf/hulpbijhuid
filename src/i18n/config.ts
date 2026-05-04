export const defaultLocale = "nl" as const;
export const locales = ["nl", "en"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  nl: "Nederlands",
  en: "English",
};

export const localeFlags: Record<Locale, string> = {
  nl: "🇳🇱",
  en: "🇺🇸",
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

// Prefix pairs for path swapping between locales
type PrefixPair = readonly [string, string];

const nlFirst: PrefixPair[] = Object.values(routeMap)
  .map((r) => [r.nl, r.en] as const)
  .sort((a, b) => b[0].length - a[0].length);
const enFirst: PrefixPair[] = Object.values(routeMap)
  .map((r) => [r.en, r.nl] as const)
  .sort((a, b) => b[0].length - a[0].length);

export function getLocalizedPath(
  path: string,
  targetLocale: Locale,
  currentLocale: Locale,
): string {
  // If same locale, return as-is
  if (targetLocale === currentLocale) {
    return path;
  }

  // Normalize: ensure trailing slash
  const normalPath = path.endsWith("/") ? path : path + "/";

  // Determine swap direction
  const pairs = currentLocale === "nl" ? nlFirst : enFirst;

  for (const [fromPrefix, toPrefix] of pairs) {
    if (normalPath === fromPrefix) {
      return toPrefix;
    }
    if (normalPath.startsWith(fromPrefix)) {
      const rest = normalPath.slice(fromPrefix.length);
      return `${toPrefix}${rest}`;
    }
  }

  // Fallback: swap locale prefix in path
  if (currentLocale !== "nl") {
    return normalPath.replace(/^\/en\//, "/");
  }
  return `/en${normalPath}`;
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
