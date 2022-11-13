import { KLineData } from "klinecharts"
import { MockCryptoData,MochETHData } from "../../../mockData"
import alphavantageDataAdapter from "./adapters/alphavantageDataAdapter"

export const generateCryptoDate = (data:any):KLineData[] => {
    if(data["Note"]) return null
    if(data["Error Message"]) return null
    const normalizedData = alphavantageDataAdapter(data)
    return normalizedData
}
