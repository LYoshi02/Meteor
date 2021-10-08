import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import Layout from "../components/layout/layout";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
export default MyApp;
