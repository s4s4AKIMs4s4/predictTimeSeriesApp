import { useEffect } from "react"
import useSWR from "swr"
import { MockCryptoData } from "../../mockData"
import { TimeCryptoFunctionEnum, TimeStockFunctionEnum } from "./apiModel"
import { API, fetcher } from "./apiUtils"

const useGetMarcetplaceData = (ticker:string,isCrypro:boolean) => {
    const pickApiForHandle = () => {
        const cryptoApi = `${API}?function=${TimeCryptoFunctionEnum.DAILY}&symbol=${ticker}&market=CNY&apikey=${process.env.NEXT_PUBLIC_KRYPTO_KEY}`
        const stockApi = `${API}?function=${TimeStockFunctionEnum.DAILY}&symbol=${ticker}&apikey=${process.env.NEXT_PUBLIC_KRYPTO_KEY}`
        if(isCrypro) return cryptoApi
        else return stockApi            
    }
    const { data, error } = useSWR(pickApiForHandle(), fetcher)
    
    return {
        data:data,
        isLoading:!data && !error,
        isError:!error
    }
}
export default useGetMarcetplaceData
