import { FC, MutableRefObject, useEffect, useState } from "react";
import { IDataChart, IrenderChart } from "../../features/chart/useKlineChart";
import KlineChartCss from "./KlineChartCss.module.css";
import { typeGraphEnum } from "./style";
import { IMainTechnicalIndicatorTypes } from "./Analyzer";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import {
    CircularProgress,
    Divider,
    FormLabel,
    Heading,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";

export interface IPredictedChart {
    netWorkIsLoading: boolean;
    ticker: string;
    predictValues: number | null;
    windowSize: number;
    chartData: {
        currentChartData: IDataChart[];
        drawPridctedValue: (predictValue: any, windowSize: any) => void;
        currentChartObj: MutableRefObject<klinecharts.Chart>;
        renderChart: ({ predictValue, graphType }: IrenderChart) => void;
        isDataLoaded: boolean;
    };
}

const Chart: React.FC<IPredictedChart> = ({
    chartData,
    predictValues,
    netWorkIsLoading,
    ticker,
    windowSize
}) => {
    // const { currentChartObj, drawPridctedValue, currentChartData, renderChart, isDataLoaded } = useKlineChart(
    //     {
    //         ticker: ticker,
    //         netWorkIsLoading
    //     }
    // )

    useEffect(() => {
        if (predictValues) {
            chartData.drawPridctedValue(predictValues, windowSize);
        }
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

    const AbHandler = (indicatorName: string) => (e: any) => {
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

    const handleChangeOPtion = (chartElement: typeGraphEnum) => () => {
        const test = chartType.map((element) => {
            // debugger
            const isActice = element.value === chartElement;
            return {
                ...element,
                isActice
            };
        });

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
                    {chartType.map((typeElement) => {
                        return (
                            <span
                                className={
                                    typeElement.isActice
                                        ? KlineChartCss.indicator__active
                                        : ""
                                }
                                onClick={handleChangeOPtion(typeElement.value)}
                            >
                                <Text fontSize="md">{typeElement.name}</Text>
                            </span>
                        );
                    })}
                </div>

                <div className={KlineChartCss.network__indicators}>
                    {mainTechnicalIndicatorTypes.map((indicator) => {
                        return (
                            <>
                                <span
                                    className={
                                        indicator.isActice
                                            ? KlineChartCss.indicator__active
                                            : ""
                                    }
                                    onClick={AbHandler(indicator.name)}
                                >
                                    <Text fontSize="md">
                                        {indicator.name.toLowerCase()}
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
export default Chart;
