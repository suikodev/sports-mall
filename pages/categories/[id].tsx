import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { Flex, Box, IconButton, Text } from "@chakra-ui/core";
import { FlexContainer } from "../../components/FlexContainer";
import { GetStaticPaths, GetStaticProps } from "next";
import { Grid } from "@chakra-ui/core/dist";
import { ProductCard, ProductCardProps } from "../../components/ProductCard";
import { fetcher } from "../../utils";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { LogoHeader } from "../../components/LogoHeader";
import Head from "next/head";
import { IoMdList } from "react-icons/io";

const query = `
query($id:ID!){
  findCategoryByID(id:$id){
    name
    products{
      data{
        _id
        name
        image
        price
      }
    }
  }
}
`;
type queryResult = {
  findCategoryByID: {
    name: string;
    products: {
      data: Array<ProductCardProps>;
    };
  };
};

type CategoryProps = {
  products: Array<ProductCardProps>;
  name: string;
};

const Category: React.FC<CategoryProps> = (props) => {
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
                  router.push(`/?p=${page - 1}`);
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
                  router.push(`/?p=${page + 1}`);
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

const pathQuery = `
{
  allCategories{
  data{
    _id
  }
}
}
`;
type PathQueryResult = {
  allCategories: {
    data: Array<{ _id: string }>;
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetcher<PathQueryResult>(pathQuery);
  const paths = res.allCategories.data.map((category) => ({
    params: { id: category._id },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetcher<queryResult>(query, process.env.faunaClientSecret, {
    id: params?.id,
  });
  const products = res.findCategoryByID.products.data;
  const name = res.findCategoryByID.name;
  return {
    props: { products, name },
  };
};

export default Category;
