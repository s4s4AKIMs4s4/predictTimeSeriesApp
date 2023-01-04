import React from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

interface IResultPredictedTable {
    predictValues: number;
    lastLoss: number;
}

const ResultPredictedTable: React.FC<IResultPredictedTable> = ({
    predictValues,
    lastLoss
}) => {
    return (
        <>
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
                        <Td>Predicted value</Td>
                        <Td isNumeric> {predictValues.toFixed(2)}</Td>
                    </Tr>
                    <Tr>
                        <Td>Loss function</Td>
                        <Td isNumeric>{lastLoss.toFixed(7)} </Td>
                    </Tr>
                </Tbody>
            </Table>
        </>
    );
};
export default React.memo(ResultPredictedTable);
