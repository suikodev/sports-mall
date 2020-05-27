/** @jsx jsx */
import {
  CarouselProvider,
  Slider,
  CarouselProviderProps,
  Slide,
} from "pure-react-carousel";
import { ButtonBack, ButtonNext } from "./NavigateButton";
import { CarouselImage, CarouselImageItem } from "./CarouselImageItem";
import { jsx } from "@emotion/core";
import { DotsGroup } from "./DotsGroup";
import React from "react";
import { Skeleton } from "@chakra-ui/core/dist";

type CarouselImageList = Array<CarouselImage>;

type CarouselProps = Partial<CarouselProviderProps> & {
  naturalSlideHeight: number;
  naturalSlideWidth: number;
  carouselImageList: CarouselImageList;
};

/**
 *
 * */
const Carousel: React.FC<CarouselProps> = (props) => {
  const carouselItems = props.carouselImageList?.length ? (
    props.carouselImageList.map((image, index) => (
      <CarouselImageItem key={index} index={index} {...image} />
    ))
  ) : (
    <Slide index={0}>
      <Skeleton height="100%" />
    </Slide>
  );

  const CarouselProps = JSON.parse(JSON.stringify(props));
  delete CarouselProps.carouselImageList;

  return (
    <CarouselProvider
      totalSlides={props.carouselImageList?.length || 1}
      {...CarouselProps}
      css={{
        position: "relative",
      }}
    >
      <Slider>{carouselItems}</Slider>
      <ButtonBack />
      <ButtonNext />
      <DotsGroup totalSlides={props.carouselImageList?.length || 1} />
    </CarouselProvider>
  );
};

export { Carousel };
export type { CarouselImageList };
