/** @jsx jsx */
import {
  CarouselProvider,
  Slider,
  CarouselProviderProps,
} from "pure-react-carousel";
import { ButtonBack, ButtonNext } from "./NavigateButton";
import { CarouselImageItem } from "./CarouselImageItem";
import { jsx } from "@emotion/core";
import { DotsGroup } from "./DotsGroup";
import React from "react";

type CarouselProps = Partial<CarouselProviderProps> & {
  naturalSlideHeight: number;
  naturalSlideWidth: number;
  imageList: Array<{
    src: string;
    alt: string;
    linkUrl: string;
  }>;
};

export const Carousel: React.FC<CarouselProps> = (props) => {
  const carouselItems = props.imageList.map((image, index) => (
    <CarouselImageItem key={index} index={index} {...image} />
  ));

  const CarouselProps = JSON.parse(JSON.stringify(props));
  delete CarouselProps.imageList;

  return (
    <CarouselProvider
      totalSlides={props.imageList.length}
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
      <DotsGroup totalSlides={props.imageList.length} />
    </CarouselProvider>
  );
};
