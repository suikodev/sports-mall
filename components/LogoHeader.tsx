import React from "react";
import { Flex } from "@chakra-ui/core";

export const LogoHeader: React.FC = (props) => {
  return (
    <Flex
      as="section"
      justifyContent="center"
      alignItems="center"
      width="full"
      paddingY={"6rem"}
    >
      <Flex
        backgroundColor={"rgba(0, 0, 0, 0.6)"}
        paddingX="3rem"
        paddingY="2rem"
      >
        {props.children}
      </Flex>
    </Flex>
  );
};
