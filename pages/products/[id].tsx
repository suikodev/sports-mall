import React from "react";
import { Text, Image, Flex, Divider, useToast } from "@chakra-ui/core";
import { fetcher } from "../../utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { Layout } from "../../components/Layout";
import { Button } from "@chakra-ui/core/dist";
import { IoMdCart, IoIosArrowDropleftCircle } from "react-icons/io";
import { useRouter } from "next/router";

type ProductProps = {
  name: string;
  description: string;
  quantity: string;
  image: Array<string>;
  price: string;
};

const Product: React.FC<ProductProps> = (props) => {
  if (!props.name) {
    return <></>;
  }
  const router = useRouter();
  const toast = useToast();
  return (
    <Layout>
      <Flex as="section" justifyContent="center" paddingY="10rem">
        <Flex
          flex="0 1 55rem"
          backgroundColor="white"
          justifyContent="center"
          flexWrap="wrap"
          paddingX="5rem"
        >
          <Flex flex="0 1 20rem" paddingY="5rem">
            <Image src={props.image[0]} />
          </Flex>
          <Flex flex="0 1 5rem" paddingY="2rem" justifyContent="center">
            <Divider orientation="vertical" borderColor="#BBB" />
          </Flex>
          <Flex
            flex="0 1 20rem"
            paddingY="5rem"
            justifyContent="center"
            flexWrap="wrap"
            alignItems="center"
          >
            <Text fontSize="2xl" width="100%">
              {props.name}
            </Text>
            <Flex flex="0 1 100%">
              <Text fontSize="3xl" fontWeight={"600"}>
                ￥ {props.price}
              </Text>
            </Flex>
            <Text>{props.description}</Text>
            <Button
              variantColor="primary"
              width="100%"
              leftIcon={IoMdCart}
              onClick={() =>
                toast({
                  position: "top-right",
                  title: "商品已添加至购物车",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                })
              }
            >
              添加至购物车
            </Button>
          </Flex>
          <Flex paddingBottom="2rem">
            <Button
              onClick={() => router.push("/")}
              variantColor="secondary"
              leftIcon={IoIosArrowDropleftCircle}
            >
              返回商城
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

const pathQuery = `
{
  allProducts{
  data{
    _id
  }
}
}
`;
type PathQueryResult = {
  allProducts: {
    data: Array<{ _id: string }>;
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetcher<PathQueryResult>(pathQuery);

  const paths = res.allProducts.data.map((product) => ({
    params: { id: product._id },
  }));
  return { paths, fallback: true };
};

const productQuery = `
query($id:ID!){
  findProductByID(id:$id){
    name
    description
    quantity
    image
    price
  }
}
`;

type ProductQueryResult = {
  findProductByID: ProductProps;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetcher<ProductQueryResult>(
    productQuery,
    process.env.faunaClientSecret,
    { id: params?.id }
  );
  const product = res.findProductByID;
  return {
    props: { ...product },
  };
};

export default Product;
