import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const colorConfig: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  styles: {
    global: {
      "html, body, #__next": {
        height: "100%",
      },
    },
  },
  config: colorConfig,
});

export default theme;
