import { KLineData } from "klinecharts"
import alphavantageCryptoDataAdapter from "./adapters/alphavantageCryptoDataAdapter"
import alphavantageStockDataAdapter from "./adapters/alphavantageStockDataAdapter"

export const generateChartDate = (data:any,isCrypro:boolean):KLineData[] => {
    if(data["Note"]) return null
    if(data["Error Message"]) return null
    const normalizedData = isCrypro ? alphavantageCryptoDataAdapter(data) : alphavantageStockDataAdapter(data)
    return normalizedData
}
