import Head from 'next/head'
import { useEffect, useState } from 'react'
import TickerInput from '../components/TickerInput'
import inputPage from './inputPage.module.css'
import Link from "next/link";
import { TickerContext } from '../Context/Models';
import TickerProvider from '../Context/Providers/TickerProvider';
import SearchView from '../components/SearchView';
import Layout from '../components/Layout';
import styles from '../components/layout.module.css'
import Header from '../components/Header';
import MainTimeSiresBody from '../components/MainTimeSiresBody';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>predict time series app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header pageHeader='Home' pathLink='/' isBack = {false} />
      <MainTimeSiresBody>
        <div className={inputPage.inputViewWrapper}>
          <div className={inputPage.inputView}>
            <TickerProvider>
              <SearchView />
            </TickerProvider>
          </div>
        </div>
      </MainTimeSiresBody>
    </Layout>
  )
}
