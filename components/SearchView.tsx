import Link from "next/link"
import { useContext, useEffect } from "react"
import { TickerContext } from "../Context/Models"
import TickerInput from "./TickerInput"

const SearchView: React.FC = () => {
    const {ticker} = useContext(TickerContext)
    
    return <>
        <TickerInput />
        <Link href={{ pathname: '/predict', query: { ticker: `${ticker}` } }}>predict</Link>
    </>
}
export default SearchView