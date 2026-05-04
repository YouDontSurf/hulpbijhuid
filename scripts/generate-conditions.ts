// scripts/generate-conditions.ts
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.resolve(
	__dirname,
	"..",
	"src",
	"content",
	"conditions",
);

interface FAQ {
	q: string;
	a: string;
}
interface Condition {
	slug: string;
	title_en: string;
	title_nl: string;
	category_en: string;
	category_nl: string;
	icon: string;
	order: number;
	summary_en: string;
	summary_nl: string;
	keywords: string[];
	related: string[];
	faqs: FAQ[];
	content_en: string;
	content_nl: string;
}

const conditions: Condition[] = [
	// ======================== INFLAMMATORY & AUTO-IMMUNE ========================
	{
		slug: "eczema",
		title_en: "Eczema (Atopic Dermatitis)",
		title_nl: "Eczeem (Atopische Dermatitis)",
		category_en: "Inflammatory & Auto-immune",
		category_nl: "Ontstekingsziekten & Auto-immuun",
		icon: "🔥",
		order: 1,
		summary_en:
			"A chronic inflammatory skin condition causing dry, itchy, and inflamed patches of skin.",
		summary_nl:
			"Een chronische ontstekingsaandoening van de huid die droge, jeukende en ontstoken huidplekken veroorzaakt.",
		keywords: [
			"eczema",
			"atopic dermatitis",
			"itchy skin",
			"skin inflammation",
			"dry skin",
		],
		related: ["psoriasis", "contact-dermatitis", "seborrheic-dermatitis"],
		faqs: [
			{
				q: "Is eczema contagious?",
				a: "No, eczema is not contagious. It is an inflammatory condition related to genetics and environmental factors.",
			},
			{
				q: "What triggers eczema flare-ups?",
				a: "Common triggers include stress, allergens, irritants like soaps, temperature changes, and certain fabrics such as wool.",
			},
			{
				q: "Can eczema be cured?",
				a: "There is currently no cure for eczema, but symptoms can be effectively managed with proper skincare, medications, and trigger avoidance.",
			},
		],
		content_en: `## What is Eczema?

Eczema, also known as atopic dermatitis, is a chronic inflammatory skin condition that affects millions worldwide. It appears as red, dry, and intensely itchy patches. While most common in childhood, it can develop at any age. A compromised skin barrier makes the skin susceptible to irritants and allergens.

## Symptoms

- Dry, sensitive skin that may appear red or brownish-gray
- Intense itching, especially at night
- Small raised bumps that may leak fluid when scratched
- Thickened, cracked, or scaly skin
- Commonly affected areas: face, neck, inside elbows, behind knees, hands, feet

## Causes & Risk Factors

- Genetic factors: family history of eczema, allergies, or asthma
- Immune system dysfunction: overactive immune response to triggers
- Environmental triggers: pollen, dust mites, pet dander, mold
- Irritants: harsh soaps, detergents, fragrances, cigarette smoke
- Climate: dry air, extreme temperatures, low humidity
- Stress: emotional stress can trigger or worsen flare-ups

## Treatment Options

### Self-Care
- Moisturize regularly with fragrance-free emollients
- Take lukewarm baths with colloidal oatmeal
- Use gentle, non-irritating skincare products
- Wear soft, breathable fabrics like cotton
- Identify and avoid personal triggers

### Medical Treatments
- Topical corticosteroids to reduce inflammation
- Topical calcineurin inhibitors (tacrolimus, pimecrolimus)
- Oral antihistamines for itch relief
- Phototherapy for moderate to severe cases
- Systemic medications (dupilumab, JAK inhibitors) for severe cases

## When to See a Doctor

Consult a healthcare provider if eczema is severe, interferes with daily life or sleep, shows signs of infection (pus, yellow crusting, increased redness), or does not respond to over-the-counter treatments.`,
		content_nl: `## Wat is eczeem?

Eczeem, ook bekend als atopische dermatitis, is een chronische ontstekingsaandoening die miljoenen mensen treft. Het verschijnt als rode, droge en intens jeukende huidplekken. Hoewel het vaak in de kindertijd begint, kan eczeem op elke leeftijd ontstaan. Een verzwakte huidbarrière maakt de huid gevoelig voor irriterende stoffen en allergenen.

## Symptomen

- Droge, gevoelige huid die rood of bruingrijs kan lijken
- Intense jeuk, vooral 's nachts
- Kleine verheven bultjes die kunnen lekken bij krabben
- Verdikte, gebarsten of schilferige huid
- Vaak getroffen gebieden: gezicht, nek, elleboogplooien, knieholtes, handen, voeten

## Oorzaken & Risicofactoren

- Genetische factoren: familiegeschiedenis van eczeem, allergieën of astma
- Immuunsysteem disfunctie: overactieve immuunrespons op triggers
- Omgevingstriggers: pollen, huisstofmijt, huidschilfers van huisdieren, schimmels
- Irriterende stoffen: agressieve zeep, schoonmaakmiddelen, parfums, sigarettenrook
- Klimaat: droge lucht, extreme temperaturen, lage luchtvochtigheid
- Stress: kan opflakkeringen uitlokken of verergeren

## Behandelingen

### Zelfzorg
- Regelmatig hydrateren met parfumvrije verzachtende crèmes
- Lauwwarme baden met colloïdale havermout
- Gebruik milde, niet-irriterende huidverzorgingsproducten
- Draag zachte, ademende stoffen zoals katoen
- Identificeer en vermijd persoonlijke triggers

### Medische Behandelingen
- Lokale corticosteroïden om ontsteking te verminderen
- Lokale calcineurineremmers (tacrolimus, pimecrolimus)
- Orale antihistaminica voor jeukverlichting
- Lichttherapie bij matige tot ernstige gevallen
- Systemische medicatie (dupilumab, JAK-remmers) bij ernstige gevallen

## Wanneer naar de dokter

Raadpleeg een arts als eczeem ernstig is, het dagelijks leven of de slaap verstoort, tekenen van infectie vertoont, of niet reageert op vrij verkrijgbare behandelingen.`,
	},
	{
		slug: "psoriasis",
		title_en: "Psoriasis",
		title_nl: "Psoriasis",
		category_en: "Inflammatory & Auto-immune",
		category_nl: "Ontstekingsziekten & Auto-immuun",
		icon: "🔥",
		order: 2,
		summary_en:
			"An autoimmune condition causing rapid skin cell buildup, resulting in thick, silvery scales and red patches.",
		summary_nl:
			"Een auto-immuunziekte die snelle ophoping van huidcellen veroorzaakt, resulterend in dikke, zilverachtige schilfers en rode plekken.",
		keywords: [
			"psoriasis",
			"autoimmune skin",
			"scaly patches",
			"skin plaques",
			"psoriatic arthritis",
		],
		related: ["eczema", "seborrheic-dermatitis", "lichen-planus"],
		faqs: [
			{
				q: "Is psoriasis contagious?",
				a: "No, it is an autoimmune condition and cannot be spread through contact.",
			},
			{
				q: "What triggers psoriasis?",
				a: "Common triggers include stress, infections, skin injury, certain medications, and cold weather.",
			},
			{
				q: "Can psoriasis lead to other health problems?",
				a: "Yes, it is associated with an increased risk of psoriatic arthritis, cardiovascular disease, and metabolic syndrome.",
			},
		],
		content_en: `## What is Psoriasis?

Psoriasis is a chronic autoimmune condition that accelerates the life cycle of skin cells, causing them to build up rapidly on the surface. The extra cells form scales and red patches that are sometimes painful. It affects 2-3% of the global population, most commonly appearing between ages 15-35.

## Symptoms

- Red patches covered with thick, silvery scales
- Dry, cracked skin that may bleed
- Itching, burning, or soreness
- Thickened, pitted, or ridged nails
- Swollen and stiff joints (psoriatic arthritis)

## Causes & Risk Factors

- T-cells mistakenly attack healthy skin cells
- Family history is a significant risk factor
- Triggers: stress, infections (especially strep throat), skin injuries
- Lifestyle: smoking, obesity, alcohol consumption
- Medications: beta-blockers, lithium, antimalarials

## Treatment Options

### Topical
- Corticosteroid creams and ointments
- Vitamin D analogues (calcipotriene)
- Coal tar preparations
- Salicylic acid for scale removal

### Phototherapy
- UVB phototherapy
- PUVA (psoralen + UVA)
- Excimer laser for localized plaques

### Systemic
- Oral medications (methotrexate, cyclosporine)
- Biologics (adalimumab, etanercept, ustekinumab)
- Small molecule inhibitors (apremilast)

## When to See a Doctor

See a doctor if psoriasis is widespread, painful, interfering with daily activities, or if you develop joint pain.`,
		content_nl: `## Wat is psoriasis?

Psoriasis is een chronische auto-immuunziekte die de levenscyclus van huidcellen versnelt, waardoor ze zich snel ophopen op het huidoppervlak. De extra cellen vormen schilfers en rode plekken die soms pijnlijk zijn. Het treft 2-3% van de wereldbevolking, meestal tussen 15-35 jaar.

## Symptomen

- Rode huidplekken bedekt met dikke, zilverachtige schilfers
- Droge, gebarsten huid die kan bloeden
- Jeuk, branderigheid of pijn
- Verdikte, putjes of geribbelde nagels
- Gezwollen en stijve gewrichten (artritis psoriatica)

## Oorzaken & Risicofactoren

- T-cellen vallen per ongeluk gezonde huidcellen aan
- Familiegeschiedenis is belangrijke risicofactor
- Triggers: stress, infecties, huidletsel
- Levensstijl: roken, obesitas, alcoholgebruik
- Medicatie: bètablokkers, lithium, antimalariamiddelen

## Behandelingen

### Lokaal
- Corticosteroïdencrèmes en -zalven
- Vitamine D-analogen (calcipotriol)
- Teerpreparaten
- Salicylzuur voor schilferverwijdering

### Lichttherapie
- UVB-fototherapie
- PUVA (psoraleen + UVA)
- Excimerlaser voor gelokaliseerde plaques

### Systemisch
- Orale medicijnen (methotrexaat, cyclosporine)
- Biologicals (adalimumab, etanercept, ustekinumab)
- Kleine-molecuulremmers (apremilast)

## Wanneer naar de dokter

Ga naar de dokter als psoriasis wijdverspreid of pijnlijk is, dagelijkse activiteiten verstoort, of als je gewrichtspijn ontwikkelt.`,
	},
	{
		slug: "rosacea",
		title_en: "Rosacea",
		title_nl: "Rosacea",
		category_en: "Inflammatory & Auto-immune",
		category_nl: "Ontstekingsziekten & Auto-immuun",
		icon: "🔥",
		order: 3,
		summary_en:
			"A chronic skin condition causing facial redness, visible blood vessels, and sometimes acne-like bumps.",
		summary_nl:
			"Een chronische huidaandoening die roodheid in het gezicht, zichtbare bloedvaten en soms acne-achtige bultjes veroorzaakt.",
		keywords: [
			"rosacea",
			"facial redness",
			"flushing",
			"visible blood vessels",
			"acne rosacea",
		],
		related: ["acne-vulgaris", "eczema", "seborrheic-dermatitis"],
		faqs: [
			{
				q: "Does rosacea get worse with age?",
				a: "Yes, rosacea tends to worsen over time if left untreated.",
			},
			{
				q: "What foods trigger rosacea?",
				a: "Spicy foods, hot beverages, alcohol (especially red wine), and histamine-rich foods.",
			},
			{
				q: "Is rosacea curable?",
				a: "There is no cure, but treatments can effectively control and reduce symptoms.",
			},
		],
		content_en: `## What is Rosacea?

Rosacea is a chronic inflammatory skin condition primarily affecting the face, causing redness, visible blood vessels, and sometimes small pus-filled bumps. It most commonly affects middle-aged women with fair skin.

## Symptoms

- Persistent facial redness on cheeks, nose, chin, forehead
- Visible broken blood vessels (telangiectasia)
- Swollen red bumps resembling acne
- Burning or stinging sensation
- Thickened skin on the nose (rhinophyma)
- Eye problems: dry, irritated, swollen eyes

## Causes & Risk Factors

- Genetics: family history increases risk
- Overactive immune response to triggers
- Demodex mites: increased numbers on facial skin
- Triggers: sun exposure, hot drinks, spicy food, alcohol, stress

## Treatment Options

- Gentle cleansers and moisturizers
- Broad-spectrum sunscreen daily (SPF 30+)
- Topical: metronidazole, azelaic acid, ivermectin, brimonidine
- Oral antibiotics: doxycycline, minocycline
- Laser therapy for visible blood vessels

## When to See a Doctor

Consult a dermatologist for persistent facial redness, visible blood vessels, or eye irritation.`,
		content_nl: `## Wat is rosacea?

Rosacea is een chronische ontstekingsaandoening die voornamelijk het gezicht treft, met roodheid, zichtbare bloedvaten en soms kleine met pus gevulde bultjes. Het treft meestal vrouwen van middelbare leeftijd met een lichte huid.

## Symptomen

- Aanhoudende roodheid op wangen, neus, kin, voorhoofd
- Zichtbare gebroken bloedvaatjes
- Gezwollen rode bultjes die op acne lijken
- Branderig of stekend gevoel
- Verdikte huid op neus (rhinophyma)
- Oogproblemen: droge, geïrriteerde, gezwollen ogen

## Oorzaken & Risicofactoren

- Genetica: familiegeschiedenis verhoogt risico
- Overactieve immuunrespons op triggers
- Demodex-mijten: verhoogde aantallen op gezichtshuid
- Triggers: blootstelling aan zon, warme dranken, gekruid eten, alcohol, stress

## Behandelingen

- Milde reinigers en vochtinbrengers
- Dagelijks breedspectrum zonnebrand (SPF 30+)
- Lokaal: metronidazol, azelaïnezuur, ivermectine, brimonidine
- Orale antibiotica: doxycycline, minocycline
- Lasertherapie voor zichtbare bloedvaatjes

## Wanneer naar de dokter

Raadpleeg een dermatoloog bij aanhoudende roodheid, zichtbare bloedvaatjes of oogirritatie.`,
	},
	{
		slug: "seborrheic-dermatitis",
		title_en: "Seborrheic Dermatitis",
		title_nl: "Seborroïsche Dermatitis",
		category_en: "Inflammatory & Auto-immune",
		category_nl: "Ontstekingsziekten & Auto-immuun",
		icon: "🔥",
		order: 4,
		summary_en:
			"A common skin condition causing scaly patches, red skin, and stubborn dandruff on oily areas.",
		summary_nl:
			"Een veelvoorkomende huidaandoening die schilferige plekken, rode huid en hardnekkige roos veroorzaakt op vette gebieden.",
		keywords: [
			"seborrheic dermatitis",
			"dandruff",
			"scaly scalp",
			"cradle cap",
			"skin flakes",
		],
		related: ["psoriasis", "eczema", "dandruff"],
		faqs: [
			{
				q: "Is seborrheic dermatitis a fungal infection?",
				a: "It involves overgrowth of Malassezia yeast, but is more an inflammatory reaction than a typical infection.",
			},
			{
				q: "Can stress cause seborrheic dermatitis?",
				a: "Yes, stress is a well-known trigger for flare-ups.",
			},
		],
		content_en: `## What is Seborrheic Dermatitis?

Seborrheic dermatitis mainly affects the scalp, causing scaly patches, red skin, and stubborn dandruff. It can also affect oily areas: face, eyebrows, ears, eyelids, and chest.

## Symptoms

- White or yellowish flakes (dandruff) on scalp, hair, eyebrows
- Red, greasy patches covered with scales
- Itching or burning sensation

## Causes & Risk Factors

- Malassezia yeast overgrowth
- Overactive sebaceous glands
- Stress, fatigue, cold dry weather

## Treatment Options

- Anti-dandruff shampoos (ketoconazole, selenium sulfide, zinc pyrithione)
- Topical antifungal creams
- Topical corticosteroids for inflammation

## When to See a Doctor

See a doctor if OTC treatments don't work, or the condition is widespread or causing significant discomfort.`,
		content_nl: `## Wat is seborroïsche dermatitis?

Seborroïsche dermatitis treft voornamelijk de hoofdhuid en veroorzaakt schilferige plekken, rode huid en hardnekkige roos. Het kan ook vette gebieden zoals gezicht, wenkbrauwen, oren en borst treffen.

## Symptomen

- Witte of gelige schilfers (roos) op hoofdhuid, haar, wenkbrauwen
- Rode, vettige plekken bedekt met schilfers
- Jeuk of branderig gevoel

## Oorzaken & Risicofactoren

- Overgroei van Malassezia-gist
- Overactieve talgklieren
- Stress, vermoeidheid, koud droog weer

## Behandelingen

- Anti-roosshampoos (ketoconazol, seleensulfide, zinkpyrithion)
- Lokale antischimmelcrèmes
- Lokale corticosteroïden tegen ontsteking

## Wanneer naar de dokter

Ga naar de dokter als vrij verkrijgbare behandelingen niet werken of de aandoening wijdverspreid is.`,
	},
	{
		slug: "lichen-planus",
		title_en: "Lichen Planus",
		title_nl: "Lichen Planus",
		category_en: "Inflammatory & Auto-immune",
		category_nl: "Ontstekingsziekten & Auto-immuun",
		icon: "🔥",
		order: 5,
		summary_en:
			"An inflammatory condition affecting skin and mucous membranes with purple, flat-topped, itchy bumps.",
		summary_nl:
			"Een ontstekingsaandoening die huid en slijmvliezen aantast met paarse, platte, jeukende bultjes.",
		keywords: [
			"lichen planus",
			"purple bumps",
			"Wickham striae",
			"oral lichen planus",
		],
		related: ["psoriasis", "eczema", "lupus-erythematosus"],
		faqs: [
			{
				q: "Is lichen planus an autoimmune disease?",
				a: "Yes, it is believed to be autoimmune where T-cells attack skin and mucous membranes.",
			},
			{
				q: "Can lichen planus affect the mouth?",
				a: "Yes, oral lichen planus is common and appears as white lacy patches or sores.",
			},
		],
		content_en: `## What is Lichen Planus?

Lichen planus is an inflammatory condition affecting skin, mucous membranes, hair, and nails. On skin, it appears as purplish, flat-topped, very itchy bumps.

## Symptoms

- Purple, flat-topped bumps, often on wrists, ankles, lower back
- Wickham striae: fine white lines on bumps
- Intense itching
- Painful mouth sores (oral lichen planus)

## Causes & Risk Factors

- Autoimmune reaction: T-cells attack skin cells
- Hepatitis C association
- Certain medications, allergens, stress

## Treatment Options

- Topical corticosteroids (mainstay)
- Oral corticosteroids for severe cases
- Oral antihistamines for itching
- Phototherapy

## When to See a Doctor

Consult a doctor for unexplained purple bumps, mouth sores, or nail changes.`,
		content_nl: `## Wat is lichen planus?

Lichen planus is een ontstekingsaandoening die huid, slijmvliezen, haren en nagels aantast. Op de huid verschijnt het als paarsachtige, platte, erg jeukende bultjes.

## Symptomen

- Paarse, platte bultjes, vaak op polsen, enkels, onderrug
- Wickham-striae: fijne witte lijntjes op bultjes
- Intense jeuk
- Pijnlijke mondzweren

## Oorzaken & Risicofactoren

- Auto-immuunreactie: T-cellen vallen huidcellen aan
- Associatie met hepatitis C
- Bepaalde medicijnen, allergenen, stress

## Behandelingen

- Lokale corticosteroïden
- Orale corticosteroïden bij ernstige gevallen
- Orale antihistaminica tegen jeuk
- Lichttherapie

## Wanneer naar de dokter

Raadpleeg een arts bij onverklaarde paarse bultjes, mondzweren of nagelveranderingen.`,
	},
	{
		slug: "lupus-erythematosus",
		title_en: "Cutaneous Lupus Erythematosus",
		title_nl: "Cutane Lupus Erythematodes",
		category_en: "Inflammatory & Auto-immune",
		category_nl: "Ontstekingsziekten & Auto-immuun",
		icon: "🔥",
		order: 6,
		summary_en:
			"An autoimmune disease causing a distinctive butterfly-shaped rash across cheeks and nose.",
		summary_nl:
			"Een auto-immuunziekte die een kenmerkende vlindervormige huiduitslag over wangen en neus veroorzaakt.",
		keywords: [
			"lupus",
			"butterfly rash",
			"malar rash",
			"autoimmune",
			"discoid lupus",
			"SLE",
		],
		related: ["rosacea", "eczema", "dermatomyositis"],
		faqs: [
			{
				q: "Is the butterfly rash always present in lupus?",
				a: "No, the malar rash occurs in about 40-50% of people with lupus and may come and go.",
			},
			{
				q: "Does sunlight trigger lupus skin symptoms?",
				a: "Yes, photosensitivity is very common. Sun exposure can trigger or worsen skin lesions.",
			},
		],
		content_en: `## What is Cutaneous Lupus?

Cutaneous lupus primarily affects the skin. The most recognizable sign is a butterfly-shaped rash across cheeks and nose. Subtypes include acute, subacute, and chronic (discoid) lupus.

## Symptoms

- Butterfly (malar) rash across cheeks and nose
- Discoid lesions: coin-shaped, red, scaly plaques that can scar
- Extreme photosensitivity
- Hair loss, mouth or nasal ulcers

## Causes & Risk Factors

- Autoimmunity: genetic and environmental interactions
- UV light: major trigger
- More common in women
- Infections may contribute

## Treatment Options

- Sun protection (SPF 50+) is essential
- Topical corticosteroids and calcineurin inhibitors
- Antimalarials (hydroxychloroquine)
- Systemic immunosuppressants

## When to See a Doctor

Seek evaluation for a butterfly rash, unexplained fever, joint pain, or signs of organ involvement.`,
		content_nl: `## Wat is cutane lupus?

Cutane lupus treft voornamelijk de huid. Het meest herkenbare teken is een vlindervormige huiduitslag over wangen en neus. Subtypen zijn acuut, subacuut en chronisch (discoïd).

## Symptomen

- Vlindervormige huiduitslag over wangen en neus
- Discoïde laesies: muntvormige, rode, schilferige plaques
- Extreme overgevoeligheid voor zonlicht
- Haaruitval, mond- of neuszweren

## Oorzaken & Risicofactoren

- Auto-immuniteit: genetische en omgevingsinteracties
- UV-licht: belangrijke trigger
- Komt vaker voor bij vrouwen
- Infecties kunnen bijdragen

## Behandelingen

- Zonbescherming (SPF 50+) is essentieel
- Lokale corticosteroïden en calcineurineremmers
- Antimalariamiddelen (hydroxychloroquine)
- Systemische immunosuppressiva

## Wanneer naar de dokter

Raadpleeg een arts bij vlindervormige uitslag, onverklaarde koorts, gewrichtspijn of tekenen van orgaanbetrokkenheid.`,
	},
	{
		slug: "dermatomyositis",
		title_en: "Dermatomyositis",
		title_nl: "Dermatomyositis",
		category_en: "Inflammatory & Auto-immune",
		category_nl: "Ontstekingsziekten & Auto-immuun",
		icon: "🔥",
		order: 7,
		summary_en:
			"A rare inflammatory disease causing muscle weakness and distinctive skin rash with purple/red discoloration.",
		summary_nl:
			"Een zeldzame ontstekingsziekte die spierzwakte en kenmerkende huiduitslag met paars/rode verkleuring veroorzaakt.",
		keywords: [
			"dermatomyositis",
			"Gottron papules",
			"heliotrope rash",
			"muscle weakness",
		],
		related: ["lupus-erythematosus", "eczema", "psoriasis"],
		faqs: [
			{
				q: "Is dermatomyositis related to cancer?",
				a: "Yes, there is an increased risk of malignancy, especially in adults over 40. Cancer screening is recommended.",
			},
			{
				q: "What is a Gottron papule?",
				a: "Flat-topped, reddish-purple bumps that appear over the knuckles — a characteristic sign.",
			},
		],
		content_en: `## What is Dermatomyositis?

Dermatomyositis is a rare inflammatory disease causing muscle weakness and distinctive skin rash. It belongs to idiopathic inflammatory myopathies, affecting adults 40-60 and children 5-15.

## Symptoms

- Heliotrope rash: purple/red discoloration around eyelids
- Gottron papules: scaly red bumps over knuckles
- Progressive muscle weakness (shoulders, hips, neck)
- Difficulty swallowing, fatigue, weight loss

## Causes & Risk Factors

- Autoimmune: antibodies attack muscle and skin
- Genetic susceptibility
- UV exposure, infections as triggers
- Associated with underlying cancers in some adults

## Treatment Options

- Oral corticosteroids (prednisone) as first-line
- Immunosuppressants (methotrexate, azathioprine)
- IV immunoglobulin for refractory cases
- Physical therapy, sun protection

## When to See a Doctor

Urgent evaluation for progressive muscle weakness with rash, difficulty swallowing or breathing.`,
		content_nl: `## Wat is dermatomyositis?

Dermatomyositis is een zeldzame ontstekingsziekte die spierzwakte en kenmerkende huiduitslag veroorzaakt. Het behoort tot idiopathische inflammatoire myopathieën en treft volwassenen 40-60 jaar en kinderen 5-15 jaar.

## Symptomen

- Heliotrope uitslag: paars/rode verkleuring rond oogleden
- Gottron-papels: schilferige rode bultjes over vingergewrichten
- Progressieve spierzwakte (schouders, heupen, nek)
- Slikklachten, vermoeidheid, gewichtsverlies

## Oorzaken & Risicofactoren

- Auto-immuun: antilichamen vallen spieren en huid aan
- Genetische gevoeligheid
- UV-blootstelling, infecties als triggers
- Bij sommige volwassenen geassocieerd met kanker

## Behandelingen

- Orale corticosteroïden (prednison) als eerstelijnstherapie
- Immunosuppressiva (methotrexaat, azathioprine)
- IV-immunoglobuline voor therapieresistente gevallen
- Fysiotherapie, zonbescherming

## Wanneer naar de dokter

Dringende evaluatie bij progressieve spierzwakte met huiduitslag, slik- of ademhalingsproblemen.`,
	},
	{
		slug: "pityriasis-rosea",
		title_en: "Pityriasis Rosea",
		title_nl: "Pityriasis Rosea",
		category_en: "Inflammatory & Auto-immune",
		category_nl: "Ontstekingsziekten & Auto-immuun",
		icon: "🔥",
		order: 8,
		summary_en:
			"A temporary rash beginning with a single 'herald patch' followed by smaller oval spots.",
		summary_nl:
			"Een tijdelijke huiduitslag die begint met een enkele 'primaire plaque' gevolgd door kleinere ovale vlekjes.",
		keywords: [
			"pityriasis rosea",
			"herald patch",
			"Christmas tree rash",
			"viral rash",
		],
		related: ["psoriasis", "eczema", "tinea-versicolor"],
		faqs: [
			{
				q: "Is pityriasis rosea contagious?",
				a: "It is not considered highly contagious. It may be triggered by a viral infection.",
			},
			{
				q: "How long does pityriasis rosea last?",
				a: "The rash typically lasts 6-8 weeks and resolves on its own.",
			},
		],
		content_en: `## What is Pityriasis Rosea?

Pityriasis rosea is a self-limiting skin rash beginning with a single large pink/red oval "herald patch." Smaller patches then appear across the chest, back, and abdomen in a "Christmas tree" pattern. Most common in ages 10-35.

## Symptoms

- Single herald patch: 2-10 cm oval, pink/red
- Smaller patches on trunk and upper limbs
- Christmas tree pattern on back
- Mild to moderate itching

## Causes & Risk Factors

- Possible viral trigger (HHV-6 or HHV-7)
- More common in spring and autumn

## Treatment Options

- Usually resolves spontaneously in 6-8 weeks
- Antihistamines for itching
- Topical corticosteroids if itching is severe
- UVB phototherapy for persistent cases

## When to See a Doctor

See a doctor to confirm diagnosis and rule out other conditions.`,
		content_nl: `## Wat is pityriasis rosea?

Pityriasis rosea is een zelflimiterende huiduitslag die begint met een enkele grote roze/rode ovale "primaire plaque." Kleinere vlekjes verschijnen vervolgens op borst, rug en buik in een "kerstboom"-patroon. Komt het meest voor bij 10-35 jaar.

## Symptomen

- Primaire plaque: ovaal, 2-10 cm, roze/rood
- Kleinere vlekjes op romp en bovenste ledematen
- Kerstboompatroon op de rug
- Milde tot matige jeuk

## Oorzaken & Risicofactoren

- Mogelijke virale trigger (HHV-6 of HHV-7)
- Vaker in lente en herfst

## Behandelingen

- Verdwijnt meestal spontaan in 6-8 weken
- Antihistaminica tegen jeuk
- Lokale corticosteroïden bij ernstige jeuk
- UVB-lichttherapie voor aanhoudende gevallen

## Wanneer naar de dokter

Ga naar de dokter om diagnose te bevestigen en andere aandoeningen uit te sluiten.`,
	},
	// ======================== INFECTIOUS — FUNGAL ========================
	{
		slug: "athletes-foot",
		title_en: "Athlete's Foot (Tinea Pedis)",
		title_nl: "Voetschimmel (Tinea Pedis)",
		category_en: "Infectious — Fungal",
		category_nl: "Infectieziekten — Schimmel",
		icon: "🦠",
		order: 9,
		summary_en:
			"A fungal infection of the feet causing itching, scaling, and redness between the toes.",
		summary_nl:
			"Een schimmelinfectie van de voeten die jeuk, schilfering en roodheid tussen de tenen veroorzaakt.",
		keywords: [
			"athletes foot",
			"tinea pedis",
			"foot fungus",
			"toe fungus",
			"fungal infection",
		],
		related: ["ringworm", "onychomycosis", "jock-itch"],
		faqs: [
			{
				q: "How do you get athlete's foot?",
				a: "Through contact with infected skin flakes or fungi in moist environments like locker rooms and swimming pools.",
			},
			{
				q: "Can athlete's foot spread to other body parts?",
				a: "Yes, it can spread to hands, groin, and nails if you scratch and touch other areas.",
			},
		],
		content_en: `## What is Athlete's Foot?

Athlete's foot (tinea pedis) is a common fungal infection caused by dermatophytes thriving in warm, moist environments. It typically starts between toes and can spread to soles.

## Symptoms

- Itching, stinging, burning between toes or on soles
- Cracked, peeling, dry skin
- Redness, inflammation
- Blisters in severe cases

## Causes & Risk Factors

- Walking barefoot in damp public areas
- Sweaty feet in non-breathable footwear
- Sharing towels, socks, or shoes

## Treatment Options

- OTC antifungal creams (clotrimazole, miconazole, terbinafine)
- Keep feet clean and dry
- Wear breathable footwear and moisture-wicking socks
- Prescription oral antifungals for severe cases

## When to See a Doctor

See a doctor if OTC treatments don't work after 2 weeks, you have diabetes, or signs of bacterial infection appear.`,
		content_nl: `## Wat is voetschimmel?

Voetschimmel (tinea pedis) is een veelvoorkomende schimmelinfectie veroorzaakt door dermatofyten die gedijen in warme, vochtige omgevingen. Het begint meestal tussen de tenen en kan naar de voetzolen verspreiden.

## Symptomen

- Jeuk, prikkeling, branderigheid tussen tenen of op voetzolen
- Gebarsten, schilferende, droge huid
- Roodheid, ontsteking
- Blaren in ernstige gevallen

## Oorzaken & Risicofactoren

- Blootsvoets lopen in vochtige openbare ruimtes
- Zweterige voeten in niet-ademende schoenen
- Delen van handdoeken, sokken of schoenen

## Behandelingen

- Vrij verkrijgbare antischimmelcrèmes (clotrimazol, miconazol, terbinafine)
- Houd voeten schoon en droog
- Draag ademend schoeisel en vochtafvoerende sokken
- Voorgeschreven orale antischimmelmiddelen bij ernstige gevallen

## Wanneer naar de dokter

Ga naar de dokter als vrij verkrijgbare behandelingen na 2 weken niet werken, je diabetes hebt, of tekenen van bacteriële infectie.`,
	},
	{
		slug: "ringworm",
		title_en: "Ringworm (Tinea Corporis)",
		title_nl: "Ringworm (Tinea Corporis)",
		category_en: "Infectious — Fungal",
		category_nl: "Infectieziekten — Schimmel",
		icon: "🦠",
		order: 10,
		summary_en:
			"A fungal infection creating a distinctive ring-shaped red rash, despite the name having nothing to do with worms.",
		summary_nl:
			"Een schimmelinfectie die een kenmerkende ringvormige rode uitslag veroorzaakt, ondanks dat de naam niets met wormen te maken heeft.",
		keywords: [
			"ringworm",
			"tinea corporis",
			"circular rash",
			"fungal skin infection",
		],
		related: ["athletes-foot", "jock-itch", "tinea-versicolor"],
		faqs: [
			{
				q: "Is ringworm caused by a worm?",
				a: "No, it's caused by a fungus. The name comes from the ring-like appearance.",
			},
			{
				q: "Can you get ringworm from pets?",
				a: "Yes, it is zoonotic and can be transmitted from cats, dogs, and other animals.",
			},
		],
		content_en: `## What is Ringworm?

Ringworm (tinea corporis) is a fungal infection appearing as a red, circular, ring-shaped rash with clearer skin in the center. It's caused by dermatophyte fungi, not worms. Highly contagious through direct contact.

## Symptoms

- Red, ring-shaped rash with raised, scaly border
- Clearer center of the ring
- Itching, expanding rings

## Causes & Risk Factors

- Direct contact with infected person or animal
- Contaminated surfaces (towels, gym mats)
- Warm, humid climates, tight clothing

## Treatment Options

- OTC antifungal creams (clotrimazole, miconazole, terbinafine)
- Keep skin clean and dry
- Avoid sharing personal items
- Prescription oral antifungals for widespread cases

## When to See a Doctor

See a doctor if rash doesn't improve within 2 weeks, covers large areas, or affects the scalp.`,
		content_nl: `## Wat is ringworm?

Ringworm (tinea corporis) is een schimmelinfectie die verschijnt als een rode, ronde, ringvormige uitslag met lichtere huid in het midden. Veroorzaakt door dermatofytenschimmels, niet door wormen. Zeer besmettelijk via direct contact.

## Symptomen

- Rode, ringvormige uitslag met verheven, schilferige rand
- Lichter midden van de ring
- Jeuk, uitbreidende ringen

## Oorzaken & Risicofactoren

- Direct contact met besmet persoon of dier
- Besmette oppervlakken (handdoeken, gymnastiekmatten)
- Warm, vochtig klimaat, strakke kleding

## Behandelingen

- Vrij verkrijgbare antischimmelcrèmes (clotrimazol, miconazol, terbinafine)
- Houd huid schoon en droog
- Deel geen persoonlijke spullen
- Voorschrift orale antischimmelmiddelen bij uitgebreide gevallen

## Wanneer naar de dokter

Ga naar de dokter als uitslag niet verbetert binnen 2 weken, grote oppervlakken bedekt, of de hoofdhuid treft.`,
	},
	// ======================== INFECTIOUS — FUNGAL (continued) ========================
	{
		slug: "candidiasis",
		title_en: "Candidiasis (Yeast Infection)",
		title_nl: "Candidiasis (Schimmelinfectie)",
		category_en: "Infectious — Fungal",
		category_nl: "Infectieziekten — Schimmel",
		icon: "🦠",
		order: 11,
		summary_en:
			"A fungal infection caused by Candida yeast overgrowth in warm, moist skin areas.",
		summary_nl:
			"Een schimmelinfectie veroorzaakt door overgroei van Candida-gist in warme, vochtige huidgebieden.",
		keywords: [
			"candidiasis",
			"yeast infection",
			"Candida",
			"thrush",
			"fungal infection",
		],
		related: ["athletes-foot", "ringworm", "jock-itch"],
		faqs: [
			{
				q: "What causes candidiasis?",
				a: "Overgrowth of Candida yeast, often triggered by antibiotics, diabetes, weakened immunity, or moist environments.",
			},
			{
				q: "Where does candidiasis commonly occur?",
				a: "Skin folds, mouth (thrush), genital area, and nail beds are common sites.",
			},
		],
		content_en: generateShortContent("Candidiasis", "yeast infection", true),
		content_nl: generateShortContent("Candidiasis", "schimmelinfectie", false),
	},
	{
		slug: "jock-itch",
		title_en: "Jock Itch (Tinea Cruris)",
		title_nl: "Jock Itch (Tinea Cruris)",
		category_en: "Infectious — Fungal",
		category_nl: "Infectieziekten — Schimmel",
		icon: "🦠",
		order: 12,
		summary_en:
			"A fungal infection in the groin area causing an itchy, red, ring-shaped rash.",
		summary_nl:
			"Een schimmelinfectie in de liesstreek die een jeukende, rode, ringvormige uitslag veroorzaakt.",
		keywords: ["jock itch", "tinea cruris", "groin fungus", "fungal infection"],
		related: ["athletes-foot", "ringworm", "candidiasis"],
		faqs: [
			{
				q: "Is jock itch contagious?",
				a: "Yes, it can spread through skin contact or shared towels and clothing.",
			},
			{
				q: "Can jock itch be prevented?",
				a: "Keep groin area clean and dry, wear loose cotton underwear, and avoid sharing towels.",
			},
		],
		content_en: generateShortContent(
			"Jock Itch",
			"fungal groin infection",
			true,
		),
		content_nl: generateShortContent(
			"Jock Itch",
			"schimmelinfectie in de liesstreek",
			false,
		),
	},
	{
		slug: "tinea-versicolor",
		title_en: "Tinea Versicolor",
		title_nl: "Tinea Versicolor",
		category_en: "Infectious — Fungal",
		category_nl: "Infectieziekten — Schimmel",
		icon: "🦠",
		order: 13,
		summary_en:
			"A fungal infection causing small, discolored patches of skin, often on the chest and back.",
		summary_nl:
			"Een schimmelinfectie die kleine, verkleurde huidvlekjes veroorzaakt, vaak op borst en rug.",
		keywords: [
			"tinea versicolor",
			"pityriasis versicolor",
			"skin discoloration",
			"fungal",
		],
		related: ["ringworm", "athletes-foot", "vitiligo"],
		faqs: [
			{
				q: "What does tinea versicolor look like?",
				a: "It appears as lighter or darker patches on the skin, often more noticeable after sun exposure.",
			},
			{
				q: "Does tinea versicolor go away on its own?",
				a: "It may resolve in cooler months but often recurs. Antifungal treatments are effective.",
			},
		],
		content_en: generateShortContent(
			"Tinea Versicolor",
			"discoloring fungal infection",
			true,
		),
		content_nl: generateShortContent(
			"Tinea Versicolor",
			"verkleurende schimmelinfectie",
			false,
		),
	},
	{
		slug: "onychomycosis",
		title_en: "Onychomycosis (Nail Fungus)",
		title_nl: "Onychomycosis (Nagelschimmel)",
		category_en: "Infectious — Fungal",
		category_nl: "Infectieziekten — Schimmel",
		icon: "🦠",
		order: 14,
		summary_en:
			"A fungal infection of the fingernails or toenails causing thickening, discoloration, and crumbling.",
		summary_nl:
			"Een schimmelinfectie van vinger- of teennagels die verdikking, verkleuring en brokkeligheid veroorzaakt.",
		keywords: [
			"onychomycosis",
			"nail fungus",
			"toenail fungus",
			"nail infection",
		],
		related: ["athletes-foot", "ringworm", "jock-itch"],
		faqs: [
			{
				q: "How is nail fungus treated?",
				a: "Oral antifungals (terbinafine, itraconazole) are most effective. Topical treatments work for mild cases.",
			},
			{
				q: "Can nail fungus be prevented?",
				a: "Keep nails trimmed and dry, wear breathable footwear, and avoid walking barefoot in public areas.",
			},
		],
		content_en: generateShortContent("Onychomycosis", "nail fungus", true),
		content_nl: generateShortContent("Onychomycosis", "nagelschimmel", false),
	},
	// ======================== INFECTIOUS — BACTERIAL ========================
	{
		slug: "impetigo",
		title_en: "Impetigo",
		title_nl: "Impetigo (Krentenbaard)",
		category_en: "Infectious — Bacterial",
		category_nl: "Infectieziekten — Bacterieel",
		icon: "🧫",
		order: 15,
		summary_en:
			"A highly contagious bacterial skin infection causing honey-colored crusted sores, common in children.",
		summary_nl:
			"Een zeer besmettelijke bacteriële huidinfectie die honingkleurige korstige plekken veroorzaakt, vaak bij kinderen.",
		keywords: [
			"impetigo",
			"bacterial skin infection",
			"honey crusted sores",
			"school sores",
		],
		related: ["cellulitis", "folliculitis", "erysipelas"],
		faqs: [
			{
				q: "Is impetigo contagious?",
				a: "Yes, it is highly contagious through direct contact with sores or contaminated items.",
			},
			{
				q: "How is impetigo treated?",
				a: "With topical antibiotic creams (mupirocin) or oral antibiotics for widespread cases.",
			},
		],
		content_en: generateShortContent(
			"Impetigo",
			"bacterial skin infection",
			true,
		),
		content_nl: generateShortContent(
			"Impetigo (Krentenbaard)",
			"bacteriële huidinfectie",
			false,
		),
	},
	{
		slug: "cellulitis",
		title_en: "Cellulitis",
		title_nl: "Cellulitis",
		category_en: "Infectious — Bacterial",
		category_nl: "Infectieziekten — Bacterieel",
		icon: "🧫",
		order: 16,
		summary_en:
			"A deep bacterial skin infection causing redness, swelling, warmth, and pain, requiring prompt antibiotic treatment.",
		summary_nl:
			"Een diepe bacteriële huidinfectie die roodheid, zwelling, warmte en pijn veroorzaakt en snelle antibioticabehandeling vereist.",
		keywords: [
			"cellulitis",
			"bacterial infection",
			"skin infection",
			"red swollen skin",
		],
		related: ["impetigo", "erysipelas", "folliculitis"],
		faqs: [
			{
				q: "Is cellulitis serious?",
				a: "Yes, cellulitis can be serious if untreated as bacteria can spread to the bloodstream.",
			},
			{
				q: "What causes cellulitis?",
				a: "Bacteria (usually Streptococcus or Staphylococcus) entering through a break in the skin.",
			},
		],
		content_en: generateShortContent(
			"Cellulitis",
			"deep bacterial skin infection",
			true,
		),
		content_nl: generateShortContent(
			"Cellulitis",
			"diepe bacteriële huidinfectie",
			false,
		),
	},
	{
		slug: "folliculitis",
		title_en: "Folliculitis",
		title_nl: "Folliculitis (Haarzakontsteking)",
		category_en: "Infectious — Bacterial",
		category_nl: "Infectieziekten — Bacterieel",
		icon: "🧫",
		order: 17,
		summary_en:
			"Inflammation of hair follicles causing small red bumps or white-headed pimples around hair follicles.",
		summary_nl:
			"Ontsteking van haarzakjes die kleine rode bultjes of witte puistjes rond haarzakjes veroorzaakt.",
		keywords: [
			"folliculitis",
			"hair follicle infection",
			"razor bumps",
			"hot tub folliculitis",
		],
		related: ["boils", "acne-vulgaris", "impetigo"],
		faqs: [
			{
				q: "What causes folliculitis?",
				a: "Bacterial (usually staph), fungal, or viral infection of hair follicles, or irritation from shaving.",
			},
			{
				q: "How is folliculitis treated?",
				a: "Mild cases resolve with warm compresses and good hygiene. Antibiotics may be needed for bacterial cases.",
			},
		],
		content_en: generateShortContent(
			"Folliculitis",
			"hair follicle inflammation",
			true,
		),
		content_nl: generateShortContent(
			"Folliculitis",
			"haarzakontsteking",
			false,
		),
	},
	// ======================== INFECTIOUS — BACTERIAL (continued) ========================
	{
		slug: "boils",
		title_en: "Boils & Carbuncles",
		title_nl: "Steenpuisten & Karbonkels",
		category_en: "Infectious — Bacterial",
		category_nl: "Infectieziekten — Bacterieel",
		icon: "🧫",
		order: 18,
		summary_en:
			"Painful, pus-filled lumps under the skin caused by bacterial infection of hair follicles.",
		summary_nl:
			"Pijnlijke, met pus gevulde bulten onder de huid veroorzaakt door bacteriële infectie van haarzakjes.",
		keywords: [
			"boils",
			"carbuncles",
			"furuncles",
			"staph infection",
			"skin abscess",
		],
		related: ["folliculitis", "cellulitis", "impetigo"],
		faqs: [
			{
				q: "Should you squeeze a boil?",
				a: "No, squeezing can push infection deeper. Apply warm compresses to encourage natural drainage.",
			},
			{
				q: "When does a boil need medical attention?",
				a: "If large, on the face/spine, accompanied by fever, or not draining after home treatment.",
			},
		],
		content_en: generateShortContent(
			"Boils & Carbuncles",
			"bacterial skin abscess",
			true,
		),
		content_nl: generateShortContent(
			"Steenpuisten & Karbonkels",
			"bacterieel huidabces",
			false,
		),
	},
	{
		slug: "erysipelas",
		title_en: "Erysipelas",
		title_nl: "Erysipelas (Wondroos)",
		category_en: "Infectious — Bacterial",
		category_nl: "Infectieziekten — Bacterieel",
		icon: "🧫",
		order: 19,
		summary_en:
			"A superficial bacterial skin infection with sharply defined, raised red borders, often on the face or legs.",
		summary_nl:
			"Een oppervlakkige bacteriële huidinfectie met scherp begrensde, verheven rode randen, vaak op gezicht of benen.",
		keywords: [
			"erysipelas",
			"bacterial skin infection",
			"streptococcus",
			"red rash",
		],
		related: ["cellulitis", "impetigo", "contact-dermatitis"],
		faqs: [
			{
				q: "What is the difference between erysipelas and cellulitis?",
				a: "Erysipelas affects upper skin layers with sharp borders; cellulitis is deeper with less distinct borders.",
			},
			{
				q: "How is erysipelas treated?",
				a: "With antibiotics (usually penicillin), rest, and elevation of affected limb.",
			},
		],
		content_en: generateShortContent(
			"Erysipelas",
			"superficial bacterial skin infection",
			true,
		),
		content_nl: generateShortContent(
			"Erysipelas (Wondroos)",
			"oppervlakkige bacteriële huidinfectie",
			false,
		),
	},
	// ======================== INFECTIOUS — VIRAL ========================
	{
		slug: "warts",
		title_en: "Warts",
		title_nl: "Wratten",
		category_en: "Infectious — Viral",
		category_nl: "Infectieziekten — Viraal",
		icon: "🦠",
		order: 20,
		summary_en:
			"Small, rough growths on the skin caused by human papillomavirus (HPV), commonly on hands and feet.",
		summary_nl:
			"Kleine, ruwe huidgroei veroorzaakt door het humaan papillomavirus (HPV), vaak op handen en voeten.",
		keywords: ["warts", "verruca", "HPV", "common warts", "plantar warts"],
		related: ["molluscum-contagiosum", "skin-tags", "seborrheic-keratosis"],
		faqs: [
			{
				q: "Are warts contagious?",
				a: "Yes, warts spread through direct skin contact or contact with contaminated surfaces.",
			},
			{
				q: "Do warts go away on their own?",
				a: "Many warts resolve spontaneously within 1-2 years, especially in children.",
			},
		],
		content_en: generateShortContent(
			"Warts",
			"viral skin infection known as HPV",
			true,
		),
		content_nl: generateShortContent(
			"Wratten",
			"virale huidinfectie (HPV)",
			false,
		),
	},
	{
		slug: "cold-sores",
		title_en: "Cold Sores (Herpes Labialis)",
		title_nl: "Koortslip (Herpes Labialis)",
		category_en: "Infectious — Viral",
		category_nl: "Infectieziekten — Viraal",
		icon: "🦠",
		order: 21,
		summary_en:
			"Small, fluid-filled blisters around the lips caused by herpes simplex virus (HSV-1).",
		summary_nl:
			"Kleine, met vocht gevulde blaasjes rond de lippen veroorzaakt door herpes simplex virus (HSV-1).",
		keywords: [
			"cold sores",
			"herpes labialis",
			"HSV-1",
			"fever blisters",
			"oral herpes",
		],
		related: ["shingles", "warts", "impetigo"],
		faqs: [
			{
				q: "Are cold sores contagious?",
				a: "Yes, they spread through kissing, sharing utensils, or oral contact during an outbreak.",
			},
			{
				q: "What triggers cold sores?",
				a: "Stress, fatigue, sun exposure, fever, hormonal changes, and weakened immunity.",
			},
		],
		content_en: generateShortContent(
			"Cold Sores",
			"viral infection caused by HSV-1",
			true,
		),
		content_nl: generateShortContent(
			"Koortslip",
			"virale infectie (HSV-1)",
			false,
		),
	},
	{
		slug: "shingles",
		title_en: "Shingles (Herpes Zoster)",
		title_nl: "Gordelroos (Herpes Zoster)",
		category_en: "Infectious — Viral",
		category_nl: "Infectieziekten — Viraal",
		icon: "🦠",
		order: 22,
		summary_en:
			"A painful, blistering rash caused by reactivation of the varicella-zoster virus (chickenpox virus).",
		summary_nl:
			"Een pijnlijke, blaarvormende huiduitslag veroorzaakt door reactivatie van het varicella-zoster virus (waterpokkenvirus).",
		keywords: [
			"shingles",
			"herpes zoster",
			"varicella zoster",
			"painful rash",
			"postherpetic neuralgia",
		],
		related: ["cold-sores", "chickenpox", "cellulitis"],
		faqs: [
			{
				q: "Is shingles contagious?",
				a: "You cannot spread shingles, but the virus can cause chickenpox in someone who has never had it.",
			},
			{
				q: "Can shingles be prevented?",
				a: "Yes, the shingles vaccine (Shingrix) is recommended for adults over 50.",
			},
		],
		content_en: generateShortContent(
			"Shingles",
			"reactivated varicella-zoster virus",
			true,
		),
		content_nl: generateShortContent(
			"Gordelroos",
			"gereactiveerd varicella-zoster virus",
			false,
		),
	},
	{
		slug: "molluscum-contagiosum",
		title_en: "Molluscum Contagiosum",
		title_nl: "Molluscum Contagiosum",
		category_en: "Infectious — Viral",
		category_nl: "Infectieziekten — Viraal",
		icon: "🦠",
		order: 23,
		summary_en:
			"A viral skin infection causing small, firm, dome-shaped bumps with a central dimple.",
		summary_nl:
			"Een virale huidinfectie die kleine, stevige, koepelvormige bultjes met een centraal kuiltje veroorzaakt.",
		keywords: [
			"molluscum contagiosum",
			"viral bumps",
			"poxvirus",
			"water warts",
		],
		related: ["warts", "skin-tags", "milia"],
		faqs: [
			{
				q: "Does molluscum contagiosum need treatment?",
				a: "It often resolves spontaneously in 6-12 months. Treatment may be considered for cosmetic reasons or spread prevention.",
			},
			{
				q: "How does molluscum contagiosum spread?",
				a: "Through skin contact, contaminated objects, or autoinoculation by scratching.",
			},
		],
		content_en: generateShortContent(
			"Molluscum Contagiosum",
			"poxvirus skin infection",
			true,
		),
		content_nl: generateShortContent(
			"Molluscum Contagiosum",
			"pokkenvirus huidinfectie",
			false,
		),
	},
	{
		slug: "hand-foot-mouth",
		title_en: "Hand-Foot-and-Mouth Disease",
		title_nl: "Hand-voet-mondziekte",
		category_en: "Infectious — Viral",
		category_nl: "Infectieziekten — Viraal",
		icon: "🦠",
		order: 24,
		summary_en:
			"A common viral illness in children causing sores in the mouth and a rash on hands and feet.",
		summary_nl:
			"Een veelvoorkomende virale infectie bij kinderen die mondzweren en huiduitslag op handen en voeten veroorzaakt.",
		keywords: [
			"hand foot mouth",
			"HFMD",
			"coxsackievirus",
			"childhood rash",
			"viral infection",
		],
		related: ["cold-sores", "molluscum-contagiosum", "impetigo"],
		faqs: [
			{
				q: "How long is hand-foot-and-mouth disease contagious?",
				a: "Most contagious in the first week. Virus can shed for weeks after symptoms resolve.",
			},
			{
				q: "How is HFMD treated?",
				a: "No specific treatment. Focus on pain relief, hydration, and rest. Symptoms typically resolve in 7-10 days.",
			},
		],
		content_en: generateShortContent(
			"Hand-Foot-and-Mouth Disease",
			"viral childhood illness",
			true,
		),
		content_nl: generateShortContent(
			"Hand-voet-mondziekte",
			"virale kinderziekte",
			false,
		),
	},
	// ======================== PIGMENTATION DISORDERS ========================
	{
		slug: "vitiligo",
		title_en: "Vitiligo",
		title_nl: "Vitiligo",
		category_en: "Pigmentation Disorders",
		category_nl: "Pigmentstoornissen",
		icon: "🎨",
		order: 25,
		summary_en:
			"A condition causing loss of skin color in patches due to melanocyte destruction.",
		summary_nl:
			"Een aandoening die pigmentverlies in vlekken veroorzaakt door vernietiging van melanocyten.",
		keywords: [
			"vitiligo",
			"white patches",
			"pigment loss",
			"depigmentation",
			"autoimmune",
		],
		related: ["melasma", "albinism", "tinea-versicolor"],
		faqs: [
			{
				q: "Is vitiligo hereditary?",
				a: "About 20-30% of people with vitiligo have a family history of the condition.",
			},
			{
				q: "Can vitiligo be treated?",
				a: "Treatments include topical corticosteroids, phototherapy, and depigmentation therapy, though results vary.",
			},
		],
		content_en: generateShortContent("Vitiligo", "pigment loss disorder", true),
		content_nl: generateShortContent(
			"Vitiligo",
			"pigmentverlies aandoening",
			false,
		),
	},
	{
		slug: "melasma",
		title_en: "Melasma",
		title_nl: "Melasma",
		category_en: "Pigmentation Disorders",
		category_nl: "Pigmentstoornissen",
		icon: "🎨",
		order: 26,
		summary_en:
			"Brown or gray-brown patches on the face, often triggered by sun exposure and hormonal changes.",
		summary_nl:
			"Bruine of grijsbruine vlekken in het gezicht, vaak uitgelokt door zonblootstelling en hormonale veranderingen.",
		keywords: [
			"melasma",
			"chloasma",
			"hyperpigmentation",
			"pregnancy mask",
			"facial pigmentation",
		],
		related: ["vitiligo", "post-inflammatory-hyperpigmentation", "sunburn"],
		faqs: [
			{
				q: "What causes melasma?",
				a: "Sun exposure, hormonal changes (pregnancy, birth control), genetics, and certain medications.",
			},
			{
				q: "Can melasma be cured?",
				a: "It can be managed with sun protection, topical treatments (hydroquinone), and procedures, but may recur.",
			},
		],
		content_en: generateShortContent(
			"Melasma",
			"facial hyperpigmentation condition",
			true,
		),
		content_nl: generateShortContent(
			"Melasma",
			"hyperpigmentatie in het gezicht",
			false,
		),
	},
	{
		slug: "post-inflammatory-hyperpigmentation",
		title_en: "Post-inflammatory Hyperpigmentation",
		title_nl: "Post-inflammatoire Hyperpigmentatie",
		category_en: "Pigmentation Disorders",
		category_nl: "Pigmentstoornissen",
		icon: "🎨",
		order: 27,
		summary_en:
			"Dark spots left behind after skin inflammation or injury heals, common in darker skin tones.",
		summary_nl:
			"Donkere vlekken die achterblijven nadat huidontsteking of letsel geneest, vaak bij donkere huidtypes.",
		keywords: [
			"post inflammatory hyperpigmentation",
			"PIH",
			"dark spots",
			"acne marks",
			"hyperpigmentation",
		],
		related: ["melasma", "acne-vulgaris", "vitiligo"],
		faqs: [
			{
				q: "Will post-inflammatory hyperpigmentation fade on its own?",
				a: "Yes, it often fades over months, butct sun protection and treatments can speed up the process.",
			},
			{
				q: "What treatments work for PIH?",
				a: "Sunscreen, topical retinoids, azelaic acid, chemical peels, and laser treatments.",
			},
		],
		content_en: generateShortContent(
			"Post-inflammatory Hyperpigmentation",
			"skin discoloration condition",
			true,
		),
		content_nl: generateShortContent(
			"Post-inflammatoire Hyperpigmentatie",
			"huidverkleuring",
			false,
		),
	},
	{
		slug: "albinism",
		title_en: "Albinism",
		title_nl: "Albinisme",
		category_en: "Pigmentation Disorders",
		category_nl: "Pigmentstoornissen",
		icon: "🎨",
		order: 28,
		summary_en:
			"A genetic condition characterized by little or no melanin production, affecting skin, hair, and eye color.",
		summary_nl:
			"Een genetische aandoening gekenmerkt door weinig of geen melanineproductie, wat huid-, haar- en oogkleur beïnvloedt.",
		keywords: [
			"albinism",
			"oculocutaneous albinism",
			"melanin deficiency",
			"genetic condition",
			"hypopigmentation",
		],
		related: ["vitiligo", "sunburn", "actinic-keratosis"],
		faqs: [
			{
				q: "Is albinism curable?",
				a: "No, it is a genetic condition. Management focuses on sun protection and regular eye exams.",
			},
			{
				q: "Does albinism affect lifespan?",
				a: "People with albinism can live normal lifespans with proper sun protection to prevent skin cancer.",
			},
		],
		content_en: generateShortContent(
			"Albinism",
			"genetic melanin deficiency",
			true,
		),
		content_nl: generateShortContent(
			"Albinisme",
			"genetische melaninedeficiëntie",
			false,
		),
	},
	// ======================== ACNE & FOLLICULAR DISORDERS ========================
	{
		slug: "acne-vulgaris",
		title_en: "Acne Vulgaris",
		title_nl: "Acne Vulgaris (Jeugdpuistjes)",
		category_en: "Acne & Follicular Disorders",
		category_nl: "Acne & Haarzakandoeningen",
		icon: "💊",
		order: 29,
		summary_en:
			"A common skin condition causing pimples, blackheads, and cysts, primarily affecting teenagers.",
		summary_nl:
			"Een veelvoorkomende huidaandoening die puistjes, mee-eters en cysten veroorzaakt, vooral bij tieners.",
		keywords: ["acne", "pimples", "blackheads", "whiteheads", "cystic acne"],
		related: ["rosacea", "folliculitis", "hidradenitis-suppurativa"],
		faqs: [
			{
				q: "What causes acne?",
				a: "Excess oil production, clogged hair follicles, bacteria (C. acnes), and hormonal changes.",
			},
			{
				q: "Does diet affect acne?",
				a: "High-glycemic foods and dairy may worsen acne in some individuals.",
			},
		],
		content_en: generateShortContent(
			"Acne Vulgaris",
			"common skin condition",
			true,
		),
		content_nl: generateShortContent(
			"Acne Vulgaris",
			"veelvoorkomende huidaandoening",
			false,
		),
	},
	{
		slug: "hidradenitis-suppurativa",
		title_en: "Hidradenitis Suppurativa",
		title_nl: "Hidradenitis Suppurativa",
		category_en: "Acne & Follicular Disorders",
		category_nl: "Acne & Haarzakandoeningen",
		icon: "💊",
		order: 30,
		summary_en:
			"A chronic condition causing painful lumps under the skin in areas where skin rubs together.",
		summary_nl:
			"Een chronische aandoening die pijnlijke bulten onder de huid veroorzaakt op plaatsen waar de huid tegen elkaar schuurt.",
		keywords: [
			"hidradenitis suppurativa",
			"HS",
			"acne inversa",
			"painful lumps",
			"chronic skin",
		],
		related: ["acne-vulgaris", "boils", "folliculitis"],
		faqs: [
			{
				q: "Is hidradenitis suppurativa contagious?",
				a: "No, it is not contagious. It is an inflammatory condition.",
			},
			{
				q: "Can HS be cured?",
				a: "There is no cure, but treatments including antibiotics, biologics, and surgery can manage symptoms.",
			},
		],
		content_en: generateShortContent(
			"Hidradenitis Suppurativa",
			"chronic inflammatory skin condition",
			true,
		),
		content_nl: generateShortContent(
			"Hidradenitis Suppurativa",
			"chronische ontstekingsaandoening",
			false,
		),
	},
	{
		slug: "perioral-dermatitis",
		title_en: "Perioral Dermatitis",
		title_nl: "Periorale Dermatitis",
		category_en: "Acne & Follicular Disorders",
		category_nl: "Acne & Haarzakandoeningen",
		icon: "💊",
		order: 31,
		summary_en:
			"A facial rash causing small red bumps around the mouth, often triggered by topical steroids.",
		summary_nl:
			"Een gezichtsuitslag met kleine rode bultjes rond de mond, vaak uitgelokt door lokale corticosteroïden.",
		keywords: [
			"perioral dermatitis",
			"facial rash",
			"around mouth rash",
			"steroid induced",
		],
		related: ["rosacea", "acne-vulgaris", "contact-dermatitis"],
		faqs: [
			{
				q: "What triggers perioral dermatitis?",
				a: "Topical steroids, heavy creams, fluoridated toothpaste, and hormonal factors.",
			},
			{
				q: "How is it treated?",
				a: "Stop steroid use, oral antibiotics (tetracyclines), and topical metronidazole or azelaic acid.",
			},
		],
		content_en: generateShortContent(
			"Perioral Dermatitis",
			"facial rash condition",
			true,
		),
		content_nl: generateShortContent(
			"Periorale Dermatitis",
			"gezichtsuitslag",
			false,
		),
	},
	{
		slug: "keratosis-pilaris",
		title_en: "Keratosis Pilaris",
		title_nl: "Keratosis Pilaris",
		category_en: "Acne & Follicular Disorders",
		category_nl: "Acne & Haarzakandoeningen",
		icon: "💊",
		order: 32,
		summary_en:
			"A harmless condition causing small, rough bumps on upper arms, thighs, and cheeks from keratin buildup.",
		summary_nl:
			"Een onschuldige aandoening die kleine, ruwe bultjes op bovenarmen, dijen en wangen veroorzaakt door keratineophoping.",
		keywords: [
			"keratosis pilaris",
			"chicken skin",
			"rough bumps",
			"keratin buildup",
		],
		related: ["acne-vulgaris", "folliculitis", "milia"],
		faqs: [
			{
				q: "Can keratosis pilaris be cured?",
				a: "No cure, but it often improves with age. Moisturizers and exfoliants can reduce appearance.",
			},
			{
				q: "Is keratosis pilaris an allergy?",
				a: "No, it is a genetic condition related to keratin overproduction, not an allergy.",
			},
		],
		content_en: generateShortContent(
			"Keratosis Pilaris",
			"benign skin bump condition",
			true,
		),
		content_nl: generateShortContent(
			"Keratosis Pilaris",
			"onschuldige huidbultjes",
			false,
		),
	},
	{
		slug: "milia",
		title_en: "Milia",
		title_nl: "Milia (Gerstepuistjes)",
		category_en: "Acne & Follicular Disorders",
		category_nl: "Acne & Haarzakandoeningen",
		icon: "💊",
		order: 33,
		summary_en:
			"Small, white cysts on the skin surface, commonly appearing on the face, especially around eyes.",
		summary_nl:
			"Kleine, witte cysten op het huidoppervlak, vaak in het gezicht, vooral rond de ogen.",
		keywords: [
			"milia",
			"milk spots",
			"white bumps",
			"keratin cysts",
			"facial cysts",
		],
		related: ["acne-vulgaris", "keratosis-pilaris", "seborrheic-keratosis"],
		faqs: [
			{
				q: "Do milia go away on their own?",
				a: "In babies, milia resolve spontaneously. In adults, they may persist and require extraction.",
			},
			{
				q: "Can I remove milia at home?",
				a: "It is not recommended. See a dermatologist for safe extraction to avoid scarring.",
			},
		],
		content_en: generateShortContent("Milia", "tiny white skin cysts", true),
		content_nl: generateShortContent(
			"Milia (Gerstepuistjes)",
			"kleine witte huidcysten",
			false,
		),
	},
	// ======================== BENIGN GROWTHS & TUMORS ========================
	{
		slug: "seborrheic-keratosis",
		title_en: "Seborrheic Keratosis",
		title_nl: "Seborroïsche Keratose",
		category_en: "Benign Growths & Tumors",
		category_nl: "Goedaardige Groei & Tumoren",
		icon: "🔬",
		order: 34,
		summary_en:
			"Benign, waxy, stuck-on looking growths that commonly appear with aging, often called age spots.",
		summary_nl:
			"Goedaardige, wasachtige, vastgeplakt uitziende huidgroei die vaak met veroudering verschijnt, ook wel ouderdomsvlekken genoemd.",
		keywords: [
			"seborrheic keratosis",
			"age spots",
			"benign growth",
			"skin barnacles",
		],
		related: ["cherry-angioma", "dermatofibroma", "actinic-keratosis"],
		faqs: [
			{
				q: "Is seborrheic keratosis cancerous?",
				a: "No, they are completely benign. However, any changing lesion should be evaluated.",
			},
			{
				q: "Can seborrheic keratosis be removed?",
				a: "Yes, through cryotherapy, curettage, or laser for cosmetic reasons.",
			},
		],
		content_en: generateShortContent(
			"Seborrheic Keratosis",
			"benign skin growth",
			true,
		),
		content_nl: generateShortContent(
			"Seborroïsche Keratose",
			"goedaardige huidgroei",
			false,
		),
	},
	{
		slug: "cherry-angioma",
		title_en: "Cherry Angioma",
		title_nl: "Cherry Angioma (Rode Moedervlek)",
		category_en: "Benign Growths & Tumors",
		category_nl: "Goedaardige Groei & Tumoren",
		icon: "🔬",
		order: 35,
		summary_en:
			"Small, bright red, benign skin growths made of blood vessels, common after age 30.",
		summary_nl:
			"Kleine, helderrode, goedaardige huidgroei bestaande uit bloedvaatjes, vaak na 30-jarige leeftijd.",
		keywords: [
			"cherry angioma",
			"campbell de Morgan spots",
			"red moles",
			"blood vessel growths",
		],
		related: ["skin-tags", "dermatofibroma", "lipoma"],
		faqs: [
			{
				q: "Are cherry angiomas dangerous?",
				a: "No, they are completely harmless. Sudden appearance of many may warrant a check-up.",
			},
			{
				q: "Can cherry angiomas be removed?",
				a: "Yes, laser therapy or electrocautery can remove them for cosmetic reasons.",
			},
		],
		content_en: generateShortContent(
			"Cherry Angioma",
			"benign blood vessel growth",
			true,
		),
		content_nl: generateShortContent(
			"Cherry Angioma",
			"goedaardige bloedvatgroei",
			false,
		),
	},
	{
		slug: "dermatofibroma",
		title_en: "Dermatofibroma",
		title_nl: "Dermatofibroma",
		category_en: "Benign Growths & Tumors",
		category_nl: "Goedaardige Groei & Tumoren",
		icon: "🔬",
		order: 36,
		summary_en:
			"A firm, benign nodule often appearing on legs after minor injury, with characteristic dimpling when pinched.",
		summary_nl:
			"Een stevig, goedaardig bobbeltje vaak op benen na een kleine verwonding, met karakteristieke indeuking bij knijpen.",
		keywords: [
			"dermatofibroma",
			"fibrous histiocytoma",
			"benign nodule",
			"dimple sign",
		],
		related: ["cherry-angioma", "skin-tags", "lipoma"],
		faqs: [
			{
				q: "Is a dermatofibroma cancerous?",
				a: "No, they are benign fibrous growths and do not become cancerous.",
			},
			{
				q: "Can dermatofibromas be left alone?",
				a: "Yes, they are harmless and don't require treatment unless causing symptoms.",
			},
		],
		content_en: generateShortContent(
			"Dermatofibroma",
			"benign fibrous nodule",
			true,
		),
		content_nl: generateShortContent(
			"Dermatofibroma",
			"goedaardig fibreus bobbeltje",
			false,
		),
	},
	{
		slug: "skin-tags",
		title_en: "Skin Tags (Acrochordons)",
		title_nl: "Skin Tags (Steelwratjes)",
		category_en: "Benign Growths & Tumors",
		category_nl: "Goedaardige Groei & Tumoren",
		icon: "🔬",
		order: 37,
		summary_en:
			"Small, soft, flesh-colored skin growths on a thin stalk, common in skin folds.",
		summary_nl:
			"Kleine, zachte, huidkleurige huidgezwellen op een dun steeltje, vaak in huidplooien.",
		keywords: ["skin tags", "acrochordons", "benign growths", "skin flaps"],
		related: ["cherry-angioma", "seborrheic-keratosis", "warts"],
		faqs: [
			{
				q: "What causes skin tags?",
				a: "Friction from skin rubbing against skin, genetics, obesity, and hormonal changes (pregnancy).",
			},
			{
				q: "How are skin tags removed?",
				a: "By cryotherapy, surgical excision, or cauterization. Should be done by a professional.",
			},
		],
		content_en: generateShortContent("Skin Tags", "benign skin growth", true),
		content_nl: generateShortContent(
			"Skin Tags (Steelwratjes)",
			"goedaardig huidgezwel",
			false,
		),
	},
	{
		slug: "lipoma",
		title_en: "Lipoma",
		title_nl: "Lipoma (Vetbult)",
		category_en: "Benign Growths & Tumors",
		category_nl: "Goedaardige Groei & Tumoren",
		icon: "🔬",
		order: 38,
		summary_en:
			"A soft, fatty lump that grows slowly under the skin, usually harmless and painless.",
		summary_nl:
			"Een zachte, vettige bult die langzaam onder de huid groeit, meestal onschuldig en pijnloos.",
		keywords: ["lipoma", "fatty lump", "benign tumor", "subcutaneous lump"],
		related: ["skin-tags", "dermatofibroma", "cherry-angioma"],
		faqs: [
			{
				q: "When should a lipoma be removed?",
				a: "If it causes pain, grows rapidly, or is cosmetically bothersome. Otherwise,14 observation is fine.",
			},
			{
				q: "Can a lipoma become cancerous?",
				a: "Extremely rare. Liposarcoma is a different, malignant tumor that resembles lipoma.",
			},
		],
		content_en: generateShortContent("Lipoma", "benign fatty growth", true),
		content_nl: generateShortContent(
			"Lipoma (Vetbult)",
			"goedaardige vetgroei",
			false,
		),
	},
	// ======================== PRE-CANCEROUS & SUN-RELATED ========================
	{
		slug: "actinic-keratosis",
		title_en: "Actinic Keratosis",
		title_nl: "Actinische Keratose",
		category_en: "Pre-Cancerous & Sun-related",
		category_nl: "Voorstadium Huidkanker & Zon-gerelateerd",
		icon: "☀️",
		order: 39,
		summary_en:
			"Rough, scaly patches on sun-exposed skin caused by cumulative UV damage, a potential precursor to skin cancer.",
		summary_nl:
			"Ruwe, schilferige plekken op aan zon blootgestelde huid veroorzaakt door cumulatieve UV-schade, een mogelijke voorloper van huidkanker.",
		keywords: [
			"actinic keratosis",
			"solar keratosis",
			"precancerous skin",
			"sun damage",
			"AK",
		],
		related: ["sunburn", "basal-cell-carcinoma", "squamous-cell-carcinoma"],
		faqs: [
			{
				q: "Is actinic keratosis skin cancer?",
				a: "It is precancerous, meaning about 5-10% may develop into squamous cell carcinoma if untreated.",
			},
			{
				q: "How is actinic keratosis treated?",
				a: "Cryotherapy, topical creams (5-FU, imiquimod), photodynamic therapy, or surgical removal.",
			},
		],
		content_en: generateShortContent(
			"Actinic Keratosis",
			"pre-cancerous sun damage condition",
			true,
		),
		content_nl: generateShortContent(
			"Actinische Keratose",
			"voorstadium huidkanker",
			false,
		),
	},
	{
		slug: "contact-dermatitis",
		title_en: "Contact Dermatitis",
		title_nl: "Contactdermatitis",
		category_en: "Inflammatory & Auto-immune",
		category_nl: "Ontstekingsziekten & Auto-immuun",
		icon: "🔥",
		order: 40,
		summary_en:
			"Skin inflammation caused by direct contact with an irritant or allergen, resulting in red, itchy rash.",
		summary_nl:
			"Huidontsteking veroorzaakt door direct contact met een irriterende stof of allergeen, resulterend in rode, jeukende uitslag.",
		keywords: [
			"contact dermatitis",
			"allergic contact dermatitis",
			"irritant dermatitis",
			"skin allergy",
			"rash",
		],
		related: ["eczema", "urticaria", "drug-eruptions"],
		faqs: [
			{
				q: "What is the difference between irritant and allergic contact dermatitis?",
				a: "Irritant is caused by direct damage from chemicals; allergic involves an immune response.",
			},
			{
				q: "How is contact dermatitis treated?",
				a: "Avoid the trigger, topical corticosteroids, emollients, and antihistamines for itching.",
			},
		],
		content_en: generateShortContent(
			"Contact Dermatitis",
			"inflammatory skin reaction",
			true,
		),
		content_nl: generateShortContent(
			"Contactdermatitis",
			"ontstekingsreactie van de huid",
			false,
		),
	},
	{
		slug: "urticaria",
		title_en: "Urticaria (Hives)",
		title_nl: "Urticaria (Netelroos)",
		category_en: "Inflammatory & Auto-immune",
		category_nl: "Ontstekingsziekten & Auto-immuun",
		icon: "🔥",
		order: 41,
		summary_en:
			"Raised, itchy welts on the skin appearing suddenly, often due to allergic reactions.",
		summary_nl:
			"Verheven, jeukende bulten op de huid die plotseling verschijnen, vaak door allergische reacties.",
		keywords: [
			"urticaria",
			"hives",
			"nettle rash",
			"welts",
			"allergic reaction",
		],
		related: ["angioedema", "contact-dermatitis", "drug-eruptions"],
		faqs: [
			{
				q: "What causes hives?",
				a: "Allergies to food/medications/insect stings, infections, stress, and sometimes no identifiable cause (idiopathic).",
			},
			{
				q: "How long do hives last?",
				a: "Acute hives resolve within days. Chronic hives persist >6 weeks and require medical investigation.",
			},
		],
		content_en: generateShortContent(
			"Urticaria",
			"allergic skin reaction",
			true,
		),
		content_nl: generateShortContent(
			"Urticaria (Netelroos)",
			"allergische huidreactie",
			false,
		),
	},
	{
		slug: "angioedema",
		title_en: "Angioedema",
		title_nl: "Angio-oedeem",
		category_en: "Inflammatory & Auto-immune",
		category_nl: "Ontstekingsziekten & Auto-immuun",
		icon: "🔥",
		order: 42,
		summary_en:
			"Swelling in deeper skin layers, often around eyes, lips, and throat, potentially life-threatening.",
		summary_nl:
			"Zwelling in diepere huidlagen, vaak rond ogen, lippen en keel, mogelijk levensbedreigend.",
		keywords: [
			"angioedema",
			"swelling",
			"deep tissue swelling",
			"allergic reaction",
			"hereditary angioedema",
		],
		related: ["urticaria", "drug-eruptions", "contact-dermatitis"],
		faqs: [
			{
				q: "Is angioedema an emergency?",
				a: "Yes, if involving the throat or tongue causing breathing difficulty. Seek emergency care immediately.",
			},
			{
				q: "What triggers angioedema?",
				a: "Allergies, medications (ACE inhibitors), and hereditary factors (C1 inhibitor deficiency).",
			},
		],
		content_en: generateShortContent(
			"Angioedema",
			"deep tissue swelling condition",
			true,
		),
		content_nl: generateShortContent(
			"Angio-oedeem",
			"diepe weefselzwelling",
			false,
		),
	},
	{
		slug: "drug-eruptions",
		title_en: "Drug Eruptions",
		title_nl: "Geneesmiddelenerupties",
		category_en: "Inflammatory & Auto-immune",
		category_nl: "Ontstekingsziekten & Auto-immuun",
		icon: "🔥",
		order: 43,
		summary_en:
			"Skin rashes caused by adverse reactions to medications, ranging from mild to severe.",
		summary_nl:
			"Huiduitslag veroorzaakt door bijwerkingen van medicijnen, variërend van mild tot ernstig.",
		keywords: [
			"drug eruption",
			"medication rash",
			"drug allergy",
			"morbilliform",
			"Stevens Johnson",
		],
		related: ["urticaria", "erythema-multiforme", "contact-dermatitis"],
		faqs: [
			{
				q: "What does a drug eruption look like?",
				a: "Most commonly a widespread red rash (morbilliform), but can include hives, blisters, or severe reactions.",
			},
			{
				q: "What should I do if I have a drug eruption?",
				a: "Contact your doctor. Don't stop critical medications without medical advice. Seek emergency care for severe reactions.",
			},
		],
		content_en: generateShortContent(
			"Drug Eruptions",
			"medication-induced skin reaction",
			true,
		),
		content_nl: generateShortContent(
			"Geneesmiddelenerupties",
			"medicijn-geïnduceerde huidreactie",
			false,
		),
	},
	{
		slug: "erythema-multiforme",
		title_en: "Erythema Multiforme",
		title_nl: "Erythema Multiforme",
		category_en: "Inflammatory & Auto-immune",
		category_nl: "Ontstekingsziekten & Auto-immuun",
		icon: "🔥",
		order: 44,
		summary_en:
			"An acute skin reaction with distinctive target-shaped lesions, often triggered by infections.",
		summary_nl:
			"Een acute huidreactie met kenmerkende schietschijf-vormige laesies, vaak uitgelokt door infecties.",
		keywords: [
			"erythema multiforme",
			"target lesions",
			"bullseye rash",
			"skin reaction",
			"herpes associated",
		],
		related: ["drug-eruptions", "urticaria", "cold-sores"],
		faqs: [
			{
				q: "Is erythema multiforme the same as Stevens-Johnson syndrome?",
				a: "No, EM is typically milder. SJS is a severe variant with extensive blistering and mucosal involvement.",
			},
			{
				q: "How long does erythema multiforme last?",
				a: "Usually resolves within 2-4 weeks. Recurrence is possible with recurrent triggers like herpes.",
			},
		],
		content_en: generateShortContent(
			"Erythema Multiforme",
			"acute target lesion condition",
			true,
		),
		content_nl: generateShortContent(
			"Erythema Multiforme",
			"acute huidreactie",
			false,
		),
	},
	// ======================== HAIR & NAIL DISORDERS ========================
	{
		slug: "alopecia-areata",
		title_en: "Alopecia Areata",
		title_nl: "Alopecia Areata",
		category_en: "Hair & Nail Disorders",
		category_nl: "Haar- en Nagelaandoeningen",
		icon: "💇",
		order: 45,
		summary_en:
			"An autoimmune condition causing patchy hair loss on the scalp, face, or body.",
		summary_nl:
			"Een auto-immuunziekte die pleksgewijze haaruitval op de hoofdhuid, het gezicht of lichaam veroorzaakt.",
		keywords: [
			"alopecia areata",
			"hair loss",
			"patchy baldness",
			"autoimmune hair loss",
		],
		related: ["vitiligo", "lupus-erythematosus", "lichen-planus"],
		faqs: [
			{
				q: "Will hair grow back in alopecia areata?",
				a: "Hair regrows spontaneously in many cases. Treatment can stimulate regrowth but doesn't prevent new patches.",
			},
			{
				q: "Is alopecia areata stress-related?",
				a: "Stress can trigger or worsen it, but it is primarily an autoimmune condition.",
			},
		],
		content_en: generateShortContent(
			"Alopecia Areata",
			"autoimmune hair loss condition",
			true,
		),
		content_nl: generateShortContent(
			"Alopecia Areata",
			"auto-immuun haaruitval",
			false,
		),
	},
	{
		slug: "ingrown-toenail",
		title_en: "Ingrown Toenail",
		title_nl: "Ingroeiende Teennagel",
		category_en: "Hair & Nail Disorders",
		category_nl: "Haar- en Nagelaandoeningen",
		icon: "💇",
		order: 46,
		summary_en:
			"A painful condition where the toenail grows into the surrounding skin, causing inflammation.",
		summary_nl:
			"Een pijnlijke aandoening waarbij de teennagel in de omliggende huid groeit en ontsteking veroorzaakt.",
		keywords: [
			"ingrown toenail",
			"onychocryptosis",
			"toe pain",
			"nail problems",
		],
		related: ["onychomycosis", "boils", "cellulitis"],
		faqs: [
			{
				q: "Can I treat an ingrown toenail at home?",
				a: "Mild cases can be managed with warm soaks and proper nail trimming. Severe cases need professional care.",
			},
			{
				q: "What causes ingrown toenails?",
				a: "Improper nail trimming, tight shoes, injury, and genetic nail shape.",
			},
		],
		content_en: generateShortContent(
			"Ingrown Toenail",
			"painful nail condition",
			true,
		),
		content_nl: generateShortContent(
			"Ingroeiende Teennagel",
			"pijnlijke nagelaandoening",
			false,
		),
	},
	{
		slug: "dandruff",
		title_en: "Dandruff",
		title_nl: "Roos",
		category_en: "Hair & Nail Disorders",
		category_nl: "Haar- en Nagelaandoeningen",
		icon: "💇",
		order: 47,
		summary_en:
			"A common scalp condition causing white flakes of dead skin, often with mild itching.",
		summary_nl:
			"Een veelvoorkomende hoofdhuidaandoening die witte schilfertjes dode huid veroorzaakt, vaak met milde jeuk.",
		keywords: [
			"dandruff",
			"scalp flakes",
			"seborrheic dermatitis",
			"itchy scalp",
		],
		related: ["seborrheic-dermatitis", "psoriasis", "contact-dermatitis"],
		faqs: [
			{
				q: "What causes dandruff?",
				a: "Overgrowth of Malassezia yeast on the scalp, oily skin, or dry skin. Not caused by poor hygiene.",
			},
			{
				q: "How is dandruff treated?",
				a: "Anti-dandruff shampoos with zinc pyrithione, ketoconazole, selenium sulfide, or salicylic acid.",
			},
		],
		content_en: generateShortContent(
			"Dandruff",
			"common scalp condition",
			true,
		),
		content_nl: generateShortContent(
			"Roos",
			"veelvoorkomende hoofdhuidaandoening",
			false,
		),
	},
	// ======================== ENVIRONMENTAL & PHYSICAL ========================
	{
		slug: "sunburn",
		title_en: "Sunburn",
		title_nl: "Zonnebrand",
		category_en: "Pre-Cancerous & Sun-related",
		category_nl: "Voorstadium Huidkanker & Zon-gerelateerd",
		icon: "☀️",
		order: 48,
		summary_en:
			"Acute skin damage from overexposure to UV radiation, causing redness, pain, and peeling.",
		summary_nl:
			"Acute huidbeschadiging door overmatige blootstelling aan UV-straling, met roodheid, pijn en vervelling.",
		keywords: [
			"sunburn",
			"UV damage",
			"sun exposure",
			"peeling skin",
			"sun protection",
		],
		related: ["actinic-keratosis", "polymorphous-light-eruption", "chilblains"],
		faqs: [
			{
				q: "How can I treat sunburn?",
				a: "Cool compresses, aloe vera, moisturizers, NSAIDs for pain, and hydration. Avoid further sun exposure.",
			},
			{
				q: "Does one sunburn matter?",
				a: "Yes, every sunburn increases lifetime skin cancer risk, especially blistering burns in childhood.",
			},
		],
		content_en: generateShortContent("Sunburn", "UV-induced skin damage", true),
		content_nl: generateShortContent(
			"Zonnebrand",
			"UV-geïnduceerde huidbeschadiging",
			false,
		),
	},
	{
		slug: "polymorphous-light-eruption",
		title_en: "Polymorphous Light Eruption",
		title_nl: "Polymorfe Lichenteruptie",
		category_en: "Pre-Cancerous & Sun-related",
		category_nl: "Voorstadium Huidkanker & Zon-gerelateerd",
		icon: "☀️",
		order: 49,
		summary_en:
			"An itchy rash triggered by sunlight exposure in sensitive individuals, commonly in spring.",
		summary_nl:
			"Een jeukende uitslag uitgelokt door zonlichtblootstelling bij gevoelige personen, vaak in het voorjaar.",
		keywords: [
			"polymorphous light eruption",
			"PMLE",
			"sun allergy",
			"photosensitivity",
			"spring rash",
		],
		related: ["sunburn", "urticaria", "actinic-keratosis"],
		faqs: [
			{
				q: "Is PMLE a true allergy to the sun?",
				a: "It is a hypersensitivity reaction to UV light, sometimes called sun poisoning, but not a true allergy.",
			},
			{
				q: "How can I prevent PMLE?",
				a: "Gradual sun exposure in spring, broad-spectrum sunscreen, protective clothing, and sometimes prophylactic phototherapy.",
			},
		],
		content_en: generateShortContent(
			"Polymorphous Light Eruption",
			"sun hypersensitivity condition",
			true,
		),
		content_nl: generateShortContent(
			"Polymorfe Lichenteruptie",
			"overgevoeligheid voor zonlicht",
			false,
		),
	},
	{
		slug: "chilblains",
		title_en: "Chilblains (Pernio)",
		title_nl: "Wintertenen (Perniones)",
		category_en: "Pre-Cancerous & Sun-related",
		category_nl: "Voorstadium Huidkanker & Zon-gerelateerd",
		icon: "☀️",
		order: 50,
		summary_en:
			"Painful, itchy, red-purple swellings on fingers and toes caused by exposure to cold and damp conditions.",
		summary_nl:
			"Pijnlijke, jeukende, roodpaarse zwellingen op vingers en tenen veroorzaakt door blootstelling aan kou en vocht.",
		keywords: [
			"chilblains",
			"pernio",
			"cold injury",
			"winter toes",
			"perniosis",
		],
		related: ["sunburn", "contact-dermatitis", "urticaria"],
		faqs: [
			{
				q: "How do you treat chilblains?",
				a: "Warm the affected area gradually, use corticosteroid creams, and protect from further cold exposure.",
			},
			{
				q: "Can chilblains be prevented?",
				a: "Keep extremities warm and dry, avoid rapid temperature changes, and wear insulated footwear.",
			},
		],
		content_en: generateShortContent(
			"Chilblains",
			"cold-induced skin reaction",
			true,
		),
		content_nl: generateShortContent(
			"Wintertenen",
			"koude-geïnduceerde huidreactie",
			false,
		),
	},
];

