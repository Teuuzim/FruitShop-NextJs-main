import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getCatalog } from "../../lib/catalog";

const MAX_DISTINCT_ITEMS = 20;
const MAX_QUANTITY = 10;

function invalid(message) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export const POST = async (request) => {
  let body;

  try {
    body = await request.json();
  } catch {
    return invalid("Invalid JSON body");
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return invalid("The cart is empty");
  }

  if (body.items.length > MAX_DISTINCT_ITEMS) {
    return invalid("The cart contains too many products");
  }

  try {
    const catalog = await getCatalog();
    const allowedPriceIds = new Set(catalog.map((product) => product.id));
    const lineItems = [];

    for (const item of body.items) {
      const quantity = Number(item?.quantity);

      if (
        typeof item?.priceId !== "string" ||
        !allowedPriceIds.has(item.priceId) ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > MAX_QUANTITY
      ) {
        return invalid("The cart contains an invalid product or quantity");
      }

      lineItems.push({ price: item.priceId, quantity });
    }

    const secretKey = process.env.STRIPE_SECRET;
    if (!secretKey) {
      throw new Error("STRIPE_SECRET is not configured");
    }

    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.create({
      success_url: new URL("/success", request.url).toString(),
      cancel_url: new URL("/cancel", request.url).toString(),
      line_items: lineItems,
      mode: "payment",
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Unable to create Stripe checkout session", error);
    return NextResponse.json(
      { error: "Unable to start checkout" },
      { status: 500 },
    );
  }
};
