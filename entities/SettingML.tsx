import React from "react";
import useRLNetwork from "../features/neraulNetwork/useRLNetwork";
import KlineChartCss from "../widgets/chart/KlineChartCss.module.css";
import {
    FormLabel,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper
} from "@chakra-ui/react";

export type ISettingML = Omit<
    ReturnType<typeof useRLNetwork>,
    "makePrediction" | "prepareDate"
>;

const SettingML: React.FC<ISettingML> = (props) => {
    return (
        <>
            <div className={KlineChartCss.network__form}>
                <FormLabel>Window size:</FormLabel>
                <NumberInput
                    data-testid={"window-size"}
                    onChange={(valueString) =>
                        props.setWindowSize(Number(valueString))
                    }
                    value={props.windowSize}
                    max={200}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>

                <FormLabel>Input Epoch:</FormLabel>
                <NumberInput
                    onChange={(valueString) =>
                        props.setInputEpoch(Number(valueString))
                    }
                    value={props.inputEpoch}
                    data-testid={"input-epoch"}
                    max={50}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>

                <FormLabel>Learning rate:</FormLabel>
                <NumberInput
                    data-testid={"learning-rate"}
                    onChange={(valueString) =>
                        props.setInputLearningrate(Number(valueString))
                    }
                    value={props.inputLearningrate}
                    max={50}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>

                <FormLabel>Number of RNN blocks:</FormLabel>
                <NumberInput
                    data-testid={"RNN-blocks"}
                    onChange={(valueString) =>
                        props.setInputHiddenlayers(Number(valueString))
                    }
                    value={props.inputHiddenlayers}
                    max={50}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </div>
        </>
    );
};
export default React.memo(SettingML);
