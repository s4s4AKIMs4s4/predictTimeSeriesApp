import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react"
import useRLNetwork from "../../../features/neraulNetwork/useRLNetwork";
import useKlineChart from "../../../features/chart/useKlineChart";
import React from 'react';
import { CircularProgress, Heading, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";

interface IDataChart {
    open: number,
    close: number,
    high: number,
    low: number,
    timestamp: number,
    volue?: number,
    turnover?: number,
}

export interface ChartProps {
    isPredicted: boolean,
    predictedValue: number,
    ticker?: string | null
}

const KlineChart = React.forwardRef<string | null, any>((props, ref) => {
    const [netWorkIsLoading, setNetWorkIsLoading] = useState<boolean>(true)
    const { drawPridctedValue, currentChartData, renderChart } = useKlineChart(
        {
            ticker: (ref as MutableRefObject<any>).current,
            netWorkIsLoading
        }
    )
    const [predictValues, setpredictValues] = useState<number | null>(null)
    const { trainNetwork, inputEpoch } = useRLNetwork()
    const [circularProgressValue, setCircularProgressValue] = useState<number>(0)
    const [numberOfEpoch, setEpoch] = useState<number>(0)
    const [lastLoss, setLastLoss] = useState<number>(10)

    const calculateChartProgress = (epoch, log, params) => {
        setEpoch(epoch+1)
        const progressValue = ((epoch + 1) * 100) / inputEpoch
        console.log(epoch)
        //@ts-ignore
        setLastLoss(log.loss)
        console.log(log)
        console.log(params)
        console.log(progressValue)
        setCircularProgressValue(progressValue)
    }

    useEffect(() => {
        if (predictValues !== null && !netWorkIsLoading) {
            renderChart(predictValues)
        }
    }, [netWorkIsLoading, predictValues])

    useEffect(() => {
        if (!currentChartData) return
        if (currentChartData.length === 0) return
        trainNetwork(currentChartData, calculateChartProgress).then((predictValues: any) => {
            setpredictValues(predictValues)
            setNetWorkIsLoading(false)
        })
    }, [currentChartData])
    return <>
        {
            netWorkIsLoading ? <>
                <CircularProgress value={circularProgressValue} />
                <Heading as='h2' textAlign={'center'} size='sm' noOfLines={3}>
                    Epoch {numberOfEpoch} from 5...
                </Heading>
            </>
                : <>
                    <div style={{ height: '400px', width: '100%', marginBottom:'2em' }} id='chart' />
                    <Heading as='h3' textAlign={'center'} size='sm' noOfLines={3}>
                        Parametr values
                    </Heading>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Name of parametr</Th>
                                    <Th>Value</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>loss</Td>
                                    <Td isNumeric>{lastLoss.toFixed(4)}</Td>
                                </Tr>
                                <Tr>
                                    <Td>Epoch</Td>
                                    <Td isNumeric>{(5).toFixed(4)}</Td>
                                </Tr>
                            </Tbody>

                        </Table>
                    </TableContainer>
                </>
        }

    </>
})

export default KlineChart