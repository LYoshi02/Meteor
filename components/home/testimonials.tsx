import { Box, Heading, useMediaQuery } from "@chakra-ui/react";
import Slider, { Settings as ReactSlickSettings } from "react-slick";
import classes from "./testimonials/testimonials.module.css";
import Image from "next/image";

import Container from "../ui/container";
import Testimonial from "./testimonials/testimonial";
import quoteMarkSvg from "../../assets/svgs/quote-mark.svg";

const Testimonials = () => {
  const sliderSettings: ReactSlickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    centerPadding: "0px",
    draggable: false,
    customPaging: () => (
      <Box
        w="4"
        h="4"
        borderRadius="full"
        border="3px solid rgba(255, 255, 255, 0.6)"
      ></Box>
    ),
    dotsClass: classes["SlickDots"],
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    // autoplay: true, TODO: implement this but when the user is looking at this section
  };

  return (
    <Box as="section" bgColor="#5800FF">
      <Container config={{ py: "48", position: "relative" }}>
        <Box
          opacity="0.25"
          position="absolute"
          top={{ base: "28", lg: "24" }}
          right="4"
          width={{ base: "32", lg: "36" }}
        >
          <Image src={quoteMarkSvg} alt="Quote Mark" width={176} height={149} />
        </Box>
        <Box gridColumn="1 / -1" textAlign="center">
          <Heading as="h2" fontSize={{ base: "4xl", md: "5xl" }}>
            ¿Qué Dicen Nuestros Clientes?
          </Heading>
        </Box>
        <Box
          mt="20"
          gridColumn={{ base: "1 / -1", md: "2 / 12", lg: "1 / -1" }}
          mx="-4"
        >
          <Slider {...sliderSettings}>
            <Testimonial />
            <Testimonial />
            <Testimonial />
            <Testimonial />
            <Testimonial />
            <Testimonial />
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;
