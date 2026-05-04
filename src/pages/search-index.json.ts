// src/pages/search-index.json.ts
import { getCollection } from "astro:content";

export async function GET() {
	const nlConditions = await getCollection(
		"conditions_nl",
		({ data }) => data.published,
	);
	const enConditions = await getCollection(
		"conditions_en",
		({ data }) => data.published,
	);

	const index = [
		...nlConditions.map((c) => ({
			title: c.data.title_nl || c.data.title,
			slug: `/aandoeningen/${c.data.slug}/`,
			category: c.data.category_nl || c.data.category,
			summary: c.data.summary_nl || c.data.summary,
		})),
		...enConditions.map((c) => ({
			title: c.data.title,
			slug: `/en/conditions/${c.data.slug}/`,
			category: c.data.category,
			summary: c.data.summary,
		})),
	];

	return new Response(JSON.stringify(index), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}
