import useSWR from "swr";
import { TimeCryptoFunctionEnum, TimeStockFunctionEnum } from "./apiModel";
import { API, fetcher } from "./apiUtils";
import Stocks from "../../CompanyInformation/Stocks.json";

export const pickApiForHandle = (isCrypro: boolean, ticker) => {
    const cryptoApi = `${API}?function=${TimeCryptoFunctionEnum.DAILY}&symbol=${ticker}&market=CNY&apikey=${process.env.NEXT_PUBLIC_KRYPTO_KEY}`;
    const stockApi = `${API}?function=${TimeStockFunctionEnum.TIME_SERIES_WEEKLY}&symbol=${ticker}&apikey=${process.env.NEXT_PUBLIC_KRYPTO_KEY}`;
    if (isCrypro) return cryptoApi;
    else return stockApi;
};

const useGetMarcetplaceData = (ticker: string) => {
    const isCrypro = Stocks.find((value) => value.ticker === ticker)?.isCrypto;
    const { data, error } = useSWR(pickApiForHandle(isCrypro, ticker), fetcher);

    return {
        data: data,
        isLoading: !data && !error,
        isError: !error
    };
};
export default useGetMarcetplaceData;
