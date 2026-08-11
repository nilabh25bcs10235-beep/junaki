export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  reviewCount: number;
  imageTone: string;
  gallery: string[];
  description: string;
  details: string[];
  materials: string;
  care: string;
  sizes: string[];
  colors: { name: string; swatch: string }[];
  tags: string[];
  inStock: boolean;
};

export type ReviewMedia = {
  type: "image" | "video";
  /** CSS gradient stand-in until real storage (Supabase) is wired */
  tone: string;
  label: string;
};

export type Review = {
  id: string;
  productId: string;
  author: string;
  rating: number;
  body: string;
  date: string;
  verifiedBuyer: boolean;
  media: ReviewMedia[];
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Blush Merino Coat",
    price: 248,
    category: "Outerwear",
    rating: 5,
    reviewCount: 2,
    imageTone: "from-rose-400/50 to-rose-900/80",
    gallery: [
      "from-rose-300/55 via-rose-500/45 to-rose-950/90",
      "from-rose-200/40 via-stone-400/30 to-rose-900/85",
      "from-orange-200/35 via-rose-400/40 to-stone-900/90",
    ],
    description:
      "A soft-structure merino coat cut for layering. Light enough for transit, polished enough for dinner — the Junaki silhouette in blush.",
    details: [
      "Relaxed shoulder with clean front placket",
      "Hidden side pockets",
      "Knee length · easy drape",
      "Unlined for breathable warmth",
    ],
    materials: "80% merino wool, 20% recycled nylon",
    care: "Dry clean or cold hand wash · reshape flat",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Blush", swatch: "#f43f5e" },
      { name: "Wine", swatch: "#881337" },
      { name: "Sand", swatch: "#d6b89c" },
    ],
    tags: ["minimal", "layering", "work"],
    inStock: true,
  },
  {
    id: "p2",
    name: "Crimson Silk Scarf",
    price: 68,
    category: "Accessories",
    rating: 4,
    reviewCount: 1,
    imageTone: "from-rose-500/60 to-purple-950/80",
    gallery: [
      "from-rose-500/60 via-fuchsia-700/40 to-purple-950/90",
      "from-red-400/50 via-rose-800/50 to-stone-950/90",
    ],
    description:
      "Hand-rolled silk with a liquid crimson gradient. Ties as a neck scarf, bag charm, or hair wrap.",
    details: [
      "90 × 90 cm square",
      "Hand-rolled edges",
      "Weightless drape",
    ],
    materials: "100% mulberry silk",
    care: "Dry clean only",
    sizes: ["One size"],
    colors: [
      { name: "Crimson", swatch: "#be123c" },
      { name: "Berry", swatch: "#9f1239" },
    ],
    tags: ["gift", "accent", "romantic"],
    inStock: true,
  },
  {
    id: "p3",
    name: "Ocean Linen Set",
    price: 186,
    category: "Ready-to-wear",
    rating: 5,
    reviewCount: 1,
    imageTone: "from-sky-400/45 to-slate-900/80",
    gallery: [
      "from-sky-300/50 via-cyan-600/40 to-slate-950/90",
      "from-teal-200/35 via-blue-700/45 to-slate-900/90",
      "from-cyan-100/30 via-sky-500/35 to-indigo-950/90",
    ],
    description:
      "Two-piece linen set in cool ocean tones. Breathable, travel-ready, and sharp enough for warm evenings.",
    details: [
      "Matching top + wide trousers",
      "Mother-of-pearl buttons",
      "Elastic back waist",
      "Sold as a set",
    ],
    materials: "100% European flax linen",
    care: "Machine wash cold · hang dry",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Ocean", swatch: "#0ea5e9" },
      { name: "Foam", swatch: "#bae6fd" },
      { name: "Ink", swatch: "#0f172a" },
    ],
    tags: ["summer", "set", "travel"],
    inStock: true,
  },
  {
    id: "p4",
    name: "Moss Glass Earrings",
    price: 92,
    category: "Jewelry",
    rating: 4,
    reviewCount: 0,
    imageTone: "from-emerald-400/40 to-emerald-950/80",
    gallery: [
      "from-emerald-300/45 via-green-700/40 to-emerald-950/90",
      "from-lime-200/30 via-teal-700/40 to-stone-950/90",
    ],
    description:
      "Sculpted glass drops in moss green with a frosted liquid edge. Lightweight posts for all-day wear.",
    details: [
      "Hypoallergenic posts",
      "Approx. 4.5 cm drop",
      "Handmade glass",
    ],
    materials: "Glass, sterling silver posts",
    care: "Wipe with soft cloth · avoid impact",
    sizes: ["One size"],
    colors: [
      { name: "Moss", swatch: "#16a34a" },
      { name: "Fern", swatch: "#4ade80" },
    ],
    tags: ["jewelry", "gift", "weekend"],
    inStock: true,
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "p1",
    author: "Jules Park",
    rating: 5,
    body: "Fabric feels expensive and the cut is forgiving. Instant wardrobe staple — posting the unboxing and a try-on clip.",
    date: "2d ago",
    verifiedBuyer: true,
    media: [
      { type: "image", tone: "from-rose-300/50 to-rose-800/70", label: "Unboxing" },
      { type: "video", tone: "from-rose-500/40 to-stone-900/80", label: "Try-on" },
    ],
  },
  {
    id: "r2",
    productId: "p1",
    author: "Ren Okada",
    rating: 4,
    body: "Slightly long in the sleeve — still wearing it weekly.",
    date: "1w ago",
    verifiedBuyer: true,
    media: [
      { type: "image", tone: "from-orange-300/40 to-rose-900/70", label: "Fit check" },
    ],
  },
  {
    id: "r3",
    productId: "p3",
    author: "Mira Sol",
    rating: 5,
    body: "Breathable linen with that soft ocean drape. Verified purchase — short walk-around video attached.",
    date: "3d ago",
    verifiedBuyer: true,
    media: [
      { type: "video", tone: "from-cyan-400/40 to-blue-950/80", label: "Walk-around" },
      { type: "image", tone: "from-sky-200/40 to-indigo-900/70", label: "Detail" },
    ],
  },
  {
    id: "r4",
    productId: "p2",
    author: "Guest",
    rating: 3,
    body: "Pretty color. Waiting on my order to post photos.",
    date: "5d ago",
    verifiedBuyer: false,
    media: [],
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductReviews(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export function getRelatedProducts(productId: string, limit = 3): Product[] {
  const current = getProduct(productId);
  if (!current) return products.slice(0, limit);
  return products
    .filter((p) => p.id !== productId)
    .sort((a, b) => {
      const aScore = a.category === current.category ? 2 : 0;
      const bScore = b.category === current.category ? 2 : 0;
      const aTag = a.tags.some((t) => current.tags.includes(t)) ? 1 : 0;
      const bTag = b.tags.some((t) => current.tags.includes(t)) ? 1 : 0;
      return bScore + bTag - (aScore + aTag);
    })
    .slice(0, limit);
}

export function averageRating(productId: string): number {
  const list = getProductReviews(productId);
  if (!list.length) {
    return getProduct(productId)?.rating ?? 0;
  }
  return list.reduce((s, r) => s + r.rating, 0) / list.length;
}
