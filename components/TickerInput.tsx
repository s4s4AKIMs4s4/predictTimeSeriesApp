import { Input } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import TickerInputCss from './TickerInputCss.module.css'
import ViewResults from "./ViewResults"
import Stocks from "../CompanyInformation/Stocks.json"
import useNavigate from "../hooks/useNavigate"


export interface IStockCard {
    ticker: string,
    projectName: string,
    isActice: boolean
}

const TickerInput: React.FC = () => {
    const [isOpenView, setIsOpenView] = useState<boolean>(false)
    const [searchedCompany, setSearchedCompany] = useState<string>('')
    const [stockCard, setStockCard] = useState<Array<IStockCard> | null>(null)
    const {navigateToPredictPage} = useNavigate()

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if(e.key === 'Enter'){
                const currentTicker = stockCard.find((value) => value.isActice).ticker
                setIsOpenView(!isOpenView)
                // navigateToPredictPage(currentTicker)
            }
            if (e.key === 'ArrowDown') {
                let activeIndex: null | number | undefined = null
                const newStock = stockCard.map((value, index) => {
                    let isActive = false
                    if (activeIndex !== null && activeIndex !== undefined) {
                        isActive = true
                        activeIndex = undefined
                    }
                    else
                        isActive = false

                    if (value.isActice)
                        activeIndex = index
                    return {
                        ...value,
                        isActice: isActive
                    }
                })
                setStockCard(newStock)
            }

            if (e.key === 'ArrowUp') {
                let findedIndex: number = 0
                const findedfStocks = stockCard.find((value, index) => {
                    if (value.isActice) findedIndex = index
                    return value.isActice
                })
                if (findedIndex === 0) return
                const newStock = stockCard.map((value, index) => {
                    const isActive = index === (findedIndex - 1) ? true : false
                    
                    return{
                        ...value,
                        isActice:isActive
                    }
                })
                setStockCard(newStock)
            }
        }

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

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.value === '') {
            setIsOpenView(false)
            return
        }
        else {
            if (!isOpenView) setIsOpenView(true)
        }

        const filtredValues = Stocks.filter((value) => {
            return value.ticker.toLowerCase().includes(e.target.value.toLowerCase()) ||
                value.projectName.toLowerCase().includes(e.target.value.toLowerCase())
        })

        setStockCard(
            filtredValues.map((value, index) => {
                const isFirst = index === 0
                return {
                    ...value,
                    isActice: isFirst
                }
            })
        )
        setSearchedCompany(e.target.value)
    }

    return <div className={TickerInputCss.TickerInput}>
        <Input onChange={changeInput} placeholder='Enter Ticker or company name' />
        <ViewResults 
            isOpen={isOpenView} 
            stockCard={stockCard} 
            setStockCard={setStockCard} 
            changeActiveElement={changeActiveElement}
            setIsOpenView = {setIsOpenView} 
        />
    </div>
}
export default TickerInput