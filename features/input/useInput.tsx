import { useContext, useState } from "react";
import useNavigate from "../useNavigate";
import Stocks from "../../CompanyInformation/Stocks.json";
import { IStockCard } from "../../entities/Search/ViewCards/model";
import { TickerContext } from "../../Context/Models";

const useInput = (setTicker) => {
    const [stockCard, setStockCard] = useState<Array<IStockCard> | null>(null);
    const [isOpenView, setIsOpenView] = useState<boolean>(false);
    const { navigateToPredictPage } = useNavigate();
    const [searchedCompany, setSearchedCompany] = useState<string>("");
    const [limitInputResult, setLimitInputResult] = useState<number>(4);
    const [inputText, setInputText] = useState<string>("");

    const upArrowHandle = () => {
        let findedIndex: number = 0;
        const findedfStocks = stockCard.find((value, index) => {
            if (value.isActice) findedIndex = index;
            return value.isActice;
        });
        if (findedIndex === -1) return;

        const newStock: Array<IStockCard> = [];
        let isFirstActive = false;
        for (let i = 0; i < stockCard.length; i++) {
            let isActive = i === (findedIndex || 1) - 1 ? true : false;
            if (findedIndex === 0 && isActive) {
                isFirstActive = true;
                isActive = false;
            }
            newStock[i] = {
                ...stockCard[i],
                isActice: isActive
            };
            if (i === stockCard.length - 1 && isFirstActive) {
                newStock[i].isActice = true;
            }
        }
        setStockCard(newStock);
    };

    const downArrowHandle = () => {
        let activeIndex: null | number | undefined = null;
        const newStock: Array<IStockCard> = [];
        let isActive: boolean = false;
        for (let i = 0; i < stockCard.length; i++) {
            newStock[i] = {
                ...stockCard[i],
                isActice: isActive
            };
            if (stockCard[i].isActice) {
                if (i === stockCard.length - 1) {
                    newStock[0].isActice = true;
                    continue;
                }
                isActive = true;
            } else isActive = false;
        }
        setStockCard(newStock);
    };
    const keyHandler = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            const currentTicker = stockCard.find(
                (value) => value.isActice
            ).ticker;
            setInputText(currentTicker);
            setIsOpenView(!isOpenView);
            setTicker(currentTicker);
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            downArrowHandle();
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            upArrowHandle();
        }
    };

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "ArrowUp") return;
        setInputText(e.target.value);

        if (e.target.value === "") {
            setIsOpenView(false);
            return;
        } else if (!isOpenView) setIsOpenView(true);

        const filtredValues = Stocks.filter((value) => {
            return (
                value.ticker
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                value.projectName
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            );
        });
        setStockCard(
            filtredValues
                .filter((_, index) => index < limitInputResult)
                .map((value, index) => {
                    const isFirst = index === 0;
                    return {
                        ...value,
                        isActice: isFirst
                    };
                })
        );
        setSearchedCompany(e.target.value);
    };

    return {
        keyHandler,
        stockCard,
        setStockCard,
        isOpenView,
        setIsOpenView,
        searchedCompany,
        setSearchedCompany,
        changeInput,
        inputText,
        setInputText
    };
};
export default useInput;
