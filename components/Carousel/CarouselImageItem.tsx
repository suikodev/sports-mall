/**@jsx jsx */
import { Slide, Image } from "pure-react-carousel";
import { jsx } from "@emotion/core";
import { Skeleton } from "@chakra-ui/core";
import Link from "next/link";

interface CarouselImageItemProps {
  onLoad?: () => void;
  index: number;
  src: string;
  alt: string;
  linkUrl: string;
}

export const CarouselImageItem: React.FC<CarouselImageItemProps> = (props) => {
  return (
    <Slide index={props.index}>
      <Link href={props.linkUrl}>
        <Image
          css={{
            objectFit: "cover",
          }}
          hasMasterSpinner={false}
          src={props.src}
          alt={props.alt}
          renderLoading={() => <Skeleton height="100%"></Skeleton>}
        />
      </Link>
    </Slide>
  );
};
