import { Box } from "@chakra-ui/react";

import Hero from "../components/home/hero";
import Steps from "../components/home/steps";
import Feature from "../components/home/feature";
import Promotions from "../components/home/promotions";
import Testimonials from "../components/home/testimonials";
import Footer from "../components/home/footer";
import fetchJson from "../utils/fetchJson";
import { PromotionSchema } from "../types";

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
  const res: any = await fetchJson<{
    promotions: PromotionSchema & {
      Servicios: string[];
      PrecioAnterior: string;
      PrecioFinal: string;
    };
  }>("http://localhost:3000/api/promotions?limit=3", {
    method: "GET",
  });

  return {
    props: {
      promotions: res.promotions,
    },
    revalidate: 600,
  };
}
