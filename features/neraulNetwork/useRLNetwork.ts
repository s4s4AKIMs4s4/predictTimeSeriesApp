import { useState } from "react";
// import { generateCryptoDate } from "../../components/chart/date"
import {
    computeSMA,
    getMaxThreshold,
    makePredictions,
    trainModel
} from "./RecurentNeuralNetwork";
import { IDataChart } from "../chart/useKlineChart";

const useRLNetwork = () => {
    const [windowSize, setWindowSize] = useState<number>(5);
    const [inputEpoch, setInputEpoch] = useState<number>(5);

    const [inputLearningrate, setInputLearningrate] = useState<number>(0.01);
    const [inputHiddenlayers, setInputHiddenlayers] = useState<number>(4);

    const dataSmaAdapter = (data) => {
        return data.map((smeObject) => {
            return {
                close: smeObject.close,
                timestamp: smeObject.timestamp
            };
        });
    };

    const prepareDate = (currentChartData: Array<IDataChart>) => {
        return {
            preparedData: computeSMA(
                dataSmaAdapter(currentChartData),
                windowSize
            ),
            maxThreshold: getMaxThreshold(currentChartData)
        };
    };

    const trainNetwork = async (
        currentChartData: Array<IDataChart>,
        callback
    ) => {
        const { preparedData, maxThreshold } = prepareDate(currentChartData);
        const model_params = {
            inputs: preparedData.map((smeObject) => smeObject.set),
            outputs: preparedData.map((smeObject) => smeObject.avg),
            input_trainingsize: preparedData.length,
            input_windowsize: windowSize,
            input_epoch: inputEpoch,
            input_learningrate: inputLearningrate,
            input_hiddenlayers: inputHiddenlayers
        };

        const { model, stats } = await trainModel(
            model_params,
            maxThreshold,
            callback
        );

        return makePrediction(model, maxThreshold, currentChartData);
    };

    const addFewDays = (timeStamp) => {
        const date = new Date(timeStamp);
        return new Date(date.setDate(date.getDate() + 10)).getTime();
    };

    const makePrediction = (
        model,
        maxThreshold,
        currentChartData: Array<IDataChart>
    ) => {
        const data = dataSmaAdapter(currentChartData);

        const predictedData = [
            data
                .slice(data.length - windowSize - 1, data.length - 1)
                .map((value) => {
                    return value.close;
                })
        ];
        const predictedValues = makePredictions(
            predictedData,
            model,
            maxThreshold
        );
        return predictedValues;
    };

    return {
        prepareDate,
        trainNetwork,
        makePrediction,
        inputEpoch,
        setWindowSize,
        setInputEpoch,
        setInputLearningrate,
        setInputHiddenlayers,
        windowSize,
        inputLearningrate,
        inputHiddenlayers
    };
};

export default useRLNetwork;
