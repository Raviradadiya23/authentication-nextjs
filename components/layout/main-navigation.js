import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

import classes from "./main-navigation.module.css";

function MainNavigation() {
  const { data: session, status } = useSession();

  if (status === "loading") return <h1>Loading...</h1>;
  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={signOut}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
