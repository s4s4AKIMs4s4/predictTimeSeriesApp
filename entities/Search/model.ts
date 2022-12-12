import { IStockCard } from "./ViewCards/model";

export interface IViewResults {
    isOpen: boolean,
    stockCard: Array<IStockCard> | null;
    setStockCard: (value: Array<IStockCard> | null) => void
    changeActiveElement:(value:string) => void
    setIsOpenView:(value:boolean) => void
    setInputText:(value:string) => void,
    setTicker:(picedTicer: string) => void
}

export interface ITickerInput {
    placeholder: string,
    setTicker:(picedTicer: string) => void
}