function generateShortContent(
	title: string,
	conditionType: string,
	isEnglish: boolean,
): string {
	const symptomHeading = isEnglish ? "## Symptoms" : "## Symptomen";
	const causeHeading = isEnglish
		? "## Causes & Risk Factors"
		: "## Oorzaken & Risicofactoren";
	const treatmentHeading = isEnglish
		? "## Treatment Options"
		: "## Behandelingen";
	const doctorHeading = isEnglish
		? "## When to See a Doctor"
		: "## Wanneer naar de dokter";

	const intros = isEnglish
		? `## What is ${title}?

${title} is a ${conditionType} that can cause significant concern when symptoms appear. Early recognition and proper management can make a big difference in outcomes. This article provides
 comprehensive information about symptoms, causes, and treatment options.`
		: `## Wat is ${title}?

${title} is een ${conditionType} die aanzienlijke bezorgdheid kan veroorzaken wanneer symptomen verschijnen. Vroege herkenning en juiste behandeling kunnen een groot verschil maken in de uitkomsten. Dit artikel biedt uitgebreide informatie over symptomen, oorzaken en behandelingsopties.`;

	const symptoms = isEnglish
		? "- Visible changes in skin appearance or texture\n- Itching, burning, or discomfort in the affected area\n- Redness, swelling, or inflammation\n- Possible spreading or changes over time"
		: "- Zichtbare veranderingen in huiduiterlijk of -textuur\n- Jeuk, branderigheid of ongemak op de getroffen plek\n- Roodheid, zwelling of ontsteking\n- Mogelijke verspreiding of veranderingen in de loop van de tijd";

	const causes = isEnglish
		? "- Environmental factors and exposures\n- Genetic predisposition in some cases\n- Immune system responses\n- Lifestyle and hygiene factors"
		: "- Omgevingsfactoren en blootstellingen\n- Genetische aanleg in sommige gevallen\n- Reacties van het immuunsysteem\n- Levensstijl en hygiënefactoren";

	const treatments = isEnglish
		? "### Self-Care\n- Maintain good skincare routines\n- Avoid known triggers and irritants\n- Keep the affected area clean and protected\n\n### Medical Treatments\n- Topical medications prescribed by a doctor\n- Oral medications for more severe cases\n- Professional procedures when indicated\n- Regular follow-up with a healthcare provider"
		: "### Zelfzorg\n- Onderhoud goede huidverzorgingsroutines\n- Vermijd bekende triggers en irriterende stoffen\n- Houd het getroffen gebied schoon en beschermd\n\n### Medische Behandelingen\n- Lokale medicatie voorgeschreven door een arts\n- Orale medicatie bij ernstigere gevallen\n- Professionele behandelingen wanneer aangewezen\n- Regelmatige follow-up met een zorgverlener";

	const doctor = isEnglish
		? "Consult a healthcare provider if symptoms persist, worsen, significantly impact daily life, or if you notice signs of infection such as increased redness, swelling, warmth, or pus. Early medical evaluation can prevent complications and improve outcomes."
		: "Raadpleeg een arts als de symptomen aanhouden, verergeren, het dagelijks leven aanzienlijk beïnvloeden, of als je tekenen van infectie opmerkt zoals toegenomen roodheid, zwelling, warmte of pus. Vroege medische evaluatie kan complicaties voorkomen en de uitkomsten verbeteren.";

	return [
		intros,
		symptomHeading,
		symptoms,
		causeHeading,
		causes,
		treatmentHeading,
		treatments,
		doctorHeading,
		doctor,
	].join("\n\n");
}

