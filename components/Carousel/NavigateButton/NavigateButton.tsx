import { IconButton, IconButtonProps } from "@chakra-ui/core";

export const NavigateButton: React.FC<IconButtonProps> = (props) => {
  return (
    <IconButton
      display={["none", null, "block"]}
      position="absolute"
      top="50%"
      size="sm"
      fontSize="2rem"
      transform="translateY(-50%)"
      isRound
      color="white"
      {...props}
    ></IconButton>
  );
};
