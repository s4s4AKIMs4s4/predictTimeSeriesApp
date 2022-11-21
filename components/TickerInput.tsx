import { Input } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import TickerInputCss from './TickerInputCss.module.css'
import ViewResults from "./ViewResults"
import useInput from "../hooks/useInput"

export interface IStockCard {
    ticker: string,
    projectName: string,
    isActice: boolean
}

const TickerInput: React.FC = () => {
    const { keyHandler,
        stockCard,
        setStockCard,
        isOpenView,
        setIsOpenView,
        searchedCompany,
        setSearchedCompany,
        changeInput,
        inputText,
        setInputText
    } = useInput()

    useEffect(() => {
        document.addEventListener('keydown', keyHandler)
        return () => {
            document.removeEventListener('keydown', keyHandler)
        }
    }, [stockCard, isOpenView])


    useEffect(() => {
        const closeSearch = () => {
            setIsOpenView(false)
        }
        document.addEventListener('click', closeSearch)

        return () => {
            document.removeEventListener('click', closeSearch)
        }
    }, [])

    const changeActiveElement = (ticker: string) => {
        const newStock = stockCard.map((value) => {
            const isActive = value.ticker === ticker
            return {
                ...value,
                isActice: isActive
            }
        })
        setStockCard(newStock)
    }

    return <div className={TickerInputCss.TickerInput}>
        <Input value = {inputText}  onChange={changeInput} placeholder='Enter Ticker or company name' />
        <ViewResults
            isOpen={isOpenView}
            stockCard={stockCard}
            setStockCard={setStockCard}
            changeActiveElement={changeActiveElement}
            setIsOpenView={setIsOpenView}
            setInputText = {setInputText} 
        />
    </div>
}
export default TickerInput