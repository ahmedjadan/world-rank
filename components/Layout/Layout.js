import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Brightness6Rounded } from "@material-ui/icons";
import styles from "./Layout.module.css";

function Layout({ children, title = "World Rank" }) {
  const [theme, setTheme] = useState("light");
  // useEffect(() => {
  //   document.documentElement.setAttribute(
  //     "data-theme",
  //     localStorage.getItem("theme")
  //   );
  //   setTheme(localStorage.getItem("theme"))
  // }, []);
  const switchTheme = () => {
    if (theme === "light") {
      saveThame("dark");
    } else {
      saveThame("light");
    }
  };
  const saveThame = (theme) => {
    setTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="world Rank countries" />
        <meta name="keywords" content="ranks, population, areas, Gini record" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className={styles.header}>
        <Link href="/">
          <img src="/Logo.svg" alt="logo" />
        </Link>
        <button name="change theme color" className={styles.theme__switcher} onClick={switchTheme}>
          <Brightness6Rounded />
        </button>
      </header>
      <main className={styles.main}> {children} </main>

      <footer className={styles.footer}>&copy; Ahmed Ja'dan </footer>
    </div>
  );
}

export default Layout;
