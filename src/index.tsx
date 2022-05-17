import { ColorModeScript, ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDom from "react-dom";
import Layout from "./components/Layout";
import themes from "./utils/themes";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

const container = document.getElementById("root");

ReactDom.render(
  <Provider store={store}>
    <ChakraProvider theme={themes}>
      <BrowserRouter>
        <Layout>
          <ColorModeScript />
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </ChakraProvider>
  </Provider>,
  container,
);
