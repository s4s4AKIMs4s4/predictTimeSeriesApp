import adapter from "./adapter"

//TODO: fix any
const alphavantageCryptoDataAdapter = (data:any) => {
    const {serializeTime} = adapter()

    const cryptoEntyes = Object.entries( data["Time Series (Digital Currency Daily)"])
    return cryptoEntyes.map(([timeStr,value]) => {
        const {year, mounth, day} = serializeTime(timeStr)
        const timestamp = new Date(year, mounth, day).getTime()
        
        const open = parseFloat(value['1b. open (USD)'])
        const close = parseFloat(value['4b. close (USD)'])
        const high = parseFloat(value['2b. high (USD)'])
        const low = parseFloat(value['3b. low (USD)'])

        return {
            open,
            close,
            high,
            low,
            timestamp    
        }
    })
}
export  default alphavantageCryptoDataAdapter