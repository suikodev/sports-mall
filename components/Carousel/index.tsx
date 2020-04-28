/** @jsx jsx */
import {
  CarouselProvider,
  Slider,
  CarouselProviderProps,
} from "pure-react-carousel";
import { ButtonBack, ButtonNext } from "./NavigateButton";
import { CarouselImage, CarouselImageItem } from "./CarouselImageItem";
import { jsx } from "@emotion/core";
import { DotsGroup } from "./DotsGroup";
import React from "react";

type CarouselImageList = Array<CarouselImage>;

type CarouselProps = Partial<CarouselProviderProps> & {
  naturalSlideHeight: number;
  naturalSlideWidth: number;
  carouselImageList: CarouselImageList;
};

const Carousel: React.FC<CarouselProps> = (props) => {
  const carouselItems = props.carouselImageList.map((image, index) => (
    <CarouselImageItem key={index} index={index} {...image} />
  ));

  const CarouselProps = JSON.parse(JSON.stringify(props));
  delete CarouselProps.carouselImageList;

  return (
    <CarouselProvider
      totalSlides={props.carouselImageList.length}
      {...CarouselProps}
      css={{
        position: "relative",
      }}
    >
      <Slider
        css={{
          borderRadius: "0.5rem",
        }}
      >
        {carouselItems}
      </Slider>
      <ButtonBack />
      <ButtonNext />
      <DotsGroup totalSlides={props.carouselImageList.length} />
    </CarouselProvider>
  );
};

export { Carousel };
export type { CarouselImageList };
