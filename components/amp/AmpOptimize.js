import React from "react";
import AmpIncludeCustomElement from "./AmpIncludeCustomElement";

export default props => (
  <>
    <AmpIncludeCustomElement name="amp-experiment" version="0.1" />
    <amp-experiment>
      {props.script && (
        <script
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(props.script)
          }}
        />
      )}
    </amp-experiment>
  </>
);
