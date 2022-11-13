import Head from "next/head";
import Layout from "../components/Layout";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import KlineChart, { ChartProps } from "../components/chart";
import { Heading } from "@chakra-ui/react";

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
            <title>Predict</title>
        </Head>
        
        <Heading as='h1' textAlign={'center'} size='2xl' noOfLines={3}>
            Predict time series
        </Heading>

        { renderChart() }
    </Layout>
}

export async function getStaticProps() {
    const data = 'someData'
    return {
        props: { data }
    }
}

export default FirstPost  