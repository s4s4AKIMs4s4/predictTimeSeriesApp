import React, { useEffect, useState } from "react";
import useGetMarcetplacesData from "../shared/api/useGetMarcetplacesData";
import Stocks from "../CompanyInformation/Stocks.json";
import useMetricks, {
    IStatickDomainData
} from "../features/metrics.tsx/useMetricks";
import useStatickChart from "../features/statickCharts/useStatikChart";
import { flexbox, Heading, Select } from "@chakra-ui/react";
import SynchronizationChart from "../entities/StatickCharts/SynchronizationChart";
import RadarChartView from "../entities/StatickCharts/RadarChartView";
import StatickChartStyles from "./StatickChartStyles.module.css";

export interface ISubPage {
    ticker: string;
    comparedTicker: string;
    timePeriodO: number;
}

export interface ILastDate {
    ticker: klinecharts.KLineData[];
    comapredTicker: klinecharts.KLineData[];
}
export enum domainFunctionEnum {
    MSE = "MSE",
    MODA = "MODA"
}

export enum lastDataEnum {
    CLOSE = "close",
    HIGH = "high",
    OPEN = "open"
}

const StatickView: React.FC<ISubPage> = ({
    ticker,
    comparedTicker,
    timePeriodO
}) => {
    const isCryproTicer = Stocks.find(
        (value) => value.ticker === ticker
    ).isCrypto;
    const isCryproComparedTicer = Stocks.find(
        (value) => value.ticker === comparedTicker
    ).isCrypto;

    const {
        getMSE,
        getStaticsValue,
        max,
        getLastData,
        getModStatistic,
        generateLastTime
    } = useMetricks();
    const { getDomainRadarData } = useStatickChart();
    const [domainFunction, setDomainFunciton] = useState<domainFunctionEnum>(
        domainFunctionEnum.MSE
    );
    const [lastData, setLastData] = useState<ILastDate>();
    const [lastDataFunciton, setLastDataFunciton] = useState<lastDataEnum>(
        lastDataEnum.CLOSE
    );
    const [radarData, setRadarData] =
        useState<Array<{ [key: string]: string | number }>>();
    const [
        { dataTicker, isLoadingDataTicker, isErrorDataTicker },
        { dataComparedTicker, isLoadingComparedTicker, isErrorCompared }
    ] = useGetMarcetplacesData(ticker, comparedTicker);

    const getStaticsFunction = () => {
        if (domainFunction === domainFunctionEnum.MSE) return getStaticsValue;
        else if (domainFunction === domainFunctionEnum.MODA)
            return getModStatistic;
        else return null;
    };

    const getStatistickCompareObject = (
        KdataTicker: klinecharts.KLineData[],
        KdataCompareTicker: klinecharts.KLineData[]
    ) => {
        const statickFunction = getStaticsFunction();
        return {
            ticker: statickFunction(KdataTicker, timePeriodO),
            comparedTicker: statickFunction(KdataCompareTicker, timePeriodO)
        };
    };

    useEffect(() => {
        // if (isLoadingComparedTicker && isLoadingComparedTicker) {
        //     const KdataTicker = generateChartDate(dataTicker, isCryproTicer)
        //     const KdataCompareTicker = generateChartDate(dataComparedTicker, isCryproComparedTicer)
        //     const domainData: IStatickDomainData = getStatistickCompareObject(KdataTicker, KdataCompareTicker)
        //     setRadarData(getDomainRadarData(domainData, ticker, comparedTicker))
        //     setLastData({
        //         ticker: generateLastTime(getLastData(KdataTicker, timePeriodO)),
        //         comapredTicker: generateLastTime(getLastData(KdataCompareTicker, timePeriodO))
        //     })
        // }
    }, [
        dataTicker,
        dataComparedTicker,
        isLoadingDataTicker,
        isLoadingComparedTicker,
        domainFunction
    ]);

    const changeSelectDomain = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDomainFunciton(e.currentTarget.value as domainFunctionEnum);
    };

    const changeSelectLast = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLastDataFunciton(e.currentTarget.value as lastDataEnum);
    };

    return (
        <>
            {isErrorCompared || isErrorDataTicker ? (
                <>Too match request</>
            ) : (
                <>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column"
                        }}
                    >
                        <div style={{ width: "100%", height: "500px" }}>
                            <Heading
                                as="h2"
                                className={
                                    StatickChartStyles.radarСharsView__item
                                }
                                textAlign={"center"}
                                size="xl"
                                noOfLines={3}
                            >
                                Domain Chart
                            </Heading>

                            <Select
                                className={
                                    StatickChartStyles.radarСharsView__item
                                }
                                onChange={changeSelectDomain}
                                defaultValue={domainFunctionEnum.MODA}
                                size="md"
                            >
                                <option value={domainFunctionEnum.MODA}>
                                    moda
                                </option>
                                <option value={domainFunctionEnum.MSE}>
                                    mse
                                </option>
                            </Select>

                            {radarData && max && (
                                <RadarChartView
                                    comparedTicker={comparedTicker}
                                    radarData={radarData}
                                    max={max}
                                    ticker={ticker}
                                />
                            )}
                        </div>

                        <Heading
                            className={
                                StatickChartStyles.synchronizationView__header
                            }
                            as="h2"
                            textAlign={"center"}
                            size="xl"
                            noOfLines={3}
                        >
                            Synchronization charts
                        </Heading>

                        <Select
                            className={
                                StatickChartStyles.synchronizationView__item
                            }
                            onChange={changeSelectLast}
                            defaultValue={lastDataEnum.CLOSE}
                            size="md"
                        >
                            <option value={lastDataEnum.CLOSE}>close</option>
                            <option value={lastDataEnum.HIGH}>high</option>
                            <option value={lastDataEnum.OPEN}>open</option>
                        </Select>

                        {lastData && max && (
                            <SynchronizationChart
                                ticker={ticker}
                                comparedTicker={comparedTicker}
                                lastData={lastData}
                                lastDataFunciton={lastDataFunciton}
                            />
                        )}
                    </div>
                </>
            )}
        </>
    );
};
export default React.memo(StatickView);