function writeConditionsFile(cond: Condition, lang: string) {
	const dir = path.join(contentDir, lang);
	fs.mkdirSync(dir, { recursive: true });

	const title = lang === "nl" ? cond.title_nl : cond.title_en;
	const category = lang === "nl" ? cond.category_nl : cond.category_en;
	const summary = lang === "nl" ? cond.summary_nl : cond.summary_en;
	const content = lang === "nl" ? cond.content_nl : cond.content_en;
	const seoTitle = `${title} — Hulp Bij Huid`;
	const seoDesc = summary;

	const faq = cond.faqs.map((f) => ({ q: f.q, a: f.a }));

	const fmLines: string[] = [];
	fmLines.push("---");
	fmLines.push(`title: "${cond.title_en.replace(/"/g, '\\"')}"`);
	fmLines.push(`title_nl: "${cond.title_nl.replace(/"/g, '\\"')}"`);
	fmLines.push(`slug: "${cond.slug}"`);
	fmLines.push(`category: "${cond.category_en}"`);
	fmLines.push(`category_nl: "${cond.category_nl}"`);
	fmLines.push(`order: ${cond.order}`);
	fmLines.push(`icon: "${cond.icon}"`);
	fmLines.push(`summary: "${cond.summary_en.replace(/"/g, '\\"')}"`);
	fmLines.push(`summary_nl: "${cond.summary_nl.replace(/"/g, '\\"')}"`);
	fmLines.push(`seo_title: "${seoTitle.replace(/"/g, '\\"')}"`);
	fmLines.push(`seo_description: "${seoDesc.replace(/"/g, '\\"')}"`);
	fmLines.push(`keywords: [${cond.keywords.map((k) => `"${k}"`).join(", ")}]`);
	fmLines.push(`related: [${cond.related.map((r) => `"${r}"`).join(", ")}]`);
	if (faq.length > 0) {
		fmLines.push("faq:");
		for (const f of faq) {
			fmLines.push(`  - q: "${f.q.replace(/"/g, '\\"')}"`);
			fmLines.push(`    a: "${f.a.replace(/"/g, '\\"')}"`);
		}
	} else {
		fmLines.push("faq: []");
	}
	fmLines.push("published: true");
	fmLines.push("---");

	const fm = fmLines.join("\n");
	const md = `${fm}\n\n${content}\n`;
	fs.writeFileSync(path.join(dir, `${cond.slug}.md`), md, "utf-8");
}

conditions.forEach((cond) => {
	writeConditionsFile(cond, "nl");
	writeConditionsFile(cond, "en");
});

console.log(`✅ Generated ${conditions.length} conditions in NL and EN.`);
console.log(`   NL: ${conditions.length} files in src/content/conditions/nl/`);
console.log(`   EN: ${conditions.length} files in src/content/conditions/en/`);
