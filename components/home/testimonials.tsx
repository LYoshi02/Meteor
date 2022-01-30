import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Box, Heading } from "@chakra-ui/react";
import Slider, { Settings as ReactSlickSettings } from "react-slick";

import Container from "../ui/container";
import Testimonial from "./testimonials/testimonial";
import quoteMarkSvg from "../../assets/svgs/quote-mark.svg";
import useOnScreen from "../../hooks/useOnScreen";
import classes from "./testimonials/testimonials.module.css";

const serviceTestimonials = [
  {
    id: "1",
    text: "Recomiendo fuertemente a Meteor como proveedor de internet para toda persona o negocio que busque una conexión rápida y que no falle nunca. Sus planes de precios se ajustan perfectamente a las necesidades de nuestra empresa.",
    author: {
      name: "Ralph Edwards",
      job: "CEO, Binford Ltd.",
      imgUrl: "/images/avatar1.png",
    },
  },
  {
    id: "2",
    text: "No se puede exigir más al servicio que esto. Estamos extremadamente satisfechos con Meteor, definitivamente obtuvimos mucho más de lo que estamos pagando. Lo recomendamos al 100 por ciento.",
    author: {
      name: "Jane Cooper",
      job: "Vice Presidente, Biffco Enterprises Ltd.",
      imgUrl: "/images/avatar2.png",
    },
  },
  {
    id: "3",
    text: "El servicio ofrecido es muy superior a la competencia. La alta velocidad de conexión nos permite mejorar nuestras transacciones diarias. Muy agradecido por semejante servicio.",
    author: {
      name: "Guy Hawkins",
      job: "Asistente Ejecutivo, Abstergo Ltd.",
      imgUrl: "/images/avatar3.png",
    },
  },
  {
    id: "4",
    text: "Meteor es el mejor servicio que hemos adquirido. La atención al cliente siempre puntual y amigable. Nuestra experiencia es muy positiva. Sigan con este excelente trabajo.",
    author: {
      name: "Annete Black",
      job: "Gerente de Marketing, Barone LLC.",
      imgUrl: "/images/avatar4.png",
    },
  },
  {
    id: "5",
    text: "¿Arrepentido? solo de no haberlos contratado antes. Meteor es muy rápido y se adapta a todos nuestros requerimientos. El servicio definitivamente hace honor a su nombre.",
    author: {
      name: "Wade Warren",
      job: "Administrador de proyectos, Schimmel Inc.",
      imgUrl: "/images/avatar5.png",
    },
  },
  {
    id: "6",
    text: "Agradecido para toda la vida por este maravilloso servicio. Mejoró enormemente nuestro flujo de trabajo en la empresa. Muchas gracias Meteor!",
    author: {
      name: "Ronald Richards",
      job: "Especialista en Negocios, Barton Inc.",
      imgUrl: "/images/avatar6.png",
    },
  },
];

const Testimonials = () => {
  const [sliderRef, setSliderRef] = useState<Slider | null>();
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    if (sliderRef && isVisible) {
      sliderRef.slickPlay();
    } else if (sliderRef && !isVisible) {
      sliderRef.slickPause();
    }
  }, [isVisible, sliderRef]);

  const sliderSettings: ReactSlickSettings = {
    dots: true,
    infinite: true,
    autoplaySpeed: 10000,
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
          autoplaySpeed: 5000,
        },
      },
    ],
  };

  return (
    <Box as="section" bgColor="#5800FF" ref={ref}>
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
          overflow="hidden"
        >
          <Slider
            {...sliderSettings}
            autoplay={isVisible}
            ref={(slider) => setSliderRef(slider)}
          >
            {serviceTestimonials.map((testimonial) => (
              <Testimonial key={testimonial.id} {...testimonial} />
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;
