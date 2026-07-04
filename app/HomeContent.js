"use client";

import { ArrowIcon } from "./Icons";
import { useTranslations } from "./lib/i18n";
import ProductsCard from "./ProductsCard";

export default function HomeContent({ products }) {
  const { t } = useTranslations();

  return (
    <main>
      <section className="relative overflow-hidden px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20">
        <div className="hero-blob hero-blob-left" />
        <div className="hero-blob hero-blob-right" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-leaf">
              {t.heroEyebrow}
            </p>
            <h1 className="balance font-display text-5xl font-semibold leading-[0.98] tracking-tight text-forest sm:text-7xl">
              {t.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-forest/65 sm:text-lg">
              {t.heroBody}
            </p>
            <a href="#catalog" className="button-primary mt-8 inline-flex gap-2">
              {t.explore}
              <ArrowIcon />
            </a>
          </div>

          <div className="relative mx-auto hidden aspect-square w-full max-w-sm lg:block">
            <div className="absolute inset-8 rotate-6 rounded-[5rem] bg-citrus shadow-soft" />
            <div className="absolute inset-16 -rotate-6 rounded-[4rem] bg-leaf text-cream">
              <span className="grid h-full place-items-center text-8xl">🍊</span>
            </div>
            <span className="absolute left-2 top-16 text-6xl">🍃</span>
            <span className="absolute bottom-10 right-2 text-7xl">🍐</span>
          </div>
        </div>
      </section>

      <section id="catalog" className="scroll-mt-24 bg-mist px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-leaf">
                Fruit Shop
              </p>
              <h2 className="mt-2 font-display text-4xl font-semibold text-forest sm:text-5xl">
                {t.featured}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-forest/60 sm:text-right">
              {t.featuredBody}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <ProductsCard
                key={product.id}
                product={product}
                preload={index === 0}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
