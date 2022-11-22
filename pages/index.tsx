import Head from 'next/head'
import inputPage from './inputPage.module.css'
import TickerProvider from '../Context/Providers/TickerProvider';
import SearchView from '../widgets/Search/SearchView';
import Layout from '../entities/Layout';
import Header from '../entities/Header';
import MainTimeSiresBody from '../entities/Containers/InputTimeSiresContainer';

export default function InputPage() {
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
              <SearchView/>
            </TickerProvider>
          </div>
        </div>
      </MainTimeSiresBody>
    </Layout>
  )
}
