import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Stocks from "../CompanyInformation/Stocks.json";
import TickerSearch from "./Search/ViewCards/TickerSearch";
import { Heading, Input } from "@chakra-ui/react";
import { TickerContext } from "../Context/Models";
import TickerViewCss from "./TickerViewCss.module.css";
import useNavigate from "../features/useNavigate";
import useSearch, { IStockRenderData } from "../features/search/useSearch";

const TickerView: React.FC = () => {
    const { setTicker } = useContext(TickerContext);
    const { navigateToStatistickPage } = useNavigate();
    const [query, setQuery] = useState<string>("");
    const { filtredStockList, filterStocks } = useSearch();
    const inputRef = useRef<HTMLInputElement>()
    useEffect(() => {
        inputRef.current.focus()
    },[])

    const tickerClick =
        (ticker: string) => (e: React.MouseEvent<HTMLDivElement>) => {
            setTicker(ticker);
            navigateToStatistickPage(ticker);
        };

    const queryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        filterStocks(e.target.value);
    };

    const renderStockList = useMemo(
        () => {
            return filtredStockList.map((stock) => {
                return (
                    <div key={stock.ticker} onClick={tickerClick(stock.ticker)}>
                        <TickerSearch
                            projectName={stock.projectName}
                            ticker={stock.ticker}
                        />
                    </div>
                );
            });
        },
        [filtredStockList]
    );

    return (
        <>
            <Heading as="h1" textAlign={"center"} size="xl" noOfLines={3}>
                Choose a ticker
            </Heading>

            <div className={TickerViewCss.TickerPickWrapper}>
                <Input
                    ref={inputRef}
                    onChange={queryHandler}
                    value={query}
                    placeholder="type ticker or company name"
                />
                {renderStockList}
            </div>
        </>
    );
};

export default TickerView;
