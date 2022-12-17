import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react"
import useRLNetwork from "../../../features/neraulNetwork/useRLNetwork";
import useKlineChart from "../../../features/chart/useKlineChart";
import React from 'react';
import { CircularProgress, Divider, FormLabel, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import useMetricks from "../../../features/metrics.tsx/useMetricks";
import useStaticValues from "../../../features/metrics.tsx/useStaticValues";
import NextLink from "next/link"
// import Link from "next/link";
import { Link } from '@chakra-ui/react'
import KLinePredicted from "./KlineChartPredicted"
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import KlineChartCss from './KlineChartCss.module.css'

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

export interface IMainTechnicalIndicatorTypes {
    isActice: boolean,
    name: string
}

const KlineChart = React.forwardRef<string | null, any>((props, ref) => {
    const [netWorkIsLoading, setNetWorkIsLoading] = useState<boolean>(false)
    const { currentChartObj, drawPridctedValue, currentChartData, renderChart, isDataLoaded } = useKlineChart(
        {
            ticker: (ref as MutableRefObject<any>).current,
            netWorkIsLoading
        }
    )
    const [mainTechnicalIndicatorTypes, setMainTechnicalIndicatorTypes] = useState<Array<IMainTechnicalIndicatorTypes>>([{
        isActice: false,
        name: 'MA'
    },
    {
        isActice: false,
        name: 'EMA'
    },
    {
        isActice: false,
        name: 'SAR'
    }])

    const [predictValues, setpredictValues] = useState<number | null>(null)


    const {
        trainNetwork,
        inputEpoch,
        setWindowSize,
        setInputEpoch,
        setInputLearningrate,
        setInputHiddenlayers,
        windowSize,
        inputLearningrate,
        inputHiddenlayers
    } = useRLNetwork()


    const [circularProgressValue, setCircularProgressValue] = useState<number>(0)
    const [numberOfEpoch, setEpoch] = useState<number>(0)
    const [lastLoss, setLastLoss] = useState<number>(10)

    const [modalIsopen, setModalIsOpen] = useState<boolean>(false)

    const closeModal = () => setModalIsOpen(false)
    const openModal = () => setModalIsOpen(true)


    const calculateChartProgress = (epoch, log, params) => {
        setEpoch(epoch + 1)
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
        if (predictValues) {
            drawPridctedValue(predictValues)
        }
    }, [predictValues])

    const handleOpenModalClick = () => {
        setNetWorkIsLoading(true)
        trainNetwork(currentChartData, calculateChartProgress).then((predictValues: any) => {
            setpredictValues(predictValues)
            setNetWorkIsLoading(false)
        })
    }

    const {
        getMSE,
        getMode,
        getTimeAgo,
        getMax,
        getMin,
        amountOfDeal
    } = useStaticValues(currentChartData)

    useEffect(() => {
        if (isDataLoaded)
            renderChart()
    }, [isDataLoaded])

    const AbHandler = (indicatorName: string) => (e: any) => {
        // e.preventDefault()
        setMainTechnicalIndicatorTypes(mainTechnicalIndicatorTypes.map((indicator) => {
            const isActive = indicator.name === indicatorName
            return {
                ...indicator,
                isActice: isActive
            }
        }))
        currentChartObj.current.createTechnicalIndicator(indicatorName, false, { id: 'candle_pane' })
    }

    return <>

        <div className={KlineChartCss.network__indicators + ' ' + KlineChartCss.indicator}>
            <Text fontSize='md'>Indicators: </Text>
            {
                mainTechnicalIndicatorTypes.map((indicator) => {
                    return <>
                        <span className = { indicator.isActice ? KlineChartCss.indicator__active :''} onClick={AbHandler(indicator.name)}>
                            <Text fontSize='md'>{indicator.name.toLowerCase()}</Text>
                        </span>
                    </>
                })
            }
        </div>
        <Divider/>
        <div style={{ height: '400px', width: '100%', marginBottom: '2em' }} id='chart' />
        {
            isDataLoaded && <>
                <Heading as='h3' textAlign={'center'} size='sm' noOfLines={3}>
                    Parametr values
                </Heading>
                <TableContainer className={KlineChartCss.static__table}>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Name of parametr</Th>
                                <Th style={{ display: 'flex', justifyContent: 'flex-end' }}>Value</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>MSE</Td>
                                <Td isNumeric> {getMSE('close').toFixed(2)}</Td>
                            </Tr>
                            <Tr>
                                <Td> MODA </Td>
                                <Td isNumeric>{getMode('close').toFixed(2)} </Td>
                            </Tr>

                            <Tr>
                                <Td> time ago </Td>
                                <Td isNumeric>{getTimeAgo()} </Td>
                            </Tr>


                            <Tr>
                                <Td> max </Td>
                                <Td isNumeric>{getMax()} </Td>
                            </Tr>


                            <Tr>
                                <Td> min </Td>
                                <Td isNumeric>{getMin()} </Td>
                            </Tr>


                            <Tr>
                                <Td> amount of Deal </Td>
                                <Td isNumeric>{amountOfDeal()} </Td>
                            </Tr>
                        </Tbody>
                    </Table>

                </TableContainer>
                <Heading as='h3' textAlign={'center'} size='sm' noOfLines={3}>
                    Сделать нейросеть
                </Heading>

                <div className={KlineChartCss.network__form}>
                    <FormLabel>Window size:</FormLabel>
                    <NumberInput
                        onChange={(valueString) => setWindowSize(Number(valueString))}
                        value={windowSize}
                        max={50}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>


                    <FormLabel>Input Epoch:</FormLabel>
                    <NumberInput
                        onChange={(valueString) => setInputEpoch(Number(valueString))}
                        value={inputEpoch}
                        max={50}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>

                    <FormLabel>input Learning rate:</FormLabel>
                    <NumberInput
                        onChange={(valueString) => setInputLearningrate(Number(valueString))}
                        value={inputLearningrate}
                        max={50}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>

                    <FormLabel>input Hidden layers:</FormLabel>
                    <NumberInput
                        onChange={(valueString) => setInputHiddenlayers(Number(valueString))}
                        value={inputHiddenlayers}
                        max={50}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </div>

                {/* </div> */}
                <Button className={KlineChartCss.network__trainButton} colorScheme='teal' size='md' onClick={handleOpenModalClick}> Обучить сеть </Button>
                <div></div>
                {
                    netWorkIsLoading && <>
                        <CircularProgress value={circularProgressValue} />
                        <Heading as='h2' textAlign={'center'} size='sm' noOfLines={3}>
                            Epoch {numberOfEpoch} from 5...
                        </Heading>
                    </>
                }



            </>
        }



    </>
})

export default KlineChart