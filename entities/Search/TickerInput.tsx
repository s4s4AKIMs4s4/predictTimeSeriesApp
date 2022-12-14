import { Input } from "@chakra-ui/react";
import React, { useEffect } from "react";
import TickerInputCss from "./TickerInputCss.module.css";
import ViewResults from "./ViewCards/ViewResults";
import useInput from "../../features/input/useInput";
import { ITickerInput } from "./model";

const TickerInput: React.FC<ITickerInput> = ({ placeholder, setTicker }) => {
    const {
        keyHandler,
        stockCard,
        setStockCard,
        isOpenView,
        setIsOpenView,
        changeInput,
        inputText,
        setInputText
    } = useInput(setTicker);

    useEffect(() => {
        document.addEventListener("keydown", keyHandler);
        return () => {
            document.removeEventListener("keydown", keyHandler);
        };
    }, [stockCard, isOpenView]);

    useEffect(() => {
        const closeSearch = () => {
            setIsOpenView(false);
        };
        document.addEventListener("click", closeSearch);

        return () => {
            document.removeEventListener("click", closeSearch);
        };
    }, []);

    const changeActiveElement = (ticker: string) => {
        const newStock = stockCard.map((value) => {
            const isActive = value.ticker === ticker;
            return {
                ...value,
                isActice: isActive
            };
        });
        setStockCard(newStock);
    };

    return (
        <div className={TickerInputCss.TickerInput}>
            <Input
                value={inputText}
                onChange={changeInput}
                placeholder={placeholder}
            />
            <ViewResults
                setTicker={setTicker}
                isOpen={isOpenView}
                stockCard={stockCard}
                setStockCard={setStockCard}
                changeActiveElement={changeActiveElement}
                setIsOpenView={setIsOpenView}
                setInputText={setInputText}
            />
        </div>
    );
};
export default React.memo(TickerInput);
