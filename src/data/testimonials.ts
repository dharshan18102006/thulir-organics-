// ============================================================
// THULIR ORGANICS — Testimonials Data
// ============================================================
// IMPORTANT: These are placeholder testimonials.
// Replace with actual verified customer testimonials before publishing.
// Do NOT publish placeholder content.
// ============================================================

export interface Testimonial {
  id: string;
  name: string;           // "[CUSTOMER NAME]" — replace with real names
  location: string;
  product: string;
  productId: string;
  quote: string;
  rating: number;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: '[CUSTOMER NAME — PLACEHOLDER]',
    location: 'Chennai, Tamil Nadu',
    product: 'Nalangu Maavu',
    productId: 'nalangu-maavu',
    quote: '[CUSTOMER TESTIMONIAL — to be replaced with a real verified customer review before publishing]',
    rating: 5,
    date: '[DATE]',
  },
  {
    id: 't2',
    name: '[CUSTOMER NAME — PLACEHOLDER]',
    location: 'Coimbatore, Tamil Nadu',
    product: 'Shikakai Powder',
    productId: 'shikakai-powder',
    quote: '[CUSTOMER TESTIMONIAL — to be replaced with a real verified customer review before publishing]',
    rating: 5,
    date: '[DATE]',
  },
  {
    id: 't3',
    name: '[CUSTOMER NAME — PLACEHOLDER]',
    location: 'Madurai, Tamil Nadu',
    product: 'Kumkumadi Oil',
    productId: 'kumkumadi-oil',
    quote: '[CUSTOMER TESTIMONIAL — to be replaced with a real verified customer review before publishing]',
    rating: 5,
    date: '[DATE]',
  },
];
