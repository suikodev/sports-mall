import React from "react";
import { Divider, Flex, Image, Text, useToast } from "@chakra-ui/core";
import { fetcher } from "../../utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { Layout } from "../../components/Layout";
import { Button } from "@chakra-ui/core/dist";
import { IoIosArrowDropleftCircle, IoMdCart } from "react-icons/io";
import { useRouter } from "next/router";

type ProductProps = {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  image: Array<string>;
  price: number;
};

const Product: React.FC<ProductProps> = (props) => {
  if (!props.name) {
    return <></>;
  }
  const router = useRouter();
  const toast = useToast();

  const addProductToCart = () => {
    toast({
      position: "top-right",
      title: "商品已添加至购物车",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    let cart = localStorage.getItem("cart");
    if (!cart) {
      cart = JSON.stringify([
        {
          id: props._id,
          name: props.name,
          price: props.price,
          image: props.image[0],
          quantity: 1,
        },
      ]);
      localStorage.setItem("cart", cart);
    } else {
      const a: Array<{
        id: string;
        quantity: number;
        name: string;
        price: number;
        image: string;
      }> = JSON.parse(cart);
      let k = 0;
      for (let i = 0; i < a.length; i++) {
        if (a[i].id === props._id) {
          a[i].quantity += 1;
          k += 1;
        }
      }
      if (k === 0) {
        a.push({
          id: props._id,
          name: props.name,
          quantity: 1,
          price: props.price,
          image: props.image[0],
        });
      }
      localStorage.setItem("cart", JSON.stringify(a));
    }
  };

  return (
    <Layout>
      <Flex as="section" justifyContent="center" paddingY="10rem">
        <Flex
          flex="0 1 55rem"
          backgroundColor="white"
          justifyContent="center"
          flexWrap="wrap"
          paddingX={["1rem", null, "5rem"]}
        >
          <Flex flex="0 1 20rem" paddingY={["2rem", null, "5rem"]}>
            <Image src={props.image[0]} />
          </Flex>
          <Flex
            display={["none", null, "flex"]}
            flex="0 1 5rem"
            paddingY="2rem"
            justifyContent="center"
          >
            <Divider orientation="vertical" borderColor="#BBB" />
          </Flex>
          <Flex
            flex="0 1 20rem"
            paddingY={["2rem", null, "5rem"]}
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
            <Flex paddingY="1rem" flex="0 1 100%">
              <Button
                variantColor="primary"
                width="100%"
                leftIcon={IoMdCart}
                onClick={addProductToCart}
              >
                添加至购物车
              </Button>
            </Flex>
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
    _id
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
