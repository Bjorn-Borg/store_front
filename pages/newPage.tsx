import React from "react";
export const config = { amp: true };

export default (page: {}) => {
  console.log(page, Object.keys(page)[0]);
  return <p>This is a page !</p>;
};
