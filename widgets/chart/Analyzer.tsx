import {
    MutableRefObject,
    useEffect,
    useState
} from "react";
import useRLNetwork from "../../features/neraulNetwork/useRLNetwork";
import useKlineChart from "../../features/chart/useKlineChart";
import React from "react";
import {
    Heading,
} from "@chakra-ui/react";
import {
    Button,
} from "@chakra-ui/react";
import KlineChartCss from "./KlineChartCss.module.css";
import Chart from "./FinancialChart";
import CommonInformationTable from "../../entities/tables/CommonInformationTable";
import SettingML from "../../entities/SettingML";
import ResultPredictedTable from "../../entities/tables/ResultPredictedTable";
import NumberOfEpochLoader from "../loaders/NumberOfEpochLoader";

interface IDataChart {
    open: number;
    close: number;
    high: number;
    low: number;
    timestamp: number;
    volue?: number;
    turnover?: number;
}

export interface ChartProps {
    isPredicted: boolean;
    predictedValue: number;
    ticker?: string | null;
}

export interface IMainTechnicalIndicatorTypes {
    isActice: boolean;
    name: string;
}

const KlineChart = (props, ref) => {
    const [netWorkIsLoading, setNetWorkIsLoading] = useState<boolean>(false);
    const {
        currentChartObj,
        drawPridctedValue,
        currentChartData,
        renderChart,
        isDataLoaded
    } = useKlineChart({
        ticker: (ref as MutableRefObject<any>).current,
        netWorkIsLoading
    });

    const [predictValues, setpredictValues] = useState<number | null>(null);

    const {
        trainNetwork,
        inputEpoch,
        setWindowSize,
        setInputEpoch,
        setInputLearningrate,
        setInputHiddenlayers,
        windowSize,
        inputLearningrate,
        inputHiddenlayers
    } = useRLNetwork();

    const [circularProgressValue, setCircularProgressValue] =
        useState<number>(0);
    const [numberOfEpoch, setEpoch] = useState<number>(0);
    const [lastLoss, setLastLoss] = useState<number>(10);

    const calculateChartProgress = (epoch, log, params) => {
        setEpoch(epoch + 1);
        const progressValue = ((epoch + 1) * 100) / inputEpoch;
        console.log(epoch);
        //@ts-ignore
        setLastLoss(log.loss);
        console.log(log);
        console.log(params);
        console.log(progressValue);
        setCircularProgressValue(progressValue);
    };

    useEffect(() => {
        if (predictValues) {
            drawPridctedValue(predictValues, windowSize);
        }
    }, [predictValues]);

    const handleOpenModalClick = () => {
        setNetWorkIsLoading(true);
        trainNetwork(currentChartData, calculateChartProgress).then(
            (predictValues: any) => {
                setpredictValues(predictValues);
                setEpoch(0);
                setNetWorkIsLoading(false);
            }
        );
    };

    return (
        <>
            <Heading
                className={KlineChartCss.indicator__wrapper}
                as="h3"
                textAlign={"center"}
                size="sm"
                noOfLines={3}
            >
                График
            </Heading>

            <Chart
                chartData={{
                    currentChartObj,
                    drawPridctedValue,
                    currentChartData,
                    renderChart,
                    isDataLoaded
                }}
                predictValues={predictValues}
                windowSize={windowSize}
                netWorkIsLoading={netWorkIsLoading}
                ticker={(ref as MutableRefObject<any>).current}
            />

            {isDataLoaded && (
                <>
                    <Heading
                        as="h3"
                        textAlign={"center"}
                        size="sm"
                        noOfLines={3}
                    >
                        Общая рыночная информация
                    </Heading>

                    <CommonInformationTable
                        currentChartData={currentChartData}
                    />

                    <Heading
                        as="h3"
                        textAlign={"center"}
                        size="sm"
                        noOfLines={3}
                    >
                        Создать нейросеть
                    </Heading>
                    <SettingML
                        {...{
                            trainNetwork,
                            inputEpoch,
                            setWindowSize,
                            setInputEpoch,
                            setInputLearningrate,
                            setInputHiddenlayers,
                            windowSize,
                            inputLearningrate,
                            inputHiddenlayers
                        }}
                    />

                    <Button
                        className={KlineChartCss.network__trainButton}
                        colorScheme="teal"
                        size="md"
                        onClick={handleOpenModalClick}
                    >
                        {" "}
                        Обучить сеть{" "}
                    </Button>
                    <div></div>

                    {netWorkIsLoading && (
                        <>
                            <NumberOfEpochLoader
                                circularProgressValue={circularProgressValue}
                                inputEpoch={inputEpoch}
                                numberOfEpoch={numberOfEpoch}
                            />
                        </>
                    )}

                    {!netWorkIsLoading && predictValues && (
                        <>
                            <ResultPredictedTable
                                lastLoss={lastLoss}
                                predictValues={predictValues}
                            />
                        </>
                    )}
                </>
            )}
        </>
    );
};
export default React.forwardRef<string | null, any>(KlineChart);