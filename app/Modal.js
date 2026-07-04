"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useStore from "./(store)/store";
import { CloseIcon, MinusIcon, PlusIcon } from "./Icons";
import { formatCurrency, useTranslations } from "./lib/i18n";

export default function Modal() {
  const cart = useStore((state) => state.cart);
  const closeCart = useStore((state) => state.closeCart);
  const incrementItem = useStore((state) => state.incrementItem);
  const decrementItem = useStore((state) => state.decrementItem);
  const removeItem = useStore((state) => state.removeItem);
  const emptyCart = useStore((state) => state.emptyCart);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const { locale, t } = useTranslations();

  const subtotal = cart.reduce(
    (total, item) => total + item.unitAmount * item.quantity,
    0,
  );
  const currency = cart[0]?.currency ?? "brl";

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeCart();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeCart]);

  async function checkout() {
    if (cart.length === 0 || isCheckingOut) return;

    setIsCheckingOut(true);
    setCheckoutError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((item) => ({
            priceId: item.id,
            quantity: item.quantity,
          })),
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Checkout failed");
      }

      window.location.assign(data.url);
    } catch {
      setCheckoutError(t.checkoutError);
      setIsCheckingOut(false);
    }
  }

  const portal = document.getElementById("portal");
  if (!portal) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={t.cart}>
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-forest/35 backdrop-blur-sm"
        onClick={closeCart}
        aria-label={t.continueShopping}
      />
      <aside className="drawer-enter absolute right-0 top-0 flex h-dvh w-full max-w-md flex-col bg-cream shadow-2xl">
        <div className="flex items-center justify-between border-b border-forest/10 px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-leaf">
              Fruit Shop
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-forest">
              {t.cart}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            autoFocus
            className="grid h-10 w-10 place-items-center rounded-full border border-forest/15 text-forest hover:bg-white"
            aria-label={t.continueShopping}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cart.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-sage text-4xl">
                  🍐
                </div>
                <h3 className="font-display text-2xl font-semibold text-forest">
                  {t.emptyCart}
                </h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-forest/60">
                  {t.emptyCartBody}
                </p>
                <button type="button" onClick={closeCart} className="button-primary mt-6">
                  {t.continueShopping}
                </button>
              </div>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="rounded-3xl border border-forest/10 bg-white/70 p-3"
                >
                  <div className="flex gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-sage">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="grid h-full place-items-center text-2xl">🍊</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="truncate font-semibold text-forest">{item.name}</h3>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-xs font-semibold text-forest/45 underline-offset-4 hover:text-forest hover:underline"
                        >
                          {t.remove}
                        </button>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-leaf">
                        {formatCurrency(item.unitAmount, item.currency, locale)}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="sr-only">{t.quantity}</span>
                        <div className="flex items-center rounded-full border border-forest/15 bg-cream">
                          <button
                            type="button"
                            onClick={() => decrementItem(item.id)}
                            disabled={item.quantity === 1}
                            className="grid h-8 w-8 place-items-center disabled:cursor-not-allowed disabled:opacity-30"
                            aria-label={`${t.quantity} -`}
                          >
                            <MinusIcon />
                          </button>
                          <span className="w-7 text-center text-sm font-bold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => incrementItem(item.id)}
                            disabled={item.quantity === 10}
                            className="grid h-8 w-8 place-items-center disabled:cursor-not-allowed disabled:opacity-30"
                            aria-label={`${t.quantity} +`}
                          >
                            <PlusIcon />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-forest">
                          {formatCurrency(
                            item.unitAmount * item.quantity,
                            item.currency,
                            locale,
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-forest/10 bg-white/50 px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={emptyCart}
                className="text-xs font-semibold text-forest/55 hover:text-forest"
              >
                {t.clearCart}
              </button>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider text-forest/45">{t.subtotal}</p>
                <p className="font-display text-2xl font-semibold text-forest">
                  {formatCurrency(subtotal, currency, locale)}
                </p>
              </div>
            </div>
            {checkoutError && (
              <p className="mb-3 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {checkoutError}
              </p>
            )}
            <button
              type="button"
              onClick={checkout}
              disabled={isCheckingOut}
              className="button-primary w-full disabled:cursor-wait disabled:opacity-70"
            >
              {isCheckingOut ? t.processing : t.checkout}
            </button>
          </div>
        )}
      </aside>
    </div>,
    portal,
  );
}
