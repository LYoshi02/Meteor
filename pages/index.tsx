import { Box } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import Hero from "../components/home/hero";
import Steps from "../components/home/steps";
import Feature from "../components/home/feature";
import Promotions from "../components/home/promotions";
import Testimonials from "../components/home/testimonials";
import Footer from "../components/home/footer";
import { PromotionSchema } from "../types";
import { getTopPromotions } from "../lib/promotions";

type Props = {
  promotions: (PromotionSchema & {
    Servicios: string[];
    PrecioAnterior: string;
    PrecioFinal: string;
  })[];
};

function HomePage(props: Props) {
  return (
    <>
      <NextSeo
        title="Inicio"
        description="En Meteor ofrecemos servicios de internet y cable para que te mantengas conectado en todo momento."
      />
      <Box bgGradient="linear(to-br, #000000, #152331 85%)" overflow="hidden">
        <Hero />
        <Steps />
      </Box>
      <Feature />
      <Promotions promotions={props.promotions} />
      <Testimonials />
      <Footer />
    </>
  );
}

export default HomePage;

export async function getStaticProps() {
  const promotions = await getTopPromotions(3);

  return {
    props: {
      promotions,
    },
    revalidate: 600,
  };
}
