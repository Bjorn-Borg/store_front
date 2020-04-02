import React from "react";
import { NextPage } from "next";
import Nav from "../components/navigation";
import BottomNav from "../components/bottomNavigation";
export const config = { amp: true };

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
  <div>
    <Nav />
    <h1>Hello world! - user agent: {userAgent}</h1>
    <BottomNav
      handleChange={(): string => "change"}
      value="recents"
      classes={{ root: "bottom-nav" }}
    />
  </div>
);

Home.getInitialProps = async ({ req }): string => {
  const userAgent = req ? req.headers["user-agent"] || "" : navigator.userAgent;
  return { userAgent };
};

// const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
//   <div className="container">
//     <Head>
//       <title>Create Next App</title>
//       <link rel="icon" href="/favicon.ico" />
//     </Head>

//     <main>
//       <p> Hello crazy {userAgent}!</p>
//     </main>

//     <footer></footer>

//     <style jsx>{`
//       main {
//         padding: 5rem 0;
//         flex: 1;
//         display: flex;
//         flex-direction: column;
//         justify-content: center;
//         align-items: center;
//       }

//       footer {
//         width: 100%;
//         height: 100px;
//         border-top: 1px solid #eaeaea;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//       }

//       code {
//         background: #fafafa;
//         border-radius: 5px;
//         padding: 0.75rem;
//         font-size: 1.1rem;
//         font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
//           DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
//       }

//       .grid {
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         flex-wrap: wrap;

//         max-width: 800px;
//         margin-top: 3rem;
//       }

//       .card {
//         margin: 1rem;
//         flex-basis: 45%;
//         padding: 1.5rem;
//         text-align: left;
//         color: inherit;
//         text-decoration: none;
//         border: 1px solid #eaeaea;
//         border-radius: 10px;
//         transition: color 0.15s ease, border-color 0.15s ease;
//       }

//       .card:hover,
//       .card:focus,
//       .card:active {
//         color: #0070f3;
//         border-color: #0070f3;
//       }

//       .card h3 {
//         margin: 0 0 1rem 0;
//         font-size: 1.5rem;
//       }

//       .card p {
//         margin: 0;
//         font-size: 1.25rem;
//         line-height: 1.5;
//       }

//       @media (max-width: 600px) {
//         .grid {
//           width: 100%;
//           flex-direction: column;
//         }
//       }
//     `}</style>

//     <style jsx global>{`
//       html,
//       body {
//         padding: 0;
//         margin: 0;
//         font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
//           Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
//       }

//       * {
//         box-sizing: border-box;
//       }
//     `}</style>
//   </div>
// );

// Home.getInitialProps = async ({ req }) => {
//   const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
//   return { userAgent };
// };

export default Home;
