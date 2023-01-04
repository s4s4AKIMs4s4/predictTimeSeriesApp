import { CircularProgress, Heading } from "@chakra-ui/react";
import KlineChartCss from "../chart/KlineChartCss.module.css";
import React from "react";

interface INumberOfEpochLoader {
    circularProgressValue: number;
    numberOfEpoch: number;
    inputEpoch: number;
}
const NumberOfEpochLoader: React.FC<INumberOfEpochLoader> = ({
    numberOfEpoch,
    inputEpoch,
    circularProgressValue
}) => {
    return (
        <>
            <div className={KlineChartCss.learningLoadingWrapper}>
                <CircularProgress value={circularProgressValue} />
                <Heading as="h2" textAlign={"center"} size="sm" noOfLines={3}>
                    {numberOfEpoch} from {inputEpoch}...
                </Heading>
            </div>
        </>
    );
};
export default React.memo(NumberOfEpochLoader);
