import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import useSWR from 'swr';
import { useEffect } from "react";
import KlineChart from "../components/chart";
import useGetMarcetplaceData from "../hooks/api/useGetMarcetplaceData";

export interface IFirstPost{
    data:string
}

const FirstPost:React.FC<IFirstPost> = ({data}) => {
    useGetMarcetplaceData()

    useEffect(() => {
        // console.log('process.env.KRYPTO_KEY')
        // console.log(process.env.NEXT_PUBLIC_KRYPTO_KEY)
    },[])

    return <Layout>
        <Head>
            <title>First Post</title>
        </Head>
        <h1>First Post</h1>
        <h2>
            <Link href="/">← Back to home</Link>
        </h2>
        <KlineChart/>
    </Layout>
}

export async function getStaticProps() {
    const data = 'someData'  
    return {
      props: {data}
    }
  }

export default FirstPost  