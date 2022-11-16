import Head from 'next/head'
import { useEffect, useState } from 'react'
import TickerInput from '../components/TickerInput'
import inputPage from './inputPage.module.css'
import Link from "next/link";
import { TickerContext } from '../Context/Models';
import TickerProvider from '../Context/Providers/TickerProvider';
import SearchView from '../components/SearchView';
import Layout from '../components/Layout';

export default function Home() {  
  return (
    <Layout>
      <Head>
        <title>predict time series app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={inputPage.root}>
        <div className={inputPage.inputView}>
          <TickerProvider>
            <SearchView/>
          </TickerProvider>
        </div>
      </div>

      <footer></footer>
    </Layout>
  )
}
