import React, { FunctionComponent } from "react";
import Link from "next/link";

// interface TypedProps {
//   value: string;
//   handleChange: (event: React.MouseEvent<HTMLElement>) => void;
//   classes: { root: string };
// }
const test: string = "test12s2sd2222122";

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/newPage">
          <a>man</a>
        </Link>
      </li>
      <li>
        <Link href="/newPage">
          <a>kvinna</a>
        </Link>
      </li>
      <li>
        <Link href="/newPage">
          <a>hållbarhet</a>
        </Link>
      </li>
      <li>
        <Link href="/newPage">
          <a>stories</a>
        </Link>
      </li>
    </ul>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </nav>
);

export default Nav;
