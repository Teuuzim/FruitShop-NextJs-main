"use client";

import { useTranslations } from "./lib/i18n";

export default function ErrorPage({ reset }) {
  const { t } = useTranslations();

  return (
    <main className="grid min-h-[60vh] place-items-center px-5 text-center">
      <div>
        <p className="text-5xl">🍋</p>
        <h1 className="mt-5 font-display text-3xl font-semibold text-forest">
          {t.unexpectedError}
        </h1>
        <button type="button" onClick={reset} className="button-primary mt-6">
          {t.tryAgain}
        </button>
      </div>
    </main>
  );
}
