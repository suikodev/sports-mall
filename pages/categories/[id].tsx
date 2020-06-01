import React from "react";
import { Layout } from "../../components/Layout";
import { Box, Flex, Text } from "@chakra-ui/core";
import { FlexContainer } from "../../components/FlexContainer";
import { GetStaticPaths, GetStaticProps } from "next";
import { Grid } from "@chakra-ui/core/dist";
import { ProductCardProps } from "../../components/ProductCard";
import { fetcher } from "../../utils";
import { LogoHeader } from "../../components/LogoHeader";
import Head from "next/head";
import { IoMdList } from "react-icons/io";
import { PaginationBar } from "../../components/PaginationBar";
import { usePagination } from "../../hooks/usePagination";

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
  if (!props.products) {
    return <></>;
  }
  const [page, maxPage, productCards] = usePagination(props.products);
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
          <PaginationBar page={page} maxPage={maxPage} />
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
