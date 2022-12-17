import Head from "next/head"
import Header from "../entities/Header"
import PredictPageBody from "../entities/Containers/PredictPageContainer";
import { Heading } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import StatickView from "../components/StatickView";
import { TimePeriod } from "../entities/Time/Model";

const getTickersFromUrl = () => {
    const href = window.location.href
    const findedlist = href.match(/=\w+/g)
    if (!findedlist) return []
    const ticerArray = findedlist.map((val) => val.replace('=', ''))
    return ticerArray
}

const comparePage: React.FC = () => {
    const [ticker, setTicker] = useState<string | null>(null)
    const [comparedTicker, setComparedTicker] = useState<string | null>(null)
    const [timePeriodO, setTimePeriodO] = useState<TimePeriod | null>(null)
    const [isError, setIsErorr] = useState<boolean>(false)

    useEffect(() => {
        const ticerArray = getTickersFromUrl()
        if (ticerArray.length < 3) {
            setIsErorr(true)
            return
        }
        setTicker(ticerArray[0])
        setComparedTicker(ticerArray[1])
        setTimePeriodO(parseInt(ticerArray[2]))
    }, [])

    return <>
        <Head>
            <title> compare </title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header pageHeader='predictSeries' pathLink='/' isBack={true} />
        
    </>
}
export default comparePage