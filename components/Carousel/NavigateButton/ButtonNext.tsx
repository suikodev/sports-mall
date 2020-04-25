import { MdKeyboardArrowRight } from "react-icons/md";
import { ButtonNext as DefaultButtonNext } from "pure-react-carousel";
import { NavigateButton } from "./NavigateButton";
export const ButtonNext = () => (
  <NavigateButton
    right="0.5rem"
    aria-label="next"
    as={DefaultButtonNext}
    icon={MdKeyboardArrowRight}
    backgroundColor="primary.500"
  ></NavigateButton>
);
