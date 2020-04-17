import React from "react";
import { NextPage, NextPageContext } from "next";
import BottomNav from "../components/bottomNavigation";
export const config = { amp: true };

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
  <div>
    <h1>Hello world! - user agent: {userAgent}</h1>
    <BottomNav
      handleChange={(): string => "change"}
      value="recents"
      classes={{ root: "bottom-nav" }}
    />
  </div>
);

interface InitialProps extends NextPageContext {
  req?: any;
}

Home.getInitialProps = async ({ req }: InitialProps) => {
  const userAgent = req ? req.headers["user-agent"] || "" : navigator.userAgent;
  return { userAgent };
};

export default Home;
