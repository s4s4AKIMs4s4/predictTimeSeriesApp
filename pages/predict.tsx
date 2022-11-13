import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import useSWR from 'swr';
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import KlineChart, { ChartProps } from "../components/chart";
import useGetMarcetplaceData from "../hooks/api/useGetMarcetplaceData";
import useRLNetwork from "../hooks/neraulNetwork/useRLNetwork";
import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

export interface IFirstPost {
    data: string
}

const FirstPost: React.FC<IFirstPost> = ({ data }) => {
    // const { prepareDate, trainNetwork, testComputeMax } = useRLNetwork()
    const router = useRouter()
    // useGetMarcetplaceData()
    const [predictState, setPredictState] = useState<ChartProps>(
        {
            isPredicted: false,
            predictedValue: 0,
        }
    )
    // const [ticker, setTicker] = useState<string | null>(null)
    const ticker = useRef<string | null>(null)
    useLayoutEffect(() => {
        console.log('window.location.href')
        console.log(window.location.href.split('=')[1])
        ticker.current = window.location.href.split('=')[1]
        // setTicker(window.location.href.split('=')[1])
        // testComputeMax()
        // trainNetwork().then((predictValues:any) => {
        //     console.log('predictValues')
        //     console.log(predictValues)
        //     setPredictState({
        //         isPredicted:true,
        //         predictedValue:predictValues
        //     })
        // }) 
    }, [])

    return <Layout>
        <Head>
            <title>Predict</title>
        </Head>

        <Heading as='h1' textAlign={'center'} size='2xl' noOfLines={3}>
            Predict time series
        </Heading>

        {/* Provide compare function  to Kline  */}
        <KlineChart ref = {ticker}/>
    </Layout>
}

export async function getStaticProps() {
    const data = 'someData'
    return {
        props: { data }
    }
}

export default FirstPost  