// ============================================================
// THULIR ORGANICS — Recommendation Engine
// Concerns & Mappings
// ============================================================
// This file defines all possible concerns and maps them to
// product tags/categories. Future AI integration point:
// Replace the keyword matching with LLM-extracted JSON
// that returns an array of concern IDs.
// ============================================================

export type ConcernCategory = 'SKIN' | 'HAIR' | 'WELLNESS';

export interface Concern {
  id: string;
  label: string;
  description: string;
  category: ConcernCategory;
  relatedTags: string[];
  relatedProductIds?: string[];
}

export const skinConcerns: Concern[] = [
  {
    id: 'dullness',
    label: 'Dull-Looking Skin',
    description: 'Skin that looks less bright or lacks radiance in your daily routine.',
    category: 'SKIN',
    relatedTags: ['dullness', 'glow', 'brightening-routine', 'botanical'],
  },
  {
    id: 'uneven-texture',
    label: 'Uneven-Looking Skin',
    description: 'Skin that appears uneven in tone or texture.',
    category: 'SKIN',
    relatedTags: ['uneven-texture', 'dullness', 'face-pack', 'serum'],
  },
  {
    id: 'excess-oil',
    label: 'Excess Oil',
    description: 'Skin that feels oily or looks shiny throughout the day.',
    category: 'SKIN',
    relatedTags: ['oil-control', 'clay', 'neem', 'turmeric'],
  },
  {
    id: 'dryness',
    label: 'Dryness',
    description: 'Skin that feels dry, tight or lacks moisture.',
    category: 'SKIN',
    relatedTags: ['hydration', 'nourishing', 'moisturising', 'aloe-vera'],
  },
  {
    id: 'general-skincare',
    label: 'General Skin Care',
    description: 'Looking to build or improve a simple everyday skincare routine.',
    category: 'SKIN',
    relatedTags: ['everyday', 'versatile', 'general-skincare', 'routine'],
  },
  {
    id: 'tan-appearance',
    label: 'Tan / Dull Appearance',
    description: 'Skin that looks tan or darker from sun exposure.',
    category: 'SKIN',
    relatedTags: ['detan', 'dullness', 'tan', 'brightening-routine'],
  },
  {
    id: 'cleansing',
    label: 'Need for Cleansing',
    description: 'Looking for a natural way to cleanse the skin.',
    category: 'SKIN',
    relatedTags: ['cleansing', 'bathing', 'face-wash', 'soap'],
  },
  {
    id: 'hydration',
    label: 'Hydration',
    description: 'Looking to add more hydration to your skin routine.',
    category: 'SKIN',
    relatedTags: ['hydration', 'aloe-vera', 'rosewater', 'gel'],
  },
  {
    id: 'glow-routine',
    label: 'Glow-Focused Routine',
    description: 'Looking to build a routine focused on natural-looking radiance.',
    category: 'SKIN',
    relatedTags: ['glow', 'glow-routine', 'botanical', 'serum'],
  },
];

export const hairConcerns: Concern[] = [
  {
    id: 'dry-hair',
    label: 'Dry Hair',
    description: 'Hair that feels dry, rough, or lacks moisture.',
    category: 'HAIR',
    relatedTags: ['dry-hair', 'hair-conditioning', 'nourishing'],
  },
  {
    id: 'rough-hair',
    label: 'Rough Hair',
    description: 'Hair that feels rough or lacks smoothness.',
    category: 'HAIR',
    relatedTags: ['rough-hair', 'hair-conditioning', 'hair-pack'],
  },
  {
    id: 'hair-care-routine',
    label: 'Hair Care Routine',
    description: 'Looking to build a simple regular hair care routine.',
    category: 'HAIR',
    relatedTags: ['hair-care-routine', 'hair', 'scalp', 'everyday'],
  },
  {
    id: 'scalp-cleansing',
    label: 'Scalp Cleansing',
    description: 'Looking for a natural scalp cleansing option.',
    category: 'HAIR',
    relatedTags: ['scalp-cleansing', 'scalp', 'hair-wash', 'natural-cleanser'],
  },
  {
    id: 'traditional-hair-care',
    label: 'Traditional Hair Care',
    description: 'Interested in traditional South Indian / Ayurvedic hair care methods.',
    category: 'HAIR',
    relatedTags: ['traditional', 'ayurvedic', 'south-indian', 'hair'],
  },
  {
    id: 'hair-conditioning',
    label: 'Hair Conditioning',
    description: 'Looking to add a conditioning treatment to a hair routine.',
    category: 'HAIR',
    relatedTags: ['hair-conditioning', 'conditioning', 'treatment', 'hair-pack'],
  },
  {
    id: 'hair-colour-care',
    label: 'Hair Colour',
    description: 'Looking for a natural approach to hair colouring.',
    category: 'HAIR',
    relatedTags: ['hair-dye', 'hair-colour', 'botanical', 'natural'],
  },
];

