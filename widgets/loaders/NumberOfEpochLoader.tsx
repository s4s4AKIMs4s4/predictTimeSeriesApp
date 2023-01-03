import {
    CircularProgress,
    Heading,
} from "@chakra-ui/react";
import KlineChartCss from "../chart/KlineChartCss.module.css";

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
                    {numberOfEpoch} из {inputEpoch}...
                </Heading>
            </div>
        </>
    );
};
export default NumberOfEpochLoader;
