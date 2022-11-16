import { Badge, Box, Heading, Image } from "@chakra-ui/react"
import CompanySearchCss from './CompanySearchCss.module.css'
import { IStockCard } from "./TickerInput"

const CompanySearch: React.FC<IStockCard> = ({ isActice, projectName, ticker }) => {

    return <div className={CompanySearchCss.searchCard}>
        <Box
            // bg='white'
            className = {
                `${CompanySearchCss.searchCard} 
                 ${ isActice ? CompanySearchCss.searchCard_actice : CompanySearchCss.searchCard_inactice}`}
            maxW='sm'
            borderWidth='1px'
            borderRadius='lg'
            overflow='hidden'>
            <Box p='1.5'>
                <Box
                    fontWeight='semibold'
                    as='h4'
                    lineHeight='tight'
                    noOfLines={1}
                >
                    {ticker}
                </Box>
                <Box>
                    {projectName}
                </Box>
            </Box>
        </Box>
    </div>
}
export default CompanySearch