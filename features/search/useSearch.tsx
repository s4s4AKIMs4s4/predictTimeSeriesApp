// import Stocks from "../CompanyInformation/Stocks.json";
import { useState } from "react";
import Stocks from "../../CompanyInformation/Stocks.json";
export interface IStockRenderData {
    projectName: string;
    ticker: string;
}
const useSearch = () => {
    const [filtredStockList, setFiltredStockList] = useState<
        Array<IStockRenderData>
    >(allStocks());

    function allStocks() {
        return Stocks.map((stock) => {
            return {
                projectName: stock.projectName,
                ticker: stock.ticker
            };
        });
    }

    const filterStocks = (query: string) => {
        if (!query)
            setFiltredStockList(allStocks());
        else{
            setFiltredStockList(
                Stocks.filter((stock) => {
                    const mathRegEx = new RegExp(query, "i");
                    return (
                        stock.ticker.match(mathRegEx) ||
                        stock.projectName.match(mathRegEx)
                    );
                })
            );
        }
    };

    return { filtredStockList, filterStocks };
};
export default useSearch;
