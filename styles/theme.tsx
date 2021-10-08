import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body, #__next": {
        height: "100%",
      },
    },
  },
});

export default theme;
