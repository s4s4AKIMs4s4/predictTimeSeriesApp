import klinecharts, { Chart } from "klinecharts"
import { useRef } from "react"
import { generateCryptoDate } from "../components/chart/date"
import { createCircle } from "../components/chart/shapes/addShapes"
import { generateTemplateCircle } from "../components/chart/shapes/circle"
import { generateChartStyle, typeGraphEnum } from "../components/chart/style"

interface IDataChart {
    open: number,
    close: number,
    high: number,
    low: number,
    timestamp: number,
    volue?: number,
    turnover?: number,
}

const useKlineChart = () => {
    const currentChartData = useRef<Array<IDataChart>>([])
    const currentChartObj = useRef<Chart | null>(null)

    const addToChartCircle = (dataIndex:number,price:number) => {
        currentChartObj.current.createTechnicalIndicator(' ', true, {id: 'candle_pane', dragEnabled: true,})
        currentChartObj.current.createShape(
            createCircle(dataIndex, price),
            'candle_pane',
        )
    }
    const drawPridctedValue = (predictValue) => {
        addToChartCircle(currentChartData.current.length, predictValue)
    }
    const renderChart = () => {
        const chart = klinecharts.init(`${'chart'}`);
        currentChartObj.current = chart
        chart.setStyleOptions(generateChartStyle(typeGraphEnum.AREA))
        currentChartData.current = generateCryptoDate()
        chart.applyNewData(currentChartData.current);
        chart.addShapeTemplate(generateTemplateCircle())
    }
    return {
        renderChart,
        addToChartCircle,
        drawPridctedValue
    }
}
export default useKlineChart