import { useEffect, useState } from 'react';
import Head from 'next/head'

import WorldMapSection from './components/WorldMapSection'
import BarChartSection from './components/BarChartSection'

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from '../styles/Home.module.css'

export default function Home() {
  const [allCategories, setAllCategories] = useState([])

  useEffect(() => {
    fetch("/api/data/categories").then(d => d.json())
      .then(d => setAllCategories(d.map(i => i._id)))
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Time</title>
        <meta name="description" content="Time use in the world" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
          <h1 className={styles.title}>
            How do we spend our time?
          </h1>

        <div className={styles.section}>
          <WorldMapSection allCategories={allCategories} />
        </div>

        <div className={styles.section}>
          <BarChartSection allCategories={allCategories} />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/NoahMLoomis/data-analysis"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Noah Loomis
          <svg xmlns="http://www.w3.org/2000/svg" width="72" height="30" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
        </a>
      </footer>
    </div >
  )
}
