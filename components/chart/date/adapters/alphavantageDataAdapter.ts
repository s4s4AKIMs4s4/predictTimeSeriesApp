//TODO: fix any
const alphavantageDataAdapter = (data:any) => {
    const serializeTime = (timeStr:string): {year:number, mounth:number, day:number} => {
        const arrayStringTime = timeStr.split('-')
        const year = parseInt(arrayStringTime[0])
        const mounth = parseInt(arrayStringTime[1])
        const day = parseInt(arrayStringTime[2])
        return {year, mounth, day}
    }

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
export  default alphavantageDataAdapter