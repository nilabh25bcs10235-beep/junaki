import { products } from "@/lib/mock/data";
import { ProductCard } from "@/components/system/ProductCard";
import { GlassSurface } from "@/components/system/GlassSurface";
import { SliderDemoBudget } from "@/components/shop/BudgetFilter";

export default function ShopPage() {
  return (
    <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-10 px-5 py-10 sm:px-8">
      <div>
        <h1 className="font-display text-4xl text-[var(--junaki-rose-50)]">
          Shop
        </h1>
        <p className="mt-2 max-w-xl text-[var(--junaki-muted)]">
          Curated pieces with star ratings and verified buyer media reviews.
        </p>
      </div>

      <GlassSurface variant="panel" className="p-5">
        <SliderDemoBudget />
      </GlassSurface>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            price={p.price}
            category={p.category}
            rating={p.rating}
            imageTone={p.imageTone}
          />
        ))}
      </div>

      <p className="text-center text-sm text-[var(--junaki-muted)]">
        Open a product for full details, sizes, and verified photo/video
        reviews.
      </p>
    </main>
  );
}
