import Head from 'next/head'
import { useEffect, useState } from 'react'
import TickerInput from '../components/TickerInput'
import inputPage from './inputPage.module.css'
import Link from "next/link";
import { TickerContext } from '../Context/Models';
import TickerProvider from '../Context/Providers/TickerProvider';
import SearchView from '../components/SearchView';

export default function Home() {  
  return (
    <div className="container">
      <Head>
        <title>predict time series app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={inputPage.root}>
        <div className={inputPage.inputView}>
          <TickerProvider>
            <SearchView/>
              {/* <TickerInput />
              <Link href={{ pathname: '/predict', query: { ticker: 'BTC' } }}>predict</Link> */}
          </TickerProvider>
        </div>
      </main>

      <footer></footer>
    </div>
  )
}
