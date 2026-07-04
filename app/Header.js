"use client";

import Link from "next/link";
import { useEffect } from "react";
import useStore from "./(store)/store";
import { CartIcon } from "./Icons";
import { useTranslations } from "./lib/i18n";
import Modal from "./Modal";

export default function Header() {
  const cart = useStore((state) => state.cart);
  const openModal = useStore((state) => state.openModal);
  const openCart = useStore((state) => state.openCart);
  const setLocale = useStore((state) => state.setLocale);
  const { locale, t } = useTranslations();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-forest/10 bg-cream/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-8">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label={t.brand}
          >
            <span className="grid h-10 w-10 rotate-3 place-items-center rounded-[14px] bg-forest text-xl text-cream transition-transform group-hover:-rotate-3">
              ✦
            </span>
            <span className="hidden font-display text-xl font-semibold tracking-tight text-forest sm:inline sm:text-2xl">
              Fruit Shop
            </span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-5">
            <Link
              href="/#catalog"
              className="hidden text-sm font-semibold text-forest/70 transition-colors hover:text-forest sm:block"
            >
              {t.catalog}
            </Link>

            <div
              className="flex rounded-full border border-forest/15 bg-white/70 p-1"
              aria-label={t.language}
            >
              {["pt", "en"].map((language) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => setLocale(language)}
                  className={`rounded-full px-2.5 py-1.5 text-xs font-bold uppercase transition-colors ${
                    locale === language
                      ? "bg-forest text-cream"
                      : "text-forest/55 hover:text-forest"
                  }`}
                  aria-pressed={locale === language}
                >
                  {language}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={openCart}
              className="relative grid h-11 w-11 place-items-center rounded-full bg-citrus text-forest shadow-soft transition-transform hover:-translate-y-0.5"
              aria-label={`${t.cart}: ${itemCount}`}
            >
              <CartIcon />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-forest px-1 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
      {openModal && <Modal />}
    </>
  );
}
