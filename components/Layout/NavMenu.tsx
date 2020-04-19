import { Flex, Button, FlexProps, ButtonProps } from "@chakra-ui/core";
import { FlexNavItem } from "./FlexNavItem";
import { IoMdList, IoMdCart, IoMdPerson, IoMdHome } from "react-icons/io";

const NavLinkButton: React.FC<ButtonProps> = (props) => (
  <Button variant="link" color="white" {...props}></Button>
);

export const NavMenu: React.FC<FlexProps> = (props) => {
  return (
    <Flex
      {...props}
      as="nav"
      bg="black"
      width="full"
      justifyContent="space-around"
    >
      <FlexNavItem display={["block", "block", "none"]}>
        <NavLinkButton leftIcon={IoMdHome}>首页</NavLinkButton>
      </FlexNavItem>

      <FlexNavItem>
        <NavLinkButton leftIcon={IoMdList}>分类</NavLinkButton>
      </FlexNavItem>

      <FlexNavItem>
        <NavLinkButton leftIcon={IoMdCart}>88 ￥</NavLinkButton>
      </FlexNavItem>

      <FlexNavItem>
        <NavLinkButton leftIcon={IoMdPerson}>账户</NavLinkButton>
      </FlexNavItem>
    </Flex>
  );
};
