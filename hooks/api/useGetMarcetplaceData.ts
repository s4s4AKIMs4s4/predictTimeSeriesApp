import useSWR from "swr"
import { TimeCryptoFunctionEnum } from "./apiModel"
import { API, fetcher } from "./apiUtils"

const useGetMarcetplaceData = () => {
    const { data, error } = useSWR(`${API}?function=${TimeCryptoFunctionEnum.DAILY}&symbol=BTC&market=CNY&apikey=${process.env.NEXT_PUBLIC_KRYPTO_KEY}`, fetcher)
    console.log('data')
    console.log(data)
    console.log('error')
    console.log(error)
}
export default useGetMarcetplaceData