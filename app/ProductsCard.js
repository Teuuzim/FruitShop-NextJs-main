"use client";

import Image from "next/image";
import Link from "next/link";
import useStore from "./(store)/store";
import { ArrowIcon, PlusIcon } from "./Icons";
import { formatCurrency, useTranslations } from "./lib/i18n";

export default function ProductsCard({ product, preload = false }) {
  const addItem = useStore((state) => state.addItem);
  const { locale, t } = useTranslations();

  return (
    <article className="product-card group overflow-hidden rounded-[2rem] border border-forest/10 bg-white/75 shadow-soft">
      <Link
        href={`/product/${product.id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-sage"
        aria-label={`${t.viewProduct}: ${product.name}`}
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            preload={preload}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="grid h-full place-items-center text-6xl">🍊</span>
        )}
        <span className="absolute right-4 top-4 rounded-full bg-cream/90 px-3 py-1.5 text-xs font-bold text-forest backdrop-blur">
          {formatCurrency(product.unitAmount, product.currency, locale)}
        </span>
      </Link>

      <div className="p-5">
        <Link href={`/product/${product.id}`} className="block">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-semibold capitalize text-forest">
                {product.name}
              </h3>
              <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-forest/55">
                {product.description}
              </p>
            </div>
            <ArrowIcon className="mt-2 h-5 w-5 shrink-0 text-leaf transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
        <button
          type="button"
          onClick={() => addItem(product)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-leaf"
        >
          <PlusIcon />
          {t.addToCart}
        </button>
      </div>
    </article>
  );
}
