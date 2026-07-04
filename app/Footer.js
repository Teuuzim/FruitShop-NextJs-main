"use client";

import { useTranslations } from "./lib/i18n";

export default function Footer() {
  const { t } = useTranslations();

  return (
    <footer className="border-t border-forest/10 bg-forest px-5 py-10 text-cream sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-display text-2xl font-semibold">Fruit Shop</p>
          <p className="mt-1 text-sm text-cream/60">{t.heroEyebrow}</p>
        </div>
        <a
          href="https://www.instagram.com/matheeusvaz/"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-cream/20 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-cream hover:text-forest"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
}
