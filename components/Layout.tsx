import React from 'react';
import styles from './Layout.module.css';
import Head from 'next/head';
import Link from 'next/link';

const Layout: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Clément Bourgoin · web developer</title>
        <link
          rel="icon"
          type="image/png"
          href="/icons/favicon-32x32.png"
          sizes="32x32"
        />
      </Head>
      <header>
        <h1 className={styles.title}>
          <Link href="/">Clément Bourgoin</Link>
        </h1>
        <div className={styles.tagline}>
          a.k.a{' '}
          <a href="https://github.com/iwazaru" target="_blank" rel="noreferrer">
            iwazaru
          </a>{' '}
          · web developer
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
