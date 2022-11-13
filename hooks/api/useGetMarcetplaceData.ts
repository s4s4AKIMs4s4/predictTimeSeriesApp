import { useEffect } from "react"
import useSWR from "swr"
import { MockCryptoData } from "../../mockData"
import { TimeCryptoFunctionEnum } from "./apiModel"
import { API, fetcher } from "./apiUtils"

const useGetMarcetplaceData = (ticker:string) => {
    console.log('ticker')
    console.log(ticker)
    const { data, error } = useSWR(`${API}?function=${TimeCryptoFunctionEnum.DAILY}&symbol=${ticker}&market=CNY&apikey=${process.env.NEXT_PUBLIC_KRYPTO_KEY}`, fetcher)
    
    return {
        data:data,
        isLoading:!data && !error,
        isError:!error
    }
}
export default useGetMarcetplaceData