import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { ChakraProvider } from "@chakra-ui/react";
import { DefaultSeo, DefaultSeoProps } from "next-seo";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import theme from "../styles/theme";
import fetchJson from "../utils/fetchJson";
import UiProvider from "../context/ui-context";
import siteImg from "../assets/images/site.png";

function MyApp({ Component, pageProps }: AppProps) {
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
      url: "https://meteorservices.vercel.app/",
      images: [
        {
          url: siteImg.src,
          width: siteImg.width,
          height: siteImg.height,
          alt: "Meteor Site Thumbnail",
        },
      ],
    },
    additionalLinkTags: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicon/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon/favicon-16x16.png",
      },
      { rel: "manifest", href: "/favicon/site.webmanifest" },
      {
        rel: "mask-icon",
        href: "/favicon/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
    additionalMetaTags: [
      { name: "msapplication-TileColor", content: "#603cba" },
      { name: "theme-color", content: "#ffffff" },
    ],
  };

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
