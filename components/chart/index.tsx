import klinecharts, { Chart } from "klinecharts";
import { useEffect, useLayoutEffect, useRef } from "react"
import useKlineChart from "../../hooks/useKlineChart";
import { MockCryptoData } from "../../mockData";
import { generateCryptoDate } from "./date";
import { createCircle } from "./shapes/addShapes";
import { generateTemplateCircle } from "./shapes/circle";
import { generateChartStyle, typeGraphEnum } from "./style";

interface IDataChart{
    open:number,
    close:number,
    high:number,
    low:number,
    timestamp:number,
    volue?:number,
    turnover?:number,
}

export interface ChartProps {
    isPredicted:boolean,
    predictedValue:number
}

const KlineChart:React.FC<ChartProps>  = (props) => {
    const {drawPridctedValue,renderChart} = useKlineChart()

    useEffect(() => {
        if(props.isPredicted){
            drawPridctedValue(props.predictedValue)
        }
    },[props])
    useLayoutEffect(() => {
        renderChart()
    })

    return <div style = {{height:'400px'}} id = 'chart'/>
}

export default KlineChart