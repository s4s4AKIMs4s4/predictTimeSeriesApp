import KlineChartCss from "../Search/KlineChartCss.module.css";
import {
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";

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
                        <Th>Название параметра</Th>
                        <Th
                            style={{
                                display: "flex",
                                justifyContent: "flex-end"
                            }}
                        >
                            Значение
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>Спрогнозированное значение</Td>
                        <Td isNumeric> {predictValues.toFixed(2)}</Td>
                    </Tr>
                    <Tr>
                        <Td>Значение функции потерь</Td>
                        <Td isNumeric>{lastLoss.toFixed(7)} </Td>
                    </Tr>
                </Tbody>
            </Table>
        </>
    );
};
export default ResultPredictedTable;
