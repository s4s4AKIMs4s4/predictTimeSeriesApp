import React, { useEffect, useState } from "react";
import useKlineChart from "../../features/chart/useKlineChart";
import KlineChartCss from "./KlineChartCss.module.css";
import { typeGraphEnum } from "./style";
import { IMainTechnicalIndicatorTypes } from "./Analyzer";
import { Center, Divider, Text } from "@chakra-ui/react";

export interface IPredictedChart {
    netWorkIsLoading: boolean;
    ticker: string;
    predictValues: number | null;
    windowSize: number;
    chartData: Omit<ReturnType<typeof useKlineChart>, "addToChartCircle">;
}

const Chart: React.FC<IPredictedChart> = ({
    chartData,
    predictValues,
    netWorkIsLoading,
    ticker,
    windowSize
}) => {
    useEffect(() => {
        if (predictValues)
            chartData.drawPridctedValue(predictValues, windowSize);
    }, [predictValues]);

    useEffect(() => {
        if (chartData.isDataLoaded) chartData.renderChart({});
    }, [chartData.isDataLoaded]);

    const [mainTechnicalIndicatorTypes, setMainTechnicalIndicatorTypes] =
        useState<Array<IMainTechnicalIndicatorTypes>>([
            {
                isActice: false,
                name: "MA"
            },
            {
                isActice: false,
                name: "EMA"
            },
            {
                isActice: false,
                name: "SAR"
            },
            {
                isActice: false,
                name: "MACD"
            },
            {
                isActice: false,
                name: "KDJ"
            }
        ]);

    const [chartType, setChartType] = useState<
        Array<IMainTechnicalIndicatorTypes & { value: typeGraphEnum }>
    >([
        {
            isActice: true,
            name: "area",
            value: typeGraphEnum.AREA
        },
        {
            isActice: false,
            name: "candle",
            value: typeGraphEnum.CANDLE
        }
    ]);

    const ChangeIndicatorHandler = (indicatorName: string) => (e: any) => {
        setMainTechnicalIndicatorTypes(
            mainTechnicalIndicatorTypes.map((indicator) => {
                const isCurrentIndicator = indicator.name === indicatorName;
                if (isCurrentIndicator) {
                    if (indicator.isActice) {
                        chartData.currentChartObj.current.removeTechnicalIndicator(
                            "candle_pane",
                            indicatorName
                        );
                    } else {
                        chartData.currentChartObj.current.createTechnicalIndicator(
                            indicatorName,
                            true,
                            { id: "candle_pane" }
                        );
                    }
                    return {
                        ...indicator,
                        isActice: !indicator.isActice
                    };
                }

                return {
                    ...indicator
                };
            })
        );
    };

    const handleChangeChartType = (chartElement: typeGraphEnum) => () => {
        setChartType(
            chartType.map((element) => {
                const isActice = element.value === chartElement;
                return {
                    ...element,
                    isActice
                };
            })
        );
        chartData.renderChart({ graphType: chartElement });
    };

    return (
        <>
            <div
                className={
                    KlineChartCss.network__indicators +
                    " " +
                    KlineChartCss.indicator
                }
            >
                <div className={KlineChartCss.network__indicators}>
                    {/* <span> Type: </span> */}
                    {chartType.map((typeElement) => {
                        return (
                            <span
                                key={typeElement.value}
                                className={
                                    typeElement.isActice
                                        ? KlineChartCss.indicator__active
                                        : ""
                                }
                                onClick={handleChangeChartType(
                                    typeElement.value
                                )}
                            >
                                <Text fontSize="md">{typeElement.name}</Text>
                            </span>
                        );
                    })}
                </div>

                <Center
                    className={KlineChartCss.divider_orientation_vertical}
                    height="30px"
                >
                    <Divider orientation="vertical" />
                </Center>

                <div className={KlineChartCss.network__indicators}>
                    {/* <span>Indicators: </span> */}
                    {mainTechnicalIndicatorTypes.map((indicator) => {
                        return (
                            <>
                                <span
                                    className={
                                        indicator.isActice
                                            ? KlineChartCss.indicator__active
                                            : ""
                                    }
                                    onClick={ChangeIndicatorHandler(
                                        indicator.name
                                    )}
                                >
                                    <Text fontSize="md">
                                        {indicator.name.toUpperCase()}
                                    </Text>
                                </span>
                            </>
                        );
                    })}
                </div>
            </div>

            <Divider />
            <div
                style={{ height: "400px", width: "100%", marginBottom: "2em" }}
                id="chart"
            />
        </>
    );
};
export default React.memo(Chart);
