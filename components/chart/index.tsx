import klinecharts, { Chart } from "klinecharts";
import { useEffect, useLayoutEffect, useRef } from "react"
import { MockCryptoData } from "../../mockData";
import { generateCryptoDate } from "./date";
import { createCircle } from "./shapes/addShapes";
import { generateTemplateCircle } from "./shapes/circle";
import { generateChartStyle, typeGraphEnum } from "./style";

export interface IDataChart{
    open:number,
    close:number,
    high:number,
    low:number,
    timestamp:number,
    volue?:number,
    turnover?:number,
}


const KlineChart:React.FC  = () => {
    const currentChartData = useRef<Array<IDataChart>>([])
    const currentChartObj = useRef<Chart | null>(null)

    // useGetMarcetplaceData()
    useLayoutEffect(() => {
        const chart = klinecharts.init(`${'chart'}`);
        chart.setStyleOptions(generateChartStyle(typeGraphEnum.AREA))
        generateCryptoDate()

        currentChartData.current = generateCryptoDate()
        chart.applyNewData(currentChartData.current);
        chart.addShapeTemplate(generateTemplateCircle())
        console.log('dataIndex')
        console.log(currentChartData.current.length - 1)
        console.log(  currentChartData.current.length - 1)
        chart.createTechnicalIndicator(' ', true, {id: 'candle_pane', dragEnabled: true,})
        const dataIndex = currentChartData.current.length - 1
        chart.createShape(
            createCircle(dataIndex + 7, 300),
            'candle_pane',
        )
    })

    
    
    return <div style = {{height:'400px'}} id = 'chart'>
        
    </div>
}

export default KlineChart