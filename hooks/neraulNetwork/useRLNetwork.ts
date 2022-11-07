import { useState } from "react"
import { generateCryptoDate } from "../../components/chart/date"
import { computeSMA } from "../../RecurentNeuralNetwork"

const useRLNetwork = () => {
    const [windowSize, setWindowSize] = useState<number>(50)
    const [inputEpoch, setInputEpoch] = useState<number>(5)
    const [inputLearningrate, setInputLearningrate] = useState<number>(0.01)
    const [inputHiddenlayers, setInputHiddenlayers] = useState<number>(4)
    
    const dataSmaAdapter = (data) => {
        return data.map((smeObject) =>{
            return {
                close:smeObject.close,
                timestamp:smeObject.timestamp
            }
         } )
    }

    const prepareDate = () => {
        return computeSMA(dataSmaAdapter(generateCryptoDate()), windowSize)
    }
    
    const trainNetwork = () => {
        const preparedData = prepareDate()
        const model_params = {
            inputs:preparedData.map((smeObject) =>smeObject.set),
            outputs:preparedData.map((smeObject) =>smeObject.avg),
            input_trainingsize:preparedData.length,
            input_windowsize:windowSize,
            input_epoch:inputEpoch,
            input_learningrate:inputLearningrate,
            input_hiddenlayers:inputHiddenlayers,
        }
    }

    const addFewDays = (timeStamp) => {
        const date = new Date(timeStamp)
        return new Date(date.setDate(date.getDate() + 10))
    }

   const makePrediction = () => {
    const data = dataSmaAdapter(generateCryptoDate())
    const lastDataElement = data[data.length - 1 ]
    const timestamp = lastDataElement.timestamp

    const predictedDate = {
        timestamp:addFewDays(timestamp)
    }
    
   }

}

export default useRLNetwork