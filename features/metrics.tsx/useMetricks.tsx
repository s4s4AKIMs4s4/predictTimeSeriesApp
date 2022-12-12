import { useState } from "react"

export interface IStatickData {
    close:number,
    high:number,
    open:number
}


export interface IStatickDomainData{
    ticker: IStatickData,
    comparedTicker:IStatickData
}

const useMetricks = () => {
    const [max,setMax] = useState<number>(0)

    const getLastData = (data: klinecharts.KLineData[], numberOfDays: number) => {
        if(!data) return null
        const lastData:klinecharts.KLineData[] = []
        for(let i = 0;i < numberOfDays; i++){
            lastData.push(data[i])
        }
        return lastData
    }

    const generateLastTime = (data: klinecharts.KLineData[]) => {
        return data.map((value) => {
            return {
                ...value,
                timestamp:new Intl.DateTimeFormat('en-US').format(value.timestamp)
            }
        })
    }

    const getMSE = (data: klinecharts.KLineData[], numberOfDays: number, key: keyof klinecharts.KLineData) => {
        return data.reduce((acc ,value) => {
            return acc + value[key]
        }, 0)
    }

    function compareNumbers(a, b) {
        return a - b;
    }

    const getMode = (data: klinecharts.KLineData[], atribute:keyof klinecharts.KLineData) => {
        const modeAr = data.map((value) => value[atribute]).sort(compareNumbers)
        return modeAr[parseInt(modeAr.length / 2)]
    }


    const setMaxValue = (obj:IStatickData) => {
        const maxValue = Math.max(...Object.values(obj))
        setMax(maxValue)        
        // if(maxValue > max){
        //     setMax(maxValue)
        // }
    }

    const getModStatistic = (data: klinecharts.KLineData[], numberOfDays:number) => {
        const lastData = getLastData(data, numberOfDays)
        const close = getMode(lastData,'close')
        const high = getMode(lastData,'high')
        const open = getMode(lastData,'open')
        const obj = { close, high, open}
        setMaxValue(obj)
        return {
            close,
            high,
            open,
        }
    
    }

    const getStaticsValue = (data: klinecharts.KLineData[], numberOfDays: number) : IStatickData => {
        const lastData = getLastData(data, numberOfDays)
        const close = getMSE(lastData, numberOfDays, 'close')
        const volume = getMSE(lastData, numberOfDays, 'volume')
        const high = getMSE(lastData, numberOfDays, 'high')
        const open = getMSE(lastData, numberOfDays, 'open')
        const obj = { close, high, open}
        setMaxValue(obj)
        return obj
    }



    return {
        getStaticsValue,
        getMSE,
        max,
        getLastData,
        getModStatistic,
        generateLastTime
    }
}
export default useMetricks