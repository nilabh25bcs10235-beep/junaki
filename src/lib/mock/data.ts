export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  imageTone: string;
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
    imageTone: "from-rose-400/50 to-rose-900/80",
  },
  {
    id: "p2",
    name: "Crimson Silk Scarf",
    price: 68,
    category: "Accessories",
    rating: 4,
    imageTone: "from-rose-500/60 to-purple-950/80",
  },
  {
    id: "p3",
    name: "Ocean Linen Set",
    price: 186,
    category: "Ready-to-wear",
    rating: 5,
    imageTone: "from-sky-400/45 to-slate-900/80",
  },
  {
    id: "p4",
    name: "Moss Glass Earrings",
    price: 92,
    category: "Jewelry",
    rating: 4,
    imageTone: "from-emerald-400/40 to-emerald-950/80",
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
