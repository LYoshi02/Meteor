import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "../styles/theme";
import fetchJson from "../utils/fetchJson";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SWRConfig value={{ fetcher: fetchJson }}>
        <Component {...pageProps} />
      </SWRConfig>
    </ChakraProvider>
  );
}
export default MyApp;
