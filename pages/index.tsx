import Head from 'next/head'
import { useEffect } from 'react'
import TickerInput from '../components/TickerInput'
import inputPage from './inputPage.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>predict time series app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={inputPage.root}>
        <div className={inputPage.inputView}>
          <TickerInput/>
          <Link href={{ pathname: '/predict', query: { ticker: 'BTC' } }}>predict</Link>
        </div>
      </main>

      <footer></footer>
    </div>
  )
}
