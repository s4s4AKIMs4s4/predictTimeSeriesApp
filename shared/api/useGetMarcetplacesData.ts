import { useEffect } from "react"
import useSWR from "swr"
import { MockAppleData, MockCryptoData } from "../../mockData"
import { TimeCryptoFunctionEnum, TimeStockFunctionEnum } from "./apiModel"
import { API, fetcher } from "./apiUtils"
import { pickApiForHandle } from "./useGetMarcetplaceData"
import Stocks from '../../CompanyInformation/Stocks.json'

const useGetMarcetplacesData = (ticker: string, comparedTicker: string) => {
    console.log('ticker')
    console.log(ticker)
    // debugger
    if(!ticker ||  !comparedTicker) return [{
        dataTicker:null,
        isLoadingDataTicker:null,
        isErrorDataTicker:null
    },
    {
        dataTicker:null,
        isLoadingDataTicker:null,
        isErrorDataTicker:null
    }]


    const isNoteErrorDate = (data) => {
        if(data) {
            console.log(data)
            if(data['Note']){
                return true
            }
            return false
        }
    }

    const isCryproTicer = Stocks.find((value) => value.ticker === ticker).isCrypto
    const isCryproComparedTicer = Stocks.find((value) => value.ticker === comparedTicker).isCrypto

    const { data: dataTicker, error: errorTicker } = useSWR(
        pickApiForHandle(isCryproTicer, ticker), fetcher)
    const { data: comparedDataTicker, error: comparedErrorTicker } = useSWR(
        pickApiForHandle(isCryproComparedTicer, comparedTicker), fetcher)
    

    console.log('data')
    console.log(dataTicker)
    // const dataTicker = MockAppleData
    // const errorTicker = false
    // const comparedDataTicker = MockCryptoData
    // const comparedErrorTicker = false

    // TODO: rewrite to func style
    let noteError = isNoteErrorDate(dataTicker)
    let noteErrorCompared = isNoteErrorDate(comparedDataTicker)


    // const spec = dataTicker ?  dataTicker['NOTE'] : false
    console.log('noteError')
    console.log(noteError, noteErrorCompared )


    const isErrorDataTicker = errorTicker || noteError
    const isComparedErrorTicker = comparedErrorTicker ||  noteErrorCompared
    console.log('isErrorDataTicker, isComparedErrorTicker')
    console.log(isErrorDataTicker, isComparedErrorTicker)



    return [{
        dataTicker,
        isLoadingDataTicker: dataTicker && !errorTicker && !isErrorDataTicker,
        isErrorDataTicker: isErrorDataTicker,
    },
    {
        dataComparedTicker: comparedDataTicker,
        isLoadingComparedTicker: comparedDataTicker && !isComparedErrorTicker,
        isErrorCompared: isComparedErrorTicker
    }]
}
export default useGetMarcetplacesData
