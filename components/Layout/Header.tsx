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
import { useState } from "react";
import { FlexContainer } from "../FlexContainer";

export const Header = () => {
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
          <NavMenu display={["none", null, "flex"]} flex="0"></NavMenu>
        </FlexContainer>
      </Flex>
      <NavMenu
        display={["flex", null, "none"]}
        position="fixed"
        bottom="0"
      ></NavMenu>
    </>
  );
};
