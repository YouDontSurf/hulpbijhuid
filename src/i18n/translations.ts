import type { Locale } from "./config";

type TranslationKey = keyof typeof translations.nl;

export const translations = {
  nl: {
    siteName: "Hulp Bij Huid",
    siteDescription: "Complete gids over huidaandoeningen, symptomen en behandelingen",
    home: "Home",
    conditions: "Aandoeningen",
    blog: "Blog",
    about: "Over ons",
    doctor: "Wanneer naar de dokter",
    allConditions: "Alle aandoeningen",
    searchPlaceholder: "Zoek naar een huidaandoening...",
    readMore: "Lees meer",
    symptoms: "Symptomen",
    causes: "Oorzaken & Risicofactoren",
    treatments: "Behandelingen",
    whenToSeeDoctor: "Wanneer naar de dokter",
    frequentlyAsked: "Veelgestelde vragen",
    relatedConditions: "Gerelateerde aandoeningen",
    categories: "Categorieën",
    azIndex: "A-Z Index",
    noResults: "Geen resultaten gevonden",
    lastUpdated: "Laatst bijgewerkt",
    readingTime: "min leestijd",
    onThisPage: "Op deze pagina",
    backToConditions: "Terug naar aandoeningen",
    backToBlog: "Terug naar blog",
    sharePage: "Deel deze pagina",
    information: "Informatie",
    disclaimer: "Disclaimer",
    disclaimerText:
      "De informatie op Hulp Bij Huid is uitsluitend voor educatieve doeleinden. Raadpleeg altijd een arts voor medisch advies.",
    allRightsReserved: "Alle rechten voorbehouden.",
  },
  en: {
    siteName: "Hulp Bij Huid",
    siteDescription: "Complete guide to skin conditions, symptoms and treatments",
    home: "Home",
    conditions: "Conditions",
    blog: "Blog",
    about: "About",
    doctor: "When to see a doctor",
    allConditions: "All conditions",
    searchPlaceholder: "Search for a skin condition...",
    readMore: "Read more",
    symptoms: "Symptoms",
    causes: "Causes & Risk Factors",
    treatments: "Treatments",
    whenToSeeDoctor: "When to see a doctor",
    frequentlyAsked: "Frequently asked questions",
    relatedConditions: "Related conditions",
    categories: "Categories",
    azIndex: "A-Z Index",
    noResults: "No results found",
    lastUpdated: "Last updated",
    readingTime: "min read",
    onThisPage: "On this page",
    backToConditions: "Back to conditions",
    backToBlog: "Back to blog",
    sharePage: "Share this page",
    information: "Information",
    disclaimer: "Disclaimer",
    disclaimerText:
      "The information on Hulp Bij Huid is for educational purposes only. Always consult a doctor for medical advice.",
    allRightsReserved: "All rights reserved.",
  },
} as const;

export function t(key: TranslationKey, locale: Locale = "nl"): string {
  return translations[locale][key] ?? translations.nl[key] ?? key;
}
