import Head from "next/head";
import Layout from "../components/Layout";
import { useEffect, useRef, useState } from "react";
import KlineChart from "../components/chart";
import { Heading } from "@chakra-ui/react";
import predictPageStyle from "./predictPage.module.css"
import Header from "../components/Header";
import MainTimeSiresBody from "../components/MainTimeSiresBody";
import PredictPageBody from "../components/PredictPageBody";

export interface IFirstPost {
    data: string
}

export enum UrlErrorEnum {
    NOT_DEFINED = 'NOT_DEFINED',
    ERROR = 'ERROR',
    CORRECT = 'CORRECT'
}

const FirstPost: React.FC<IFirstPost> = ({ data }) => {
    const ticker = useRef<string | null>(null)
    const [parseUrlError, setParseUrlError] = useState<UrlErrorEnum>(UrlErrorEnum.NOT_DEFINED)

    useEffect(() => {
        const href = window.location.href
        if (!href.match('ticker') && !href.match('=')) {
            setParseUrlError(UrlErrorEnum.ERROR)
            return
        }

        ticker.current = href.split('=')[1]
        setParseUrlError(UrlErrorEnum.CORRECT)
    }, [])

    const renderChart = () => {
        if (parseUrlError === UrlErrorEnum.ERROR) return <Heading as='h2' textAlign={'center'} size='xl' noOfLines={3}>
            Error has ocurred
        </Heading>
        if (parseUrlError === UrlErrorEnum.CORRECT) return <KlineChart ref={ticker} />
        if (parseUrlError === UrlErrorEnum.NOT_DEFINED) return <></>
    }

    return <Layout>
        <Head>
        <title> {ticker.current} predict </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Header pageHeader='predictSeries' pathLink='/' isBack = {true}/>
        <PredictPageBody>
            <div className={predictPageStyle.chartViewContainer}>
                <div className={predictPageStyle.chartView}>
                    <Heading as='h1' textAlign={'center'} size='xl' noOfLines={3}>
                        Predict time series for {ticker.current}
                    </Heading>
                    {renderChart()}
                </div>
            </div>
        </PredictPageBody>
    </Layout>
}

export async function getStaticProps() {
    const data = 'someData'
    return {
        props: { data }
    }
}

export default FirstPost  