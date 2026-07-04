import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import Stripe from "stripe";

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET is not configured");
  }

  return new Stripe(secretKey);
}

function serializePrice(price) {
  const product = price.product;

  if (!product || typeof product === "string" || product.deleted) {
    return null;
  }

  return {
    id: price.id,
    name: product.name,
    description: product.description ?? "",
    image: product.images?.[0] ?? null,
    unitAmount: price.unit_amount ?? 0,
    currency: price.currency,
  };
}

export async function getCatalog() {
  "use cache";

  cacheLife({
    stale: 300,
    revalidate: 900,
    expire: 86400,
  });
  cacheTag("stripe-catalog");

  const prices = await getStripe().prices.list({
    active: true,
    type: "one_time",
    expand: ["data.product"],
    limit: 100,
  });

  return prices.data
    .map(serializePrice)
    .filter(Boolean)
    .filter((product) => product.unitAmount > 0);
}

export async function getCatalogProduct(priceId) {
  const products = await getCatalog();
  return products.find((product) => product.id === priceId) ?? null;
}
