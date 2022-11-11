import React, { useEffect, useMemo, useRef, useState } from "react"
import CompanySearch from "./CompanySearch"
import { IStockCard } from "./TickerInput"
import ViewResultsCss from './ViewResults.module.css'

interface IViewResults {
    isOpen: boolean,
    stockCard: Array<IStockCard> | null;
    setStockCard: (value: Array<IStockCard> | null) => void
    changeActiveElement:(value:string) => void
}
const ViewResults: React.FC<IViewResults> = ({ isOpen, stockCard, setStockCard, changeActiveElement }) => {

    const currentTicker = useRef<string | null>(null)
    const companyClick = (ticker: string) => (e: React.MouseEvent<HTMLDivElement>) => {

        if (!currentTicker.current) {
            currentTicker.current = ticker
            changeActiveElement(ticker)
        }
        else {
            if (currentTicker.current !== ticker) {
                currentTicker.current = ticker
                changeActiveElement(ticker)
            }
        }

    }
    const searchCard = useMemo(() => {
        if (!stockCard) return <></>
        if (!isOpen) return <></>
        return stockCard.map(value => {
            return <div onMouseMove={companyClick(value.ticker)}>
                <CompanySearch isActice={value.isActice} projectName={value.projectName} ticker={value.ticker} />
            </div>
        })
    }, [stockCard, isOpen])

    useEffect(() => {

    }, [isOpen])
    return <div onClick={e => e.stopPropagation()} className={ViewResultsCss.ViewResultsWrapper}>
        {searchCard}
    </div>
}
export default ViewResults