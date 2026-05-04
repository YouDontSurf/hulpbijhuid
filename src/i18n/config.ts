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

/**
 * Resolve a known route path (Dutch) to its localized equivalent.
 * Uses routeMap for known paths, falls back to locale prefix for unknown paths.
 *
 * Call with the canonical Dutch path (e.g. "/aandoeningen/") to get the
 * locale-correct version for any locale.
 */
export function getLocalizedHref(path: string, locale: Locale): string {
  if (locale === "nl") return path.endsWith("/") ? path : path + "/";

  const normalPath = path.endsWith("/") ? path : path + "/";

  // Sort routeMap entries by prefix length descending for correct matching
  const routes = Object.values(routeMap).sort(
    (a, b) => b.nl.length - a.nl.length,
  );

  for (const route of routes) {
    if (normalPath === route.nl) {
      return route.en;
    }
    if (normalPath.startsWith(route.nl)) {
      const rest = normalPath.slice(route.nl.length);
      return `${route.en}${rest}`;
    }
  }

  // Fallback: just prefix with /en/
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
