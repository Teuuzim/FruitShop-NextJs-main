"use client";

import Link from "next/link";
import { useEffect } from "react";
import useStore from "./(store)/store";
import { AlertIcon, CheckIcon } from "./Icons";
import { useTranslations } from "./lib/i18n";

export default function ResultPage({ type }) {
  const emptyCart = useStore((state) => state.emptyCart);
  const { t } = useTranslations();
  const isSuccess = type === "success";

  useEffect(() => {
    if (isSuccess) emptyCart();
  }, [emptyCart, isSuccess]);

  return (
    <main className="grid min-h-[70vh] place-items-center px-5 py-16">
      <div className="w-full max-w-lg rounded-[2.5rem] border border-forest/10 bg-white/70 p-8 text-center shadow-soft sm:p-12">
        <div
          className={`mx-auto grid h-20 w-20 place-items-center rounded-full ${
            isSuccess ? "bg-sage text-leaf" : "bg-orange-100 text-orange-700"
          }`}
        >
          {isSuccess ? <CheckIcon /> : <AlertIcon />}
        </div>
        <h1 className="mt-7 font-display text-4xl font-semibold text-forest">
          {isSuccess ? t.successTitle : t.cancelTitle}
        </h1>
        <p className="mt-3 leading-7 text-forest/60">
          {isSuccess ? t.successBody : t.cancelBody}
        </p>
        <Link href="/" className="button-primary mt-8 inline-flex">
          {t.goHome}
        </Link>
      </div>
    </main>
  );
}
