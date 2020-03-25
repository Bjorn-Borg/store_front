import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { useAmp } from "next/amp";
import { ServerStyleSheets } from "@material-ui/core/styles";
import theme from "../assets/theme";

import { GA_TRACKING_ID } from "../lib/gtag";
import AmpAnalytics from "../components/amp/AmpAnalytics";
import AmpOptimize from "../components/amp/AmpOptimize";

function AmpWrap({ ampOnly, nonAmp }) {
  const isAmp = useAmp();
  if (ampOnly) return isAmp && ampOnly;
  return !isAmp && nonAmp;
}

const experiment = {
  FlyingButton: {
    sticky: true,
    variants: {
      "0": 40,
      "1": 50
    }
  }
};

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <script
            async
            custom-element="amp-analytics"
            src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
          ></script>
          <script
            async
            custom-element="amp-experiment"
            src="https://cdn.ampproject.org/v0/amp-experiment-0.1.js"
          ></script>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* AMP - Google Analytics */}
          <AmpWrap
            ampOnly={
              ((
                <AmpAnalytics
                  type="googleanalytics"
                  script={{
                    vars: {
                      account: GA_TRACKING_ID,
                      gtag_id: GA_TRACKING_ID,
                      config: {
                        [GA_TRACKING_ID]: { groups: "default" }
                      }
                    },
                    requests: {
                      experiment:
                        "${pageview}&xid=${experiment}&xvar=${variant}"
                    },

                    triggers: {
                      "default pageview": {
                        on: "visible",
                        request: "experiment",
                        vars: {
                          experiment: "iQD4FnGfQxOBA8jC3C5Lyg",
                          variant: "VARIANT(flying-button)"
                        }
                      }
                    }
                  }}
                />
              ),
              (<AmpOptimize script={experiment} />))
            }
          />

          {/* Non-AMP - Google Analytics */}
          <AmpWrap
            nonAmp={
              <>
                <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());

                      gtag('config', '${GA_TRACKING_ID}');
                    `
                  }}
                />
              </>
            }
          />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement()
    ]
  };
};
