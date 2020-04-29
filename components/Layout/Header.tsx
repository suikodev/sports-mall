import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/core";
import { IoMdSearch } from "react-icons/io";
import { NavMenu } from "./NavMenu";
import { FlexNavItem } from "./FlexNavItem";
import React, { useState } from "react";
import { FlexContainer } from "../FlexContainer";

export const Header: React.FC = () => {
  const [show, setShow] = useState(true);

  return (
    <>
      <Flex as="header" backgroundColor="black" justifyContent="center">
        <FlexContainer>
          <FlexNavItem display={[show ? "Flex" : "none", null, "Flex"]}>
            <Box width="10rem" flex="0 0 auto">
              <img src="/logo.svg" alt="logo" title="sports mall" />
            </Box>
          </FlexNavItem>

          <FlexNavItem flex="1 1 auto">
            <InputGroup flex="0 1 40rem">
              <label htmlFor="product-search-bar" aria-label="商品搜索" />
              <Input
                id="product-search-bar"
                onBlur={(): void => setShow(true)}
                onFocus={(): void => setShow(false)}
                placeholder="搜索商品..."
                focusBorderColor="primary.500"
              />
              <InputRightElement>
                <Box as={IoMdSearch} size="2rem" color="primary.500" />
              </InputRightElement>
            </InputGroup>
          </FlexNavItem>
          <NavMenu display={["none", null, "flex"]} flex="0" />
        </FlexContainer>
      </Flex>
      <NavMenu display={["flex", null, "none"]} position="fixed" bottom="0" />
    </>
  );
};
