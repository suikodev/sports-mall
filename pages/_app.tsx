import React from "react";
import NextApp from "next/app";
import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import { theme } from "../theme";
import "pure-react-carousel/dist/react-carousel.es.css";
import "../public/global.css";

class App extends NextApp {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

export default App;
