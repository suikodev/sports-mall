import { MdKeyboardArrowRight } from "react-icons/md";
import { ButtonNext as DefaultButtonNext } from "pure-react-carousel";
import { NavigateButton } from "./NavigateButton";
import React from "react";

export const ButtonNext: React.FC = () => (
  <NavigateButton
    right="0.5rem"
    aria-label="next"
    as={DefaultButtonNext}
    icon={MdKeyboardArrowRight}
    backgroundColor="primary.500"
  />
);
