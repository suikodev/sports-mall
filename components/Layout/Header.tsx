import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/core";
import Head from "next/head";
import { IoMdSearch } from "react-icons/io";
import { NavMenu } from "./NavMenu";
import { FlexNavItem } from "./FlexNavItem";
import { useState } from "react";

export const Header = () => {
  const [show, setShow] = useState(true);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC&family=Noto+Serif+SC:wght@500&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Flex as="header" backgroundColor="black" justifyContent="center">
        <Flex flex="0 1 100rem" maxWidth="80rem">
          <FlexNavItem display={[show ? "Flex" : "none", null, "Flex"]}>
            <Box width="10rem" flex="0 0 auto">
              <img src="/logo.svg" alt="logo" title="sports mall" />
            </Box>
          </FlexNavItem>

          <FlexNavItem flex="1 1 auto">
            <InputGroup flex="1 1 40rem" maxWidth="40rem">
              <Input
                onBlur={() => setShow(true)}
                onFocus={() => setShow(false)}
                placeholder="搜索商品..."
                focusBorderColor="primary.500"
              ></Input>
              <InputRightElement>
                <Box as={IoMdSearch} size="2rem" color="primary.500"></Box>
              </InputRightElement>
            </InputGroup>
          </FlexNavItem>
          <NavMenu display={["none", "none", "flex"]} flex="0"></NavMenu>
        </Flex>
      </Flex>
      <NavMenu
        display={["flex", "flex", "none"]}
        position="fixed"
        bottom="0"
      ></NavMenu>
    </>
  );
};
