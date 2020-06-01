import React from "react";
import { Layout } from "../components/Layout";
import { Flex, Text } from "@chakra-ui/core";
import { FlexContainer } from "../components/FlexContainer";
import { GetStaticProps } from "next";
import { Grid } from "@chakra-ui/core/dist";
import { ProductCardProps } from "../components/ProductCard";
import { fetcher } from "../utils";
import { LogoHeader } from "../components/LogoHeader";
import Head from "next/head";
import { usePagination } from "../hooks/usePagination";
import { PaginationBar } from "../components/PaginationBar";

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
  const [page, maxPage, productCards] = usePagination(props.products);
  return (
    <Layout>
      <Head>
        <title>运动商城 | 首页</title>
      </Head>
      <LogoHeader>
        <Text fontSize="5xl" color="white">
          全部商品
        </Text>
      </LogoHeader>
      <Flex as="section" justifyContent="center" backgroundColor="#F9F9F9">
        <FlexContainer padding="4rem" flexWrap={"wrap"}>
          <Grid
            width="100%"
            templateColumns="repeat(auto-fill, minmax(12em, 1fr))"
            gap={["2rem", "2rem", "5rem"]}
          >
            {productCards}
          </Grid>
          <PaginationBar page={page} maxPage={maxPage} />
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
