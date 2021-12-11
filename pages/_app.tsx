import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { ChakraProvider } from "@chakra-ui/react";

import Layout from "../components/layout/layout";
import theme from "../styles/theme";
import fetchJson from "../utils/fetchJson";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SWRConfig value={{ fetcher: fetchJson }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </ChakraProvider>
  );
}
export default MyApp;
