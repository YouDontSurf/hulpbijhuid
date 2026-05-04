import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const conditionSchema = z.object({
  title: z.string(),
  title_nl: z.string(),
  slug: z.string(),
  category: z.string(),
  category_nl: z.string(),
  order: z.number().default(100),
  icon: z.string().default("stethoscope"),
  summary: z.string(),
  summary_nl: z.string().optional(),
  seo_title: z.string(),
  seo_description: z.string(),
  keywords: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  published: z.boolean().default(true),
  updated: z.date().optional(),
});

const blogSchema = z.object({
  title: z.string(),
  title_nl: z.string().optional(),
  slug: z.string(),
  category: z.string().default("algemeen"),
  category_nl: z.string().default("algemeen"),
  tags: z.array(z.string()).default([]),
  summary: z.string(),
  summary_nl: z.string().optional(),
  seo_title: z.string(),
  seo_description: z.string(),
  author: z.string().default("Hulp Bij Huid"),
  published: z.boolean().default(true),
  date: z.date(),
  updated: z.date().optional(),
  readingTime: z.number().default(5),
});

const pageSchema = z.object({
  title: z.string(),
  title_nl: z.string().optional(),
  slug: z.string(),
  summary: z.string(),
  summary_nl: z.string().optional(),
  content_nl: z.string().optional(),
  content_en: z.string().optional(),
  published: z.boolean().default(true),
});

export const collections = {
  conditions_nl: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "src/content/conditions/nl" }),
    schema: conditionSchema,
  }),
  conditions_en: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "src/content/conditions/en" }),
    schema: conditionSchema,
  }),
  blog_nl: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "src/content/blog/nl" }),
    schema: blogSchema,
  }),
  blog_en: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "src/content/blog/en" }),
    schema: blogSchema,
  }),
  pages_nl: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "src/content/pages/nl" }),
    schema: pageSchema,
  }),
  pages_en: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "src/content/pages/en" }),
    schema: pageSchema,
  }),
};
