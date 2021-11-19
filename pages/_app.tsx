import * as React from "react";
import * as gtag from "../src/lib/gtag";

import type { AppProps } from "next/app";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import type { EmotionCache } from "@emotion/cache";
import Head from "next/head";
import type { NextPage } from "next";
import Script from "next/script";
import { ThemeProvider } from "@mui/material/styles";
import Web3 from "web3";
import { Web3ReactProvider } from "@web3-react/core";
import createEmotionCache from "../src/utils/createEmotionCache";
import theme from "../src/theme";
import { useEffect } from "react";
import { useRouter } from "next/router";

type EnhancedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

function getLibrary(provider: any) {
  return new Web3(provider);
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props: EnhancedAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  //gtag manager stuff [https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js]
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />

          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <Component {...pageProps} />
        </ThemeProvider>
      </Web3ReactProvider>
    </CacheProvider>
  );
}
