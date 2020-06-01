/** @jsx jsx */
import {
  CarouselContext,
  Dot as DefaultDot,
  DotProps as DefaultDotProps,
} from "pure-react-carousel";
import { Box, Flex } from "@chakra-ui/core";
import { jsx } from "@emotion/core";
import React, { useContext, useEffect, useState } from "react";

type DotProps = Partial<DefaultDotProps> & {
  slide: number;
};

interface DotsGroupProps {
  totalSlides: number;
}

const Dot: React.FC<DotProps> = (props) => {
  const carouselContext = useContext(CarouselContext);
  const [currentSlide, setCurrentSlide] = useState(
    carouselContext.state.currentSlide
  );
  useEffect(() => {
    const onChange = (): void => {
      setCurrentSlide(carouselContext.state.currentSlide);
    };
    carouselContext.subscribe(onChange);
    return (): void => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);
  return (
    <DefaultDot {...props}>
      <Box paddingX="0.5rem" opacity={0.8}>
        <Box
          size={["0.5rem", null, "1rem"]}
          rounded="full"
          backgroundColor={currentSlide === props.slide ? "#3333ee" : "#aa00cc"}
        />
      </Box>
    </DefaultDot>
  );
};

export const DotsGroup: React.FC<DotsGroupProps> = (props) => {
  const dotItems = [];
  for (let index = 0; index < props.totalSlides; index++) {
    dotItems.push(<Dot slide={index} key={index} />);
  }
  return (
    <Flex
      position="absolute"
      bottom="0"
      left="50%"
      transform="translateX(-50%)"
      paddingY="1rem"
    >
      {dotItems}
    </Flex>
  );
};
