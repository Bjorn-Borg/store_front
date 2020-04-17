import React from "react";
import { NextPage } from "next";

export const config = { amp: true };

const Page: NextPage = () => {
  return (
    <div>
      <p>This is a page !</p>;
    </div>
  );
};

export default Page;
