import Head from "next/head";
import inputPage from "./inputPage.module.css";
import TickerProvider from "../Context/Providers/TickerProvider";
import Layout from "../entities/Layout";
import Header from "../entities/Header";
import MainTimeSiresBody from "../entities/Containers/InputTimeSiresContainer";
import TickerView from "../entities/TickerView";

export default function InputPage() {
    return (
        <Layout>
            <Head>
                <title>predict time series app</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header pageHeader="Home" pathLink="/" isBack={false} />
            <MainTimeSiresBody>
                <div className={inputPage.inputViewWrapper}>
                    <div className={inputPage.inputView}>
                        <TickerProvider>
                            <TickerView />
                        </TickerProvider>
                    </div>
                </div>
            </MainTimeSiresBody>
        </Layout>
    );
}
