import { Heading } from "@chakra-ui/react"
import NextLink from "next/link"
import { useContext, useEffect } from "react"
import { TickerContext } from "../Context/Models"
import TickerInput from "./TickerInput"
import SearchViewCss from "./SearchView.module.css"
import { Link } from '@chakra-ui/react'

const SearchView: React.FC = () => {
    const { ticker } = useContext(TickerContext)
    return <div className={SearchViewCss.searchViewContainer}>
        <Heading as='h1' textAlign={'center'} size='xl' noOfLines={3}>
            Predict time series
        </Heading>
        <TickerInput />
        <div className={SearchViewCss.searchViewContainer__linkWrapper}>
            {/* <NextLink href='...' legacyBehavior passHref> */}

            <NextLink legacyBehavior passHref href={{ pathname: '/predict', query: { ticker: `${'BTC'}` } } }>
                <Link  color='teal.500'>
                    predict
                </Link>
            </NextLink>
            <NextLink legacyBehavior passHref href={{ pathname: '/predict', query: { ticker: `${'BTC'}` } }}>
                <Link  color='teal.500'>
                    statistic
                </Link>
            </NextLink>
        </div>
    </div>
}
export default SearchView