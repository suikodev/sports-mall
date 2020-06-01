import React from "react";
import { Layout } from "../../components/Layout";
import { Box, Flex, Text } from "@chakra-ui/core";
import { FlexContainer } from "../../components/FlexContainer";
import { GetServerSideProps } from "next";
import { Grid } from "@chakra-ui/core/dist";
import { ProductCardProps } from "../../components/ProductCard";
import { fetcher } from "../../utils";
import { LogoHeader } from "../../components/LogoHeader";
import Head from "next/head";
import { IoMdList } from "react-icons/io";
import { PaginationBar } from "../../components/PaginationBar";
import { usePagination } from "../../hooks/usePagination";

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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const result = await fetcher<queryResult>(
    query,
    process.env.faunaClientSecret,
    {
      name: params?.q,
    }
  );
  const products = result.searchProductsByName;
  return {
    props: { products, name: params?.q },
  };
};

export default SearchPage;
