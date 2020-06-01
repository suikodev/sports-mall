/**@jsx jsx */
import { Image, Slide } from "pure-react-carousel";
import { jsx } from "@emotion/core";
import { Skeleton } from "@chakra-ui/core";
import Link from "next/link";

export interface CarouselImage {
  src: string;
  alt: string;
  targetUrl: string;
}

interface CarouselImageItemProps extends CarouselImage {
  onLoad?: () => void;
  index: number;
}

export const CarouselImageItem: React.FC<CarouselImageItemProps> = (props) => {
  return (
    <Slide index={props.index}>
      <Link href={props.targetUrl}>
        <Image
          css={{
            objectFit: "cover",
          }}
          hasMasterSpinner={false}
          src={props.src}
          alt={props.alt}
          renderLoading={(): JSX.Element => <Skeleton height="100%" />}
        />
      </Link>
    </Slide>
  );
};
