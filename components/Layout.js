import Head from "next/head";
import Link from "next/link";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import Search from "@/components/Search";
import styles from "@/styles/Layout.module.css";
import Showcase from "./Showcase";
import { useContext } from "react";
import AuthContext from "context/AuthContext";
import { motion } from "framer-motion";

const Layout = ({ children, title, description, keywords }) => {
  const router = useRouter();

  const { user, logout } = useContext(AuthContext);

  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 200, y: 0 },
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description}></meta>
        <meta name='keywords' content={keywords}></meta>
      </Head>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href='/'>Events</Link>
        </div>
        <Search />
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href='/events'>
                <a>Eventi</a>
              </Link>
            </li>
            {user ? (
              //Prijavljen korisnik
              <>
                <li>
                  <Link href='/events/add'>
                    <a>Dodaj event</a>
                  </Link>
                </li>
                <li>
                  <Link href='/account/dashboard'>
                    <a>Dashboard</a>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => logout()}
                    className='btn-secondary btn-icon'
                  >
                    <FaSignOutAlt /> Odjava
                  </button>
                </li>
              </>
            ) : (
              //Nije prijavljen korisnik
              <>
                <li>
                  <Link href='/account/login'>
                    <a className='btn-secondary btn-icon'>
                      <FaSignInAlt /> Prijava
                    </a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      {router.pathname === "/" && <Showcase />}
      <motion.div
        initial='hidden'
        animate='enter'
        exit='exit'
        variants={variants}
        transition={{ type: "linear" }}
        className={styles.children}
      >
        {children}
      </motion.div>

      <footer className={styles.footer}>Copyright Azem Avdić</footer>
    </div>
  );
};

Layout.defaultProps = {
  title: "Nasi eventi",
  description: "Naručite besplatno online iz bilo kojeg restorana",
  keywords: "naručite online, restorani, bosna",
};

export default Layout;
