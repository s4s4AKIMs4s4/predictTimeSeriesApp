import { MutableRefObject, useEffect, useLayoutEffect, useRef } from "react"
import useRLNetwork from "../../hooks/neraulNetwork/useRLNetwork";
import useKlineChart from "../../hooks/useKlineChart";
import React from 'react';

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

const KlineChart = React.forwardRef<string | null, any>((props,ref) => {
    const { drawPridctedValue, currentChartData } = useKlineChart((ref as MutableRefObject<any>).current)
    const { trainNetwork } = useRLNetwork()

    useEffect(() => {
        if(!currentChartData) return
        if(currentChartData.length === 0 ) return
        trainNetwork(currentChartData).then((predictValues: any) => {
            drawPridctedValue(predictValues)
        })
    }, [currentChartData])
    return <div style={{ height: '400px' }} id='chart' />
})

export default KlineChart