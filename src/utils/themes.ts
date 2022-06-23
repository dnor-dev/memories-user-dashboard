import { extendTheme } from "@chakra-ui/react";

const themes = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: `'Poppins', sans-serif`,
      },
    },
  },

  palette: {
    primary: {
      main: "#1A365D",
    },
  },
});

export default themes;
