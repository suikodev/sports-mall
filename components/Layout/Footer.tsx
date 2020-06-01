import { Flex, Link, LinkProps, Text } from "@chakra-ui/core";
import { FlexContainer } from "../FlexContainer";
import React from "react";
import { NavMenu } from "./NavMenu";

const UnderlineLink: React.FC<LinkProps> = (props) => (
  <Link textDecoration="underline" {...props} />
);

export const Footer: React.FC = () => {
  return (
    <>
      <NavMenu display={["flex", null, "none"]} position="fixed" bottom="0" />
      <Flex
        width={"100%"}
        as="footer"
        backgroundColor="black"
        justifyContent="center"
        marginBottom={["3rem", null, 0, 0]}
      >
        <FlexContainer flexWrap="wrap" padding="1rem">
          {/* prettier-ignore */}
          <Text color="white" width="full">
            Powered by <UnderlineLink href="https://vercel.com/">vercel</UnderlineLink> and <UnderlineLink href="https://fauna.com">fauna</UnderlineLink>
          </Text>
          {/* prettier-ignore */}
          <Text color="white" width="full">
            Made with ❤️
          </Text>
        </FlexContainer>
      </Flex>
    </>
  );
};
