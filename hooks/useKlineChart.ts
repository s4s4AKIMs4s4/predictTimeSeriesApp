import klinecharts, { Chart } from "klinecharts"
import { useEffect, useRef, useState } from "react"
import { generateChartDate } from "../components/chart/date"
import { createCircle } from "../components/chart/shapes/addShapes"
import { generateTemplateCircle } from "../components/chart/shapes/circle"
import { generateChartStyle, typeGraphEnum } from "../components/chart/style"
import useGetMarcetplaceData from "./api/useGetMarcetplaceData"
import Stocks from '../CompanyInformation/Stocks.json'

export interface IDataChart {
    open: number,
    close: number,
    high: number,
    low: number,
    timestamp: number,
    volue?: number,
    turnover?: number,
}

interface IKlineProps {
    ticker: string,
    netWorkIsLoading: boolean
}
// netWorkIsLoading
const useKlineChart = ({ ticker, netWorkIsLoading }: IKlineProps) => {
    const isCrypro = useRef<boolean>(Stocks.find((value) => value.ticker === ticker).isCrypto)
    const { data, isLoading } = useGetMarcetplaceData(ticker, isCrypro.current)
    const [currentChartData, setCurrentChartData] = useState<Array<IDataChart>>([])
    const currentChartObj = useRef<Chart | null>(null)

    useEffect(() => {
        if (isLoading) return
        genetateChartData()
    }, [isLoading])

    const genetateChartData = () => {
        const Kdata = generateChartDate(data, isCrypro.current)
        setCurrentChartData(Kdata)
    }

    const addToChartCircle = (dataIndex: number, price: number) => {
        currentChartObj.current.createTechnicalIndicator(' ', true, { id: 'candle_pane', dragEnabled: true, })
        currentChartObj.current.createShape(
            createCircle(dataIndex, price),
            'candle_pane',
        )
    }
    const drawPridctedValue = (predictValue) => {
        addToChartCircle(currentChartData.length, predictValue)
    }
    const renderChart = (predictValue) => {
        const chart = klinecharts.init(`${'chart'}`);
        currentChartObj.current = chart
        chart.setStyleOptions(generateChartStyle(typeGraphEnum.AREA))
        chart.applyNewData(currentChartData);
        chart.addShapeTemplate(generateTemplateCircle())
        drawPridctedValue(predictValue)
    }
    return {
        renderChart,
        addToChartCircle,
        drawPridctedValue,
        currentChartData,
    }
}
export default useKlineChart