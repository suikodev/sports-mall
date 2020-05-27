import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { Flex, Box, IconButton, Text } from "@chakra-ui/core";
import { FlexContainer } from "../../components/FlexContainer";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { Grid } from "@chakra-ui/core/dist";
import { ProductCard, ProductCardProps } from "../../components/ProductCard";
import { fetcher } from "../../utils";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { LogoHeader } from "../../components/LogoHeader";
import Head from "next/head";
import { IoMdList } from "react-icons/io";

const query = `
query($name:String!){
  searchProductsByName(name:$name){
    _id
    name
    image
    price
  }
}
`;
type queryResult = {
  searchProductsByName: Array<ProductCardProps>;
};

type SearchPageProps = {
  products: Array<ProductCardProps>;
  name: string;
};

const SearchPage: React.FC<SearchPageProps> = (props) => {
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
      <Head>
        <title>运动商城 | {props.name}</title>
      </Head>
      <LogoHeader>
        <Box as={IoMdList} color="white" fontSize="6xl" />
        <Text fontSize="5xl" color="white">
          {props.name}
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
          <Flex
            width="100%"
            justifyContent="center"
            marginY="3rem"
            alignItems="center"
          >
            <IconButton
              backgroundColor={"white"}
              onClick={() => {
                if (page > 1 || maxPage !== 1) {
                  router.push(`/search/${props.name}?p=${page - 1}`);
                }
              }}
              size="lg"
              variant="outline"
              variantColor="primary"
              aria-label="上一页"
              icon={AiOutlineArrowLeft}
            />
            <Flex paddingX="1rem">
              <Text fontSize="2xl" color="primary.500">
                {page} / {maxPage}
              </Text>
            </Flex>
            <IconButton
              backgroundColor={"white"}
              onClick={() => {
                if (page !== maxPage) {
                  router.push(`/search/${props.name}?p=${page + 1}`);
                }
              }}
              size="lg"
              variant="outline"
              variantColor="primary"
              aria-label="下一页"
              icon={AiOutlineArrowRight}
            />
          </Flex>
        </FlexContainer>
      </Flex>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetcher<queryResult>(query, process.env.faunaClientSecret, {
    name: params?.q,
  });
  const products = res.searchProductsByName;
  return {
    props: { products, name: params?.q },
  };
};

export default SearchPage;
