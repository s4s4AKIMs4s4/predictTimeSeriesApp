import {
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import KlineChartCss from "../../widgets/chart/KlineChartCss.module.css";
import { IDataChart } from "../../features/chart/useKlineChart";
import useStaticValues from "../../features/metrics.tsx/useStaticValues";
import React from "react";

export interface ICommonInformationTable {
    currentChartData: IDataChart[];
}

const CommonInformationTable: React.FC<ICommonInformationTable> = ({
    currentChartData
}) => {
    const { getMSE, getMode, getTimeAgo, getMax, getMin, amountOfDeal } =
        useStaticValues(currentChartData);

    return (
        <>
            <TableContainer className={KlineChartCss.static__table}>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Parameter name</Th>
                            <Th
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end"
                                }}
                            >
                                Value
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>Mode</Td>
                            <Td data-testid="moda-test-value-id" isNumeric>
                                {" "}
                                {getMSE("close").toFixed(2)}
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>Average</Td>
                            <Td data-testid="average-test-value-id" isNumeric>
                                {getMode("close").toFixed(2)}{" "}
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>Maximum closing price</Td>
                            <Td data-testid="max-test-value-id" isNumeric>
                                {getMax()}{" "}
                            </Td>
                        </Tr>
                        <Tr>
                            <Td> Minimum closing price </Td>
                            <Td data-testid="min-test-value-id" isNumeric>
                                {getMin()}{" "}
                            </Td>
                        </Tr>
                        <Tr>
                            <Td> Number of values in the chart </Td>
                            <Td
                                data-testid="number-of-values-test-value-id"
                                isNumeric
                            >
                                {amountOfDeal()}{" "}
                            </Td>
                        </Tr>

                        <Tr>
                            <Td> Start of trading </Td>
                            <Td
                                isNumeric
                                data-testid="start-traiding-test-value-id"
                            >
                                {getTimeAgo()}{" "}
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
};
export default React.memo(CommonInformationTable);
