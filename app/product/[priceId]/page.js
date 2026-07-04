import { notFound } from "next/navigation";
import ProductDetails from "../../ProductDetails";
import { getCatalogProduct } from "../../lib/catalog";

export default async function ProductPage({ params }) {
  const { priceId } = await params;
  const product = await getCatalogProduct(priceId);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
