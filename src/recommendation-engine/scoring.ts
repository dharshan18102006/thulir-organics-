// ============================================================
// THULIR ORGANICS — Recommendation Scoring Engine
// ============================================================
// Transparent rule-based scoring.
// Architecture is AI-ready: getRecommendations() can be
// replaced with an LLM call that returns structured JSON
// matching the same output interface.
// ============================================================

import { Product, getAvailableProducts, SkinType, HairType } from '@/data/products';
import { keywordToConcernMap, allConcerns } from './concerns';

export interface RecommendationInput {
  category: 'SKIN' | 'HAIR' | 'WELLNESS' | null;
  selectedConcerns: string[];     // concern IDs
  skinType?: string;
  hairType?: string;
  freeText?: string;
}

export interface ScoredProduct {
  product: Product;
  score: number;
  matchReasons: string[];
}

export interface RecommendationOutput {
  primary: ScoredProduct | null;
  alternatives: ScoredProduct[];
  complementary: Product[];
  matchedConcerns: string[];
  inputSummary: string;
}

// ─── Scoring weights ──────────────────────────────────────
const WEIGHTS = {
  CONCERN_MATCH: 5,
  CATEGORY_MATCH: 3,
  SKIN_TYPE_MATCH: 2,
  HAIR_TYPE_MATCH: 2,
  FREE_TEXT_CONCERN_MATCH: 4,
  COMPLEMENTARY_BONUS: 1,
  FEATURED_BONUS: 0.5,
};

// ─── Normalise text for keyword extraction ────────────────
function normaliseText(text: string): string {
  return text.toLowerCase().replace(/[^a-z\s]/g, ' ');
}

// ─── Extract concern IDs from free-text ──────────────────
export function extractConcernsFromText(text: string): string[] {
  const normalised = normaliseText(text);
  const words = normalised.split(/\s+/);
  const matchedConcerns = new Set<string>();

  for (const word of words) {
    for (const [keyword, concernIds] of Object.entries(keywordToConcernMap)) {
      if (word.includes(keyword) || keyword.includes(word)) {
        concernIds.forEach((id) => matchedConcerns.add(id));
      }
    }
  }

  return Array.from(matchedConcerns);
}

// ─── Score a single product ───────────────────────────────
function scoreProduct(
  product: Product,
  input: RecommendationInput,
  allConcernIds: string[]
): ScoredProduct {
  let score = 0;
  const matchReasons: string[] = [];

  // 1. Category match
  const categoryProductMap: Record<string, string[]> = {
    SKIN: ['SKINCARE', 'FACE_SERUMS', 'OILS', 'ROSEWATER', 'LIPCARE', 'FACE_GELS', 'SOAPS', 'CREAMS_CLEANSERS'],
    HAIR: ['HAIRCARE', 'OILS'],
    WELLNESS: ['SOAPS', 'BODYCARE', 'ROSEWATER', 'LIPCARE'],
  };

  if (input.category && categoryProductMap[input.category]?.includes(product.category)) {
    score += WEIGHTS.CATEGORY_MATCH;
    matchReasons.push(`Suits your ${input.category.toLowerCase()} care interest`);
  }

  // 2. Concern match (selected by user)
  let concernMatchCount = 0;
  for (const concernId of allConcernIds) {
    if (product.suitableConcerns.includes(concernId)) {
      score += WEIGHTS.CONCERN_MATCH;
      concernMatchCount++;
    }
    // Tag-based concern match
    const concern = allConcerns.find((c) => c.id === concernId);
    if (concern) {
      for (const tag of concern.relatedTags) {
        if (product.tags.includes(tag)) {
          score += 1;
          break;
        }
      }
    }
  }
  if (concernMatchCount > 0) {
    const concernLabels = allConcernIds
      .filter((id) => product.suitableConcerns.includes(id))
      .map((id) => allConcerns.find((c) => c.id === id)?.label)
      .filter(Boolean);
    if (concernLabels.length > 0) {
      matchReasons.push(`Suitable for: ${concernLabels.join(', ')}`);
    }
  }

  // 3. Skin type match
  if (input.skinType && input.skinType !== 'all') {
    if (product.skinTypes.includes(input.skinType as SkinType) || product.skinTypes.includes('all')) {
      score += WEIGHTS.SKIN_TYPE_MATCH;
      matchReasons.push(`Suitable for ${input.skinType} skin`);
    }
  }

  // 4. Hair type match
  if (input.hairType && input.hairType !== 'all') {
    if (product.hairTypes.includes(input.hairType as HairType) || product.hairTypes.includes('all')) {
      score += WEIGHTS.HAIR_TYPE_MATCH;
      matchReasons.push(`Suitable for ${input.hairType} hair`);
    }
  }

  // 5. Featured bonus
  if (product.featured) {
    score += WEIGHTS.FEATURED_BONUS;
  }

  return { product, score, matchReasons };
}

// ─── Main recommendation function ────────────────────────
export function getRecommendations(input: RecommendationInput): RecommendationOutput {
  const available = getAvailableProducts();

  // Merge manually selected concerns + free-text extracted concerns
  const textConcerns = input.freeText ? extractConcernsFromText(input.freeText) : [];
  const allConcernIds = Array.from(new Set([...input.selectedConcerns, ...textConcerns]));

  // Score all available products
  const scored: ScoredProduct[] = available
    .map((p) => scoreProduct(p, input, allConcernIds))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const primary = scored[0] || null;
  const alternatives = scored.slice(1, 4);

  // Complementary products from primary product's list
  const complementary: Product[] = [];
  if (primary) {
    for (const complementaryId of primary.product.complementaryProducts) {
      const cp = available.find((p) => p.id === complementaryId);
      if (cp && cp.id !== primary.product.id) {
        complementary.push(cp);
      }
      if (complementary.length >= 3) break;
    }
  }

  // Build input summary for display
  const concernLabels = allConcernIds
    .map((id) => allConcerns.find((c) => c.id === id)?.label)
    .filter(Boolean);

  const inputSummary = [
    input.category ? `Area: ${input.category}` : '',
    concernLabels.length > 0 ? `Concerns: ${concernLabels.join(', ')}` : '',
    input.skinType ? `Skin type: ${input.skinType}` : '',
    input.hairType ? `Hair type: ${input.hairType}` : '',
    input.freeText ? `You described: "${input.freeText}"` : '',
  ]
    .filter(Boolean)
    .join(' · ');

  return {
    primary,
    alternatives,
    complementary,
    matchedConcerns: allConcernIds,
    inputSummary,
  };
}
