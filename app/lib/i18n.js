"use client";

import useStore from "../(store)/store";

const dictionaries = {
  pt: {
    brand: "Fruit Shop",
    catalog: "Catálogo",
    language: "Idioma",
    heroEyebrow: "Fresco, simples e direto",
    heroTitle: "Frutas selecionadas para uma rotina mais leve.",
    heroBody:
      "Uma experiência de compra rápida, com produtos frescos e checkout seguro.",
    explore: "Explorar produtos",
    featured: "Seleção da estação",
    featuredBody: "Escolha seus favoritos e adicione ao carrinho em um toque.",
    addToCart: "Adicionar",
    viewProduct: "Ver produto",
    backToCatalog: "Voltar ao catálogo",
    cart: "Seu carrinho",
    emptyCart: "Seu carrinho ainda está vazio.",
    emptyCartBody: "Adicione frutas frescas para começar.",
    continueShopping: "Continuar comprando",
    quantity: "Quantidade",
    remove: "Remover",
    clearCart: "Esvaziar carrinho",
    subtotal: "Subtotal",
    checkout: "Ir para o checkout",
    processing: "Preparando checkout...",
    checkoutError:
      "Não foi possível iniciar o checkout. Tente novamente em instantes.",
    successTitle: "Pedido confirmado",
    successBody: "O pagamento de teste foi concluído com sucesso.",
    cancelTitle: "Checkout cancelado",
    cancelBody: "Seu carrinho continua salvo caso queira tentar novamente.",
    goHome: "Voltar para a loja",
    loading: "Carregando produtos...",
    unexpectedError: "Algo deu errado ao carregar a loja.",
    tryAgain: "Tentar novamente",
  },
  en: {
    brand: "Fruit Shop",
    catalog: "Catalog",
    language: "Language",
    heroEyebrow: "Fresh, simple and direct",
    heroTitle: "Selected fruit for a lighter everyday routine.",
    heroBody:
      "A fast shopping experience with fresh products and secure checkout.",
    explore: "Explore products",
    featured: "Seasonal selection",
    featuredBody: "Choose your favorites and add them to your cart in one tap.",
    addToCart: "Add to cart",
    viewProduct: "View product",
    backToCatalog: "Back to catalog",
    cart: "Your cart",
    emptyCart: "Your cart is still empty.",
    emptyCartBody: "Add some fresh fruit to get started.",
    continueShopping: "Continue shopping",
    quantity: "Quantity",
    remove: "Remove",
    clearCart: "Clear cart",
    subtotal: "Subtotal",
    checkout: "Go to checkout",
    processing: "Preparing checkout...",
    checkoutError: "Checkout could not be started. Please try again shortly.",
    successTitle: "Order confirmed",
    successBody: "Your test payment was completed successfully.",
    cancelTitle: "Checkout canceled",
    cancelBody: "Your cart is still saved if you want to try again.",
    goHome: "Back to the store",
    loading: "Loading products...",
    unexpectedError: "Something went wrong while loading the store.",
    tryAgain: "Try again",
  },
};

export function useTranslations() {
  const locale = useStore((state) => state.locale);
  return { locale, t: dictionaries[locale] };
}

export function formatCurrency(amount, currency, locale) {
  return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}
