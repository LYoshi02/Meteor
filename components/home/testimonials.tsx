import { Box, Heading } from "@chakra-ui/react";
import Slider, { Settings } from "react-slick";
import classes from "./testimonials/testimonials.module.css";
import Image from "next/image";

import Container from "../ui/container";
import Testimonial from "./testimonials/testimonial";
import quoteMarkSvg from "../../assets/svgs/quote-mark.svg";

const settings: Settings = {
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
};

const Testimonials = () => {
  return (
    <Box as="section" bgColor="#5800FF" py="48" position="relative">
      <Box opacity="0.2" position="absolute" top="24" right="40">
        <Image src={quoteMarkSvg} alt="Quote Mark" />
      </Box>
      <Container>
        <Box gridColumn="1 / -1" textAlign="center">
          <Heading as="h2" fontSize="5xl">
            ¿Qué Dicen Nuestros Clientes?
          </Heading>
        </Box>
        <Box mt="20" gridColumn="1 / -1" mx="-4">
          <Slider {...settings}>
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