export const wellnessConcerns: Concern[] = [
  {
    id: 'everyday-routine',
    label: 'Everyday Wellness Routine',
    description: 'Looking to build a simple daily personal care routine using natural products.',
    category: 'WELLNESS',
    relatedTags: ['everyday', 'versatile', 'routine', 'natural'],
  },
  {
    id: 'natural-bathing',
    label: 'Natural Bathing Ritual',
    description: 'Interested in traditional or natural bathing alternatives.',
    category: 'WELLNESS',
    relatedTags: ['bathing', 'traditional', 'south-indian', 'ayurvedic'],
  },
  {
    id: 'body-care',
    label: 'Body Care',
    description: 'Looking for body care products as part of a wellness routine.',
    category: 'WELLNESS',
    relatedTags: ['body', 'hands', 'legs', 'bathing'],
  },
  {
    id: 'lip-care',
    label: 'Lip Care',
    description: 'Looking for a natural lip care product.',
    category: 'WELLNESS',
    relatedTags: ['lip-balm', 'lips', 'moisturising'],
  },
];

export const allConcerns = [...skinConcerns, ...hairConcerns, ...wellnessConcerns];

// ─── Keyword → Concern Mapping ────────────────────────────
// Used by the free-text recommendation engine.
// Maps normalized keywords to concern IDs.
export const keywordToConcernMap: Record<string, string[]> = {
  // Skin-related
  dull: ['dullness', 'glow-routine'],
  dark: ['dullness', 'tan-appearance'],
  tan: ['tan-appearance', 'dullness'],
  bright: ['glow-routine', 'dullness'],
  glow: ['glow-routine', 'dullness'],
  radiant: ['glow-routine'],
  uneven: ['uneven-texture'],
  rough: ['uneven-texture', 'rough-hair'],
  texture: ['uneven-texture'],
  oily: ['excess-oil'],
  oil: ['excess-oil'],
  shiny: ['excess-oil'],
  greasy: ['excess-oil'],
  dry: ['dryness', 'dry-hair'],
  flaky: ['dryness'],
  tight: ['dryness'],
  moisture: ['hydration', 'dryness'],
  hydrat: ['hydration'],
  cleanse: ['cleansing'],
  clean: ['cleansing'],
  wash: ['cleansing', 'scalp-cleansing'],
  scrub: ['cleansing'],
  // Hair
  hair: ['hair-care-routine'],
  scalp: ['scalp-cleansing'],
  dandruff: ['scalp-cleansing'],
  frizz: ['rough-hair', 'dry-hair'],
  conditi: ['hair-conditioning'],
  colour: ['hair-colour-care'],
  color: ['hair-colour-care'],
  dye: ['hair-colour-care'],
  // General
  natural: ['general-skincare', 'hair-care-routine', 'traditional-hair-care'],
  ayurved: ['traditional-hair-care', 'general-skincare'],
  tradition: ['traditional-hair-care', 'natural-bathing'],
  bath: ['natural-bathing', 'cleansing'],
  body: ['body-care'],
  lip: ['lip-care'],
  skin: ['general-skincare'],
  routine: ['general-skincare', 'hair-care-routine', 'everyday-routine'],
};
