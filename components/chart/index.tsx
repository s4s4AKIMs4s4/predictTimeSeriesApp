import klinecharts from "klinecharts";
import { useEffect, useLayoutEffect } from "react"
import { generateDate } from "./date";
import { generateChartStyle, typeGraphEnum } from "./style";

const KlineChart:React.FC  = () => {
    
    useLayoutEffect(() => {
        const chart = klinecharts.init(`${'chart'}`);
        chart.setStyleOptions(generateChartStyle(typeGraphEnum.AREA))
        chart.applyNewData(generateDate());
        
    })
    
    return <div style = {{height:'400px'}} id = 'chart'>
        
    </div>
}

export default KlineChart