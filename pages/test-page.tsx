import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import useSWR from 'swr';
import { useEffect, useState } from "react";
import KlineChart, { ChartProps } from "../components/chart";
import useGetMarcetplaceData from "../hooks/api/useGetMarcetplaceData";
import useRLNetwork from "../hooks/neraulNetwork/useRLNetwork";

export interface IFirstPost {
    data: string
}

const FirstPost: React.FC<IFirstPost> = ({ data }) => {
    const { prepareDate, trainNetwork, testComputeMax } = useRLNetwork()
    // useGetMarcetplaceData()
    const [predictState, setPredictState] = useState<ChartProps>(
        {
            isPredicted: false,
            predictedValue: 0,
        }
    )
    useEffect(() => {
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
            <title>First Post</title>
        </Head>
        <h1>First Post</h1>
        <h2>
            <Link href="/">← Back to home</Link>
        </h2>
        {/* Provide compare function  to Kline  */}
        <KlineChart {...{ ...predictState }} />
    </Layout>
}

export async function getStaticProps() {
    const data = 'someData'
    return {
        props: { data }
    }
}

export default FirstPost  