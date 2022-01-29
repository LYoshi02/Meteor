import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { ChakraProvider } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import theme from "../styles/theme";
import fetchJson from "../utils/fetchJson";
import UiProvider from "../context/ui-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <UiProvider>
        <SWRConfig value={{ fetcher: fetchJson }}>
          <Component {...pageProps} />
        </SWRConfig>
      </UiProvider>
    </ChakraProvider>
  );
}
export default MyApp;
