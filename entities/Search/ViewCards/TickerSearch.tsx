import { Box } from "@chakra-ui/react";
import CompanySearchCss from "./CompanySearchCss.module.css";
import { IStockCard } from "./model";

const TickerSearch: React.FC<Omit<IStockCard, "isActice">> = ({
    projectName,
    ticker
}) => {
    return (
        <div>
            <Box
                className={`${CompanySearchCss.searchCard} ${CompanySearchCss.searchCard_inactice}`}
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
            >
                <Box p="1.5">
                    <Box
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        noOfLines={1}
                    >
                        {ticker}
                    </Box>
                    <Box>{projectName}</Box>
                </Box>
            </Box>
        </div>
    );
};
export default TickerSearch;
