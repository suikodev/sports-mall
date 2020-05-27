import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Link,
} from "@chakra-ui/core";
import { IoMdSearch } from "react-icons/io";
import { NavMenu } from "./NavMenu";
import { FlexNavItem } from "./FlexNavItem";
import React, { useState } from "react";
import { FlexContainer } from "../FlexContainer";
import NextLink from "next/link";

export const Header: React.FC = () => {
  const [show, setShow] = useState(true);
  const [value, setValue] = useState("");
  return (
    <Flex as="header" backgroundColor="black" justifyContent="center">
      <FlexContainer>
        <FlexNavItem display={[show ? "Flex" : "none", null, "Flex"]}>
          <NextLink href={"/"}>
            <Link>
              <Box width="10rem" flex="0 0 auto">
                <img src="/logo.svg" alt="logo" title="sports mall" />
              </Box>
            </Link>
          </NextLink>
        </FlexNavItem>

        <FlexNavItem flex="1 1 auto">
          <InputGroup flex="0 1 30rem">
            <label htmlFor="product-search-bar" aria-label="商品搜索" />
            <Input
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue(e.currentTarget.value);
              }}
              id="product-search-bar"
              onBlur={(): void => setShow(true)}
              onFocus={(): void => setShow(false)}
              placeholder="搜索商品..."
              focusBorderColor="primary.500"
            />
            <InputRightElement>
              <NextLink href={`/search/${value}`}>
                <Link color="primary.500" _hover={{ color: "secondary.500" }}>
                  <Box as={IoMdSearch} size="2rem" />
                </Link>
              </NextLink>
            </InputRightElement>
          </InputGroup>
        </FlexNavItem>
        <NavMenu display={["none", null, "flex"]} flex="0" />
      </FlexContainer>
    </Flex>
  );
};
