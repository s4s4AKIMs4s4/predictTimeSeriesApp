import React, { ReactElement, useContext, useEffect, useMemo } from "react";
import Stocks from "../CompanyInformation/Stocks.json";
import TickerSearch from "./Search/ViewCards/TickerSearch";
import { Button, Heading } from "@chakra-ui/react";
import { TickerContext } from "../Context/Models";
import TickerViewCss from "./TickerViewCss.module.css";
import useNavigate from "../features/useNavigate";

const TickerView: React.FC = () => {
    const { ticker, setTicker, setCompatedTicker, comparedTicker } =
        useContext(TickerContext);
    const { navigateToStatistickPage } = useNavigate();
    const tickerClick =
        (ticker: string) => (e: React.MouseEvent<HTMLDivElement>) => {
            setTicker(ticker);
            navigateToStatistickPage(ticker);
        };

    const allStocks = useMemo(() => {
        return Stocks.map((stock) => {
            return (
                <div onClick={tickerClick(stock.ticker)}>
                    <TickerSearch
                        projectName={stock.projectName}
                        ticker={stock.ticker}
                    />
                </div>
            );
        });
    }, []);

    return (
        <>
            <Heading as="h1" textAlign={"center"} size="xl" noOfLines={3}>
                Выберите тикер
            </Heading>
            <div className={TickerViewCss.TickerPickWrapper}>{allStocks}</div>
        </>
    );
};

export default TickerView;
