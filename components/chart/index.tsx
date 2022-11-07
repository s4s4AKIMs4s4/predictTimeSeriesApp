import klinecharts from "klinecharts";
import { useEffect, useLayoutEffect } from "react"
import { MockCryptoData } from "../../mockData";
import { generateCryptoDate } from "./date";
import { generateChartStyle, typeGraphEnum } from "./style";

const KlineChart:React.FC  = () => {
    // useGetMarcetplaceData()
    useLayoutEffect(() => {
        const chart = klinecharts.init(`${'chart'}`);
        chart.setStyleOptions(generateChartStyle(typeGraphEnum.AREA))
        generateCryptoDate()
        chart.applyNewData(generateCryptoDate());
        
    })
    
    return <div style = {{height:'400px'}} id = 'chart'>
        
    </div>
}

export default KlineChart