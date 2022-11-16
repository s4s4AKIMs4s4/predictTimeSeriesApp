import { Heading } from "@chakra-ui/react"
import Link from "next/link"
import { useContext, useEffect } from "react"
import { TickerContext } from "../Context/Models"
import TickerInput from "./TickerInput"
import SearchViewCss from "./SearchView.module.css"
const SearchView: React.FC = () => {
    const { ticker } = useContext(TickerContext)
    return <div className = {SearchViewCss.searchViewContainer}>
        <Heading as='h1' textAlign={'center'} size='xl' noOfLines={3}>
            Predict time series
        </Heading>
        <TickerInput />
        <div className = {SearchViewCss.searchViewContainer__linkWrapper}>
            <Link href={{ pathname: '/predict', query: { ticker: `${ticker}` } }}> predict </Link>
            <Link href={{ pathname: '/predict', query: { ticker: `${ticker}` } }}> statistic </Link>
        </div>
    </div>
}
export default SearchView