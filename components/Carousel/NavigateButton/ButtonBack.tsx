import { MdKeyboardArrowLeft } from "react-icons/md";
import { ButtonBack as DefaultButtonBack } from "pure-react-carousel";
import { NavigateButton } from "./NavigateButton";
import React from "react";

export const ButtonBack: React.FC = () => (
  <NavigateButton
    left="0.5rem"
    aria-label="back"
    as={DefaultButtonBack}
    icon={MdKeyboardArrowLeft}
    backgroundColor="secondary.500"
  />
);
