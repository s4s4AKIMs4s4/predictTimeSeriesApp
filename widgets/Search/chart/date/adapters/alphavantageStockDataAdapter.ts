import adapter from "./adapter"

//TODO: fix any
const alphavantageStockDataAdapter = (data:any) => {
    const {serializeTime} = adapter()
    // Weekly Time Series
    // Time Series (Daily)
    const StockEntyes = Object.entries( data["Weekly Time Series"])
    return StockEntyes.map(([timeStr,value]) => {
        const {year, mounth, day} = serializeTime(timeStr)
        const timestamp = new Date(year, mounth, day).getTime()

        const open = parseFloat(value['1. open'])
        const close = parseFloat(value['4. close'])
        const high = parseFloat(value['2. high'])
        const low = parseFloat(value['3. low'])

        return {
            open,
            close,
            high,
            low,
            timestamp    
        }
    })
}
export  default alphavantageStockDataAdapter