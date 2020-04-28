import { Flex, FlexProps } from "@chakra-ui/core";
import React from "react";

export const FlexNavItem: React.FC<FlexProps> = (props) => (
  <Flex
    padding="1rem 1rem"
    justifyContent="center"
    alignItems="center"
    {...props}
  />
);
