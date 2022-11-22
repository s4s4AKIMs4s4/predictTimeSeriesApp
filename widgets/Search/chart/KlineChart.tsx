import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react"
import useRLNetwork from "../../../features/neraulNetwork/useRLNetwork";
import useKlineChart from "../../../features/chart/useKlineChart";
import React from 'react';
import { CircularProgress, Heading } from "@chakra-ui/react";

interface IDataChart {
    open: number,
    close: number,
    high: number,
    low: number,
    timestamp: number,
    volue?: number,
    turnover?: number,
}

export interface ChartProps {
    isPredicted: boolean,
    predictedValue: number,
    ticker?: string | null
}

const KlineChart = React.forwardRef<string | null, any>((props, ref) => {
    const [netWorkIsLoading, setNetWorkIsLoading] = useState<boolean>(true)
    const { drawPridctedValue, currentChartData, renderChart } = useKlineChart(
        {
            ticker: (ref as MutableRefObject<any>).current,
            netWorkIsLoading
        }
    )
    const [predictValues, setpredictValues] = useState<number | null>(null)
    const { trainNetwork, inputEpoch } = useRLNetwork()
    const [circularProgressValue, setCircularProgressValue] = useState<number>(0)

    const calculateChartProgress = (epoch, log, params) => {
        const progressValue = ((epoch + 1) * 100) / inputEpoch
        console.log(epoch)
        console.log(log)
        console.log(params)
        console.log(progressValue)
        setCircularProgressValue(progressValue)
    }

    useEffect(() => {
        if(predictValues !== null && !netWorkIsLoading){
            renderChart(predictValues)
        }
    },[netWorkIsLoading, predictValues])

    useEffect(() => {
        if (!currentChartData) return
        if (currentChartData.length === 0) return
        trainNetwork(currentChartData, calculateChartProgress).then((predictValues: any) => {
            setpredictValues(predictValues)
            setNetWorkIsLoading(false)
        })
    }, [currentChartData])
    return <>
        {
            netWorkIsLoading ? <>
                <CircularProgress value = {circularProgressValue}/>
                <Heading as='h2' textAlign={'center'} size='sm' noOfLines={3}>
                    Calculating feature value...
                </Heading>
            </>
                : <>
                    <div style={{ height: '400px', width: '100%', padding: '0 17px' }} id='chart' />
                </>
        }

    </>
})

export default KlineChart