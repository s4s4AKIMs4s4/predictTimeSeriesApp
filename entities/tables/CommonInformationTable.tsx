import {
    CircularProgress,
    Divider,
    FormLabel,
    Heading,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import KlineChartCss from "../../widgets/chart/KlineChartCss.module.css";
import { IDataChart } from "../../features/chart/useKlineChart";
import useStaticValues from "../../features/metrics.tsx/useStaticValues";

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
                            <Td>Мода</Td>
                            <Td isNumeric> {getMSE("close").toFixed(2)}</Td>
                        </Tr>
                        <Tr>
                            <Td>Среднее</Td>
                            <Td isNumeric>{getMode("close").toFixed(2)} </Td>
                        </Tr>
                        <Tr>
                            <Td>Максимальная цена закрытия</Td>
                            <Td isNumeric>{getMax()} </Td>
                        </Tr>
                        <Tr>
                            <Td> Минимальная цена закрытия </Td>
                            <Td isNumeric>{getMin()} </Td>
                        </Tr>
                        <Tr>
                            <Td> Количество сделок </Td>
                            <Td isNumeric>{amountOfDeal()} </Td>
                        </Tr>

                        <Tr>
                            <Td> Начало торгов </Td>
                            <Td isNumeric>{getTimeAgo()} </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
};
export default CommonInformationTable;
