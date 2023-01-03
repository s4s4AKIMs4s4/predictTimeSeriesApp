import { Button, Heading, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { TickerContext } from "../../Context/Models";
import TickerInput from "../../entities/Search/TickerInput";
import SearchViewCss from "./SearchView.module.css";
import { Link } from "@chakra-ui/react";
import useNavigate from "../../features/useNavigate";
import { TimePeriod } from "../../entities/Time/Model";


const SearchView: React.FC = () => {
    const { ticker, setTicker, setCompatedTicker, comparedTicker } =
        useContext(TickerContext);
    const [isCompareMode, setIsCompareMode] = useState<boolean>(false);
    const { navigateToComparePage } = useNavigate();

    const compareClickHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
        setIsCompareMode(!isCompareMode);
    };
    // useNavigate
    return (
        <div className={SearchViewCss.searchViewContainer}>
            <Heading as="h1" textAlign={"center"} size="xl" noOfLines={3}>
                Predict time series
            </Heading>
            <TickerInput
                setTicker={setTicker}
                placeholder={"Enter Ticker or company name"}
            />

            {isCompareMode && (
                <>
                    <TickerInput
                        setTicker={setCompatedTicker}
                        placeholder={"Enter Ticker compared Company"}
                    />
                    <form
                        onSubmit={(e: React.FormEvent) => {
                            e.preventDefault();
                        }}
                    >
                        <RadioGroup
                            name="time"
                            defaultValue={String(TimePeriod.THREE_DAYS)}
                        >
                            <HStack spacing="24px">
                                <Radio
                                    colorScheme="green"
                                    value={String(TimePeriod.THREE_DAYS)}
                                >
                                    Three Days
                                </Radio>
                                <Radio
                                    colorScheme="green"
                                    value={String(TimePeriod.WEEK)}
                                >
                                    Week
                                </Radio>
                            </HStack>
                        </RadioGroup>

                        <Button
                            type="submit"
                            // onClick={() => {
                            //
                            // }}
                            colorScheme="teal"
                            size="md"
                        >
                            Compare
                        </Button>
                    </form>
                </>
            )}

            <div className={SearchViewCss.searchViewContainer__linkWrapper}>
                <NextLink
                    legacyBehavior
                    passHref
                    href={{
                        pathname: "/predict",
                        query: { ticker: `${ticker}` }
                    }}
                >
                    <Link
                        className={
                            isCompareMode && SearchViewCss.link__disabled
                        }
                        color="teal.500"
                    >
                        predict
                    </Link>
                </NextLink>
                <NextLink
                    legacyBehavior
                    passHref
                    href={{
                        pathname: "/predict",
                        query: { ticker: `${ticker}` }
                    }}
                >
                    <Link
                        className={
                            isCompareMode && SearchViewCss.link__disabled
                        }
                        color="teal.500"
                    >
                        statistic
                    </Link>
                </NextLink>
                <span
                    className={SearchViewCss.fakeLink}
                    onClick={compareClickHandler}
                >
                    {!isCompareMode ? "compare" : "back"}
                </span>
            </div>
        </div>
    );
};
export default SearchView;
