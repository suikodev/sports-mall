import { Flex, Link, LinkProps } from "@chakra-ui/core";
import { FlexContainer } from "../FlexContainer";
import { Text } from "@chakra-ui/core";
import React from "react";

const UnderlineLink: React.FC<LinkProps> = (props) => (
  <Link textDecoration="underline" {...props} />
);

export const Footer: React.FC = () => {
  return (
    <Flex as="footer" backgroundColor="black" justifyContent="center">
      <FlexContainer flexWrap="wrap" padding="1rem">
        {/* prettier-ignore */}
        <Text color="white" width="full">
            Powered by <UnderlineLink href="https://vercel.com/">vercel</UnderlineLink> and <UnderlineLink href="https://fauna.com">fauna</UnderlineLink>
          </Text>
        {/* prettier-ignore */}
        <Text color="white" width="full">
            github: <UnderlineLink href="https://github.com/realnacht">realnacht</UnderlineLink>
          </Text>
      </FlexContainer>
    </Flex>
  );
};
