import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import useSWR from 'swr';
import { useEffect } from "react";

export interface IFirstPost{
    data:string
}

const FirstPost:React.FC<IFirstPost> = ({data}) => {
    // const { data, error } = useSWR('/api/user', fetch);
    useEffect(() => {
        console.log(data)
    },[])

    return <Layout>
        <Head>
            <title>First Post</title>
        </Head>
        <h1>First Post</h1>
        <h2>
            <Link href="/">← Back to home</Link>
        </h2>
    </Layout>
}

export async function getStaticProps() {
    const data = 'someData'  
    return {
      props: {data}
    }
  }

export default FirstPost  