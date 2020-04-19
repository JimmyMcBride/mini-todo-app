import "./styles.css";
import "bushido-strap/css/main.css";

import App from "next/app";
import React from "react";
import { AppWrapper, theme } from "bushido-strap";
import { ApolloProvider } from "react-apollo";
import withApollo from "../lib/withApollo";

class MyApp extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <AppWrapper bg={theme.gray9} className="app">
          <Component {...pageProps} />
        </AppWrapper>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
