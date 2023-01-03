import React from "react";
import Head from "next/head";
import Layout from "../entities/Layout";
import { useEffect, useRef, useState } from "react";
import KlineChart from "../widgets/chart/Analyzer";
import { Heading } from "@chakra-ui/react";
import Header from "../entities/Header";
import { UrlErrorEnum } from "./predict";
import inputPage from "./inputPage.module.css";
import StatickContainer from "../entities/Containers/StaticContainer";

const Statistic: React.FC = () => {
    const ticker = useRef<string | null>(null);
    const [parseUrlError, setParseUrlError] = useState<UrlErrorEnum>(
        UrlErrorEnum.NOT_DEFINED
    );

    useEffect(() => {
        const href = window.location.href;
        if (!href.match("ticker") && !href.match("=")) {
            setParseUrlError(UrlErrorEnum.ERROR);
            return;
        }
        ticker.current = href.split("=")[1];
        setParseUrlError(UrlErrorEnum.CORRECT);
    }, []);

    const renderChart = () => {
        if (parseUrlError === UrlErrorEnum.ERROR)
            return (
                <Heading as="h2" textAlign={"center"} size="xl" noOfLines={3}>
                    Error has ocurred
                </Heading>
            );
        if (parseUrlError === UrlErrorEnum.CORRECT)
            return (
                <>
                    <KlineChart ref={ticker} />
                </>
            );
        if (parseUrlError === UrlErrorEnum.NOT_DEFINED) return <></>;
    };

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header pageHeader="predictSeries" pathLink="/" isBack={true} />
            <StatickContainer>
                <div className={inputPage.inputViewWrapper}>
                    <div className={inputPage.inputView}>
                        <Heading
                            className={inputPage.inputView__header}
                            as="h1"
                            textAlign={"center"}
                            size="xl"
                            noOfLines={3}
                        >
                            Рыночная информация для {ticker.current}
                        </Heading>
                        {renderChart()}
                    </div>
                </div>
            </StatickContainer>
        </>
    );
};
export default Statistic;
