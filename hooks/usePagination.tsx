import React from "react";
import { useRouter } from "next/router";
import { ProductCard, ProductCardProps } from "../components/ProductCard";

export const usePagination = (
  products: Array<ProductCardProps>
): [number, number, Array<JSX.Element>] => {
  const router = useRouter();
  const { p } = router.query;
  let productCards: Array<JSX.Element>;
  let page: number;
  if (typeof p === "string") {
    page = parseInt(p) || 1;
  } else {
    page = 1;
  }
  const maxPage = Math.ceil(products.length / 8);
  if (page <= maxPage) {
    productCards = products
      .slice((page - 1) * 8, page * 8)
      .map((cardProps) => <ProductCard key={cardProps._id} {...cardProps} />);
  } else {
    productCards = products
      .slice(0, 8)
      .map((cardProps) => <ProductCard key={cardProps._id} {...cardProps} />);
  }
  return [page, maxPage, productCards];
};
