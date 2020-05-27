import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Flex, Box } from "@chakra-ui/core";
import { FlexContainer } from "../components/FlexContainer";
import { GetStaticProps } from "next";
import { Grid } from "@chakra-ui/core/dist";
import { ProductCard, ProductCardProps } from "../components/ProductCard";
import { fetcher } from "../utils";
import { useRouter } from "next/router";

const query = `
{
  allProducts{
    data{
      _id
      name
      image
      price
    }
  }
}
`;
type queryResult = {
  allProducts: {
    data: Array<ProductCardProps>;
  };
};

type IndexProps = {
  products: Array<ProductCardProps>;
};

const Index: React.FC<IndexProps> = (props) => {
  const router = useRouter();
  const { p } = router.query;
  let productCards: Array<JSX.Element>;
  let page: number;
  if (typeof p === "string") {
    page = parseInt(p) || 1;
  } else {
    page = 1;
  }
  const maxPage = Math.ceil(props.products.length / 8);
  if (page <= maxPage) {
    productCards = props.products
      .slice((page - 1) * 8, page * 8)
      .map((cardProps) => <ProductCard key={cardProps._id} {...cardProps} />);
  } else {
    productCards = props.products
      .slice(0, 8)
      .map((cardProps) => <ProductCard key={cardProps._id} {...cardProps} />);
  }
  return (
    <Layout>
      <Flex as="section" justifyContent="center" backgroundColor="#F9F9F9">
        <FlexContainer padding="1rem">
          <Grid
            width="100%"
            templateColumns="repeat(auto-fill, minmax(12em, 1fr))"
            gap={["2rem", "2rem", "5rem"]}
          >
            {productCards}
          </Grid>
        </FlexContainer>
      </Flex>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetcher<queryResult>(query);
  const products = res.allProducts.data;
  return {
    props: { products },
  };
};

export default Index;
