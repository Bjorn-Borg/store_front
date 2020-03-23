import React from "react";
import Document, { Main, NextScript } from "next/document";
import { useAmp } from "next/amp";

import { GA_TRACKING_ID } from "../lib/gtag";
import AmpAnalytics from "../components/amp/AmpAnalytics";
import AmpOptimize from "../components/amp/AmpOptimize";
import Head from "next/head";

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

export default class extends Document {
  render() {
    return (
      <html>
        <head>
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
        </head>
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
