"use client";

import Image from "next/image";
import Link from "next/link";
import useStore from "./(store)/store";
import { ArrowIcon, PlusIcon } from "./Icons";
import { formatCurrency, useTranslations } from "./lib/i18n";

export default function ProductDetails({ product }) {
  const addItem = useStore((state) => state.addItem);
  const { locale, t } = useTranslations();

  return (
    <main className="px-5 py-10 sm:px-8 sm:py-16">
      <div className="mx-auto w-full max-w-6xl">
        <Link
          href="/#catalog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-forest/60 hover:text-forest"
        >
          <ArrowIcon className="h-4 w-4 rotate-180" />
          {t.backToCatalog}
        </Link>

        <div className="grid overflow-hidden rounded-[2.5rem] border border-forest/10 bg-white/75 shadow-soft lg:grid-cols-2">
          <div className="relative min-h-[360px] bg-sage lg:min-h-[620px]">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <span className="grid h-full place-items-center text-8xl">🍊</span>
            )}
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-leaf">
              Fruit Shop
            </p>
            <h1 className="mt-3 font-display text-5xl font-semibold capitalize leading-none text-forest sm:text-6xl">
              {product.name}
            </h1>
            <p className="mt-6 text-lg leading-8 text-forest/60">
              {product.description}
            </p>
            <p className="mt-10 font-display text-3xl font-semibold text-forest">
              {formatCurrency(product.unitAmount, product.currency, locale)}
            </p>
            <button
              type="button"
              onClick={() => addItem(product)}
              className="button-primary mt-6 flex w-full justify-center gap-2 sm:w-auto"
            >
              <PlusIcon />
              {t.addToCart}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
