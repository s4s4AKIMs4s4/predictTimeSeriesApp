import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react"
import { TickerContext } from "../Context/Models";
import useNavigate from "../hooks/useNavigate";
import CompanySearch from "./CompanySearch"
import { IStockCard } from "./TickerInput"
import ViewResultsCss from './ViewResults.module.css'

interface IViewResults {
    isOpen: boolean,
    stockCard: Array<IStockCard> | null;
    setStockCard: (value: Array<IStockCard> | null) => void
    changeActiveElement:(value:string) => void
    setIsOpenView:(value:boolean) => void
    setInputText:(value:string) => void
}
const ViewResults: React.FC<IViewResults> = ({ isOpen, stockCard, setStockCard, setInputText, changeActiveElement, setIsOpenView }) => {
    const {setTicker} = useContext(TickerContext)
    const currentTicker = useRef<string | null>(null)
    const {navigateToPredictPage} = useNavigate()
    const companyMouseMoveHandler = (ticker: string) => (e: React.MouseEvent<HTMLDivElement>) => {
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

    const companyClick = (ticker: string) => (e:React.MouseEvent<HTMLDivElement>) => {
        setTicker(ticker)
        setIsOpenView(!isOpen)
        setInputText(ticker)
    }

    const searchCard = useMemo(() => {
        if (!stockCard) return <></>
        if (!isOpen) return <></>
        return stockCard.map(value => {
            return <div onClick = {companyClick(value.ticker)} onMouseMove={companyMouseMoveHandler(value.ticker)}>
                <CompanySearch isActice={value.isActice} projectName={value.projectName} ticker={value.ticker} />
            </div>
        })
    }, [stockCard, isOpen])

    return <div onClick={e => e.stopPropagation()} className={ViewResultsCss.ViewResultsWrapper}>
        {searchCard}
    </div>
}
export default ViewResults