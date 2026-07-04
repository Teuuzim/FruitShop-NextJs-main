import HomeContent from "./HomeContent";
import { getCatalog } from "./lib/catalog";

export default async function Home() {
  const products = await getCatalog();
  return <HomeContent products={products} />;
}
