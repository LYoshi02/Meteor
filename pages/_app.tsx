import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { ChakraProvider } from "@chakra-ui/react";
import { DefaultSeo, DefaultSeoProps } from "next-seo";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import theme from "../styles/theme";
import fetchJson from "../utils/fetchJson";
import UiProvider from "../context/ui-context";

const defaultSEOConfig: DefaultSeoProps = {
  titleTemplate: "%s | Meteor",
  defaultTitle: "Meteor",
  openGraph: {
    type: "website",
    locale: "es_la",
    site_name: "Meteor",
    title: "Meteor",
    description:
      "En Meteor ofrecemos servicios de internet y cable para que te mantengas conectado en todo momento.",
    images: [
      {
        url: "/images/site.png",
        width: 4320,
        height: 2700,
        alt: "Meteor Site Thumbnail",
      },
    ],
  },
  // url: ""
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <UiProvider>
        <SWRConfig value={{ fetcher: fetchJson }}>
          <DefaultSeo {...defaultSEOConfig} />
          <Component {...pageProps} />
        </SWRConfig>
      </UiProvider>
    </ChakraProvider>
  );
}
export default MyApp;
