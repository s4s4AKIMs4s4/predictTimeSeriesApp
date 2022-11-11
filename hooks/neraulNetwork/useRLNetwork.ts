import { useState } from "react"
import { generateCryptoDate } from "../../components/chart/date"
import { computeSMA, getMaxThreshold, makePredictions, trainModel } from "../../RecurentNeuralNetwork"

const useRLNetwork = () => {
    const [windowSize, setWindowSize] = useState<number>(20)
    const [inputEpoch, setInputEpoch] = useState<number>(5)
    const [inputLearningrate, setInputLearningrate] = useState<number>(0.01)
    const [inputHiddenlayers, setInputHiddenlayers] = useState<number>(4)
    // const [maxThreshold, setMaxThreshold] = useState<number | null>(null)

    const dataSmaAdapter = (data) => {
        return data.map((smeObject) => {
            return {
                close: smeObject.close,
                timestamp: smeObject.timestamp
            }
        })
    }

    const prepareDate = () => {
        const mockData = generateCryptoDate()
        // setMaxThreshold(getMaxThreshold(mockData))
        return {
            preparedData:computeSMA(dataSmaAdapter(mockData), windowSize),
            maxThreshold:getMaxThreshold(mockData)
        }
    }

    const testComputeMax = () => {
        const preparedData = generateCryptoDate()
        console.log('MaxThreshold:')
        console.log(getMaxThreshold(preparedData))
    }

    const trainNetwork = async () => {
        const {preparedData,maxThreshold} = prepareDate()
        const model_params = {
            inputs: preparedData.map((smeObject) => smeObject.set),
            outputs: preparedData.map((smeObject) => smeObject.avg),
            input_trainingsize: preparedData.length,
            input_windowsize: windowSize,
            input_epoch: inputEpoch,
            input_learningrate: inputLearningrate,
            input_hiddenlayers: inputHiddenlayers,
        }

        const { model, stats } = await trainModel(model_params, maxThreshold,
            (epoch, log, params) => {
                console.log(epoch)
                console.log(log)
                console.log(params)
            })

        return makePrediction(model,maxThreshold)
    }

    const addFewDays = (timeStamp) => {
        const date = new Date(timeStamp)
        return new Date(date.setDate(date.getDate() + 10)).getTime()
    }

    const makePrediction = (model,maxThreshold) => {
        const data = dataSmaAdapter(generateCryptoDate())
        // const lastDataElement = data[data.length - 1]
        // const timestamp = lastDataElement.timestamp

        const predictedData = [data.slice(data.length - windowSize - 1, data.length - 1).map((value) => {
            return value.close
        })]
        console.log('predictedData')
        console.log(predictedData)
        console.log('predictions:')
        const predictedValues = makePredictions(predictedData, model, maxThreshold)
        console.log(predictedValues)
        return predictedValues
    }
    return {
        prepareDate,
        trainNetwork,
        makePrediction,
        testComputeMax,
    }

}

export default useRLNetwork