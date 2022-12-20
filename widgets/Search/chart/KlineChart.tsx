import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react"
import useRLNetwork from "../../../features/neraulNetwork/useRLNetwork";
import useKlineChart from "../../../features/chart/useKlineChart";
import React from 'react';
import { CircularProgress, Divider, FormLabel, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import useMetricks from "../../../features/metrics.tsx/useMetricks";
import useStaticValues from "../../../features/metrics.tsx/useStaticValues";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import KlineChartCss from './KlineChartCss.module.css'
import { typeGraphEnum } from "./style";

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

    // const subTechnicalIndicatorTypes = ['VOL', 'MACD', 'KDJ']

    const [subTechnicalIndicatorTypes, setSubTechnicalIndicatorTypes] = useState<Array<IMainTechnicalIndicatorTypes>>([{
        isActice: false,
        name: 'VOL'
    },
    {
        isActice: false,
        name: 'MACD'
    },
    {
        isActice: false,
        name: 'KDJ'
    },
    ])


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
    },
    {
        isActice: false,
        name: 'MACD'
    },
    {
        isActice: false,
        name: 'KDJ'
    }
    ])


    const [chartType, setChartType] = useState<Array<IMainTechnicalIndicatorTypes & { value: typeGraphEnum }>>([{
        isActice: true,
        name: 'area',
        value: typeGraphEnum.AREA
    },
    {
        isActice: false,
        name: 'candle',
        value: typeGraphEnum.CANDLE
    },])

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
            drawPridctedValue(predictValues,windowSize)
        }
    }, [predictValues])

    const handleOpenModalClick = () => {
        setNetWorkIsLoading(true)
        trainNetwork(currentChartData, calculateChartProgress).then((predictValues: any) => {
            setpredictValues(predictValues)
            setEpoch(0)
            setNetWorkIsLoading(false)
        })
    }

    const handleChangeOPtion = (chartElement: typeGraphEnum) => () => {
        const test = chartType.map((element) => {
            // debugger
            const isActice = element.value === chartElement
            return {
                ...element,
                isActice
            }
        })
        console.log(test)

        setChartType(chartType.map((element) => {
            const isActice = element.value === chartElement
            return {
                ...element,
                isActice
            }
        }))
        renderChart({ graphType: chartElement })
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
            renderChart({})
    }, [isDataLoaded])

    const AbHandler = (indicatorName: string) => (e: any) => {
        setMainTechnicalIndicatorTypes(mainTechnicalIndicatorTypes.map((indicator) => {
            const isCurrentIndicator = indicator.name === indicatorName
            if (isCurrentIndicator) {
                if (indicator.isActice) {
                    currentChartObj.current.removeTechnicalIndicator('candle_pane', indicatorName)
                }
                else {
                    currentChartObj.current.createTechnicalIndicator(indicatorName, true, { id: 'candle_pane' })
                }
                return {
                    ...indicator,
                    isActice: !indicator.isActice
                }
            }

            return {
                ...indicator,
            }
        }))
        // currentChartObj.current.createTechnicalIndicator(indicatorName, true, { id: 'candle_pane' })
    }

    return <>
        <Heading className={KlineChartCss.indicator__wrapper} as='h3' textAlign={'center'} size='sm' noOfLines={3}>
            График
        </Heading>

        <div className={KlineChartCss.network__indicators + ' ' + KlineChartCss.indicator}>
            <div className={KlineChartCss.network__indicators}>
                {
                    chartType.map((typeElement) => {
                        return <span className={typeElement.isActice ? KlineChartCss.indicator__active : ''} onClick={handleChangeOPtion(typeElement.value)}>
                            <Text fontSize='md'>{typeElement.name}</Text>
                        </span>
                    })
                }
            </div>

            <div className={KlineChartCss.network__indicators}>
                {
                    mainTechnicalIndicatorTypes.map((indicator) => {
                        return <>
                            <span className={indicator.isActice ? KlineChartCss.indicator__active : ''} onClick={AbHandler(indicator.name)}>
                                <Text fontSize='md'>{indicator.name.toLowerCase()}</Text>
                            </span>
                        </>
                    })
                }
                
            </div>
        </div>
        <Divider />

        <div style={{ height: '400px', width: '100%', marginBottom: '2em' }} id='chart' />
        {
            isDataLoaded && <>
                <Heading as='h3' textAlign={'center'} size='sm' noOfLines={3}>
                    Общая рыночная информация
                </Heading>
                <TableContainer className={KlineChartCss.static__table}>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Название параметра</Th>
                                <Th style={{ display: 'flex', justifyContent: 'flex-end' }}>Значение</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Мода</Td>
                                <Td isNumeric> {getMSE('close').toFixed(2)}</Td>
                            </Tr>
                            <Tr>
                                <Td>Среднее</Td>
                                <Td isNumeric>{getMode('close').toFixed(2)} </Td>
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
                <Heading as='h3' textAlign={'center'} size='sm' noOfLines={3}>
                    Создать нейросеть
                </Heading>

                <div className={KlineChartCss.network__form}>
                    <FormLabel>Window size:</FormLabel>
                    <NumberInput
                        onChange={(valueString) => setWindowSize(Number(valueString))}
                        value={windowSize}
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

                    <FormLabel>Learning rate:</FormLabel>
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

                    <FormLabel>Number of RNN blocks:</FormLabel>
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
                        <div className={KlineChartCss.learningLoadingWrapper}>
                            <CircularProgress value={circularProgressValue} />
                            <Heading as='h2' textAlign={'center'} size='sm' noOfLines={3}>
                                 {numberOfEpoch} из {inputEpoch}...
                            </Heading>
                        </div>
                    </>
                }

                {
                    !netWorkIsLoading && predictValues &&
                    <>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Название параметра</Th>
                                    <Th style={{ display: 'flex', justifyContent: 'flex-end' }}>Значение</Th>
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
                }


            </>
        }



    </>
})

export default KlineChart