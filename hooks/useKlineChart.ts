import klinecharts, { Chart } from "klinecharts"
import { useEffect, useRef, useState } from "react"
import { generateCryptoDate } from "../components/chart/date"
import { createCircle } from "../components/chart/shapes/addShapes"
import { generateTemplateCircle } from "../components/chart/shapes/circle"
import { generateChartStyle, typeGraphEnum } from "../components/chart/style"
import useGetMarcetplaceData from "./api/useGetMarcetplaceData"

export interface IDataChart {
    open: number,
    close: number,
    high: number,
    low: number,
    timestamp: number,
    volue?: number,
    turnover?: number,
}

const useKlineChart = (ticker:string) => {
    const {data, isLoading} = useGetMarcetplaceData(ticker)
    const [currentChartData, setCurrentChartData] = useState<Array<IDataChart>>([])
    const currentChartObj = useRef<Chart | null>(null)

    useEffect(() => {
        renderChart()
    },[isLoading])

    const addToChartCircle = (dataIndex:number,price:number) => {
        currentChartObj.current.createTechnicalIndicator(' ', true, {id: 'candle_pane', dragEnabled: true,})
        currentChartObj.current.createShape(
            createCircle(dataIndex, price),
            'candle_pane',
        )
    }
    const drawPridctedValue = (predictValue) => {
        addToChartCircle(currentChartData.length, predictValue)
    }
    const renderChart = () => {
        if(isLoading) return 
        const chart = klinecharts.init(`${'chart'}`);
        currentChartObj.current = chart
        chart.setStyleOptions(generateChartStyle(typeGraphEnum.AREA))
        const Cdata = generateCryptoDate(data)
        setCurrentChartData(Cdata)
        
        chart.applyNewData(Cdata);
        chart.addShapeTemplate(generateTemplateCircle())
    }
    return {
        renderChart,
        addToChartCircle,
        drawPridctedValue,
        currentChartData,
    }
}
export default useKlineChart