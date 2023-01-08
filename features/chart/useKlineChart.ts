import klinecharts, { Chart } from "klinecharts";
import { useEffect, useRef, useState } from "react";
import { generateChartDate } from "../../widgets/chart/date";
import { createCircle } from "../../widgets/chart/shapes/addShapes";
import { generateTemplateCircle } from "../../widgets/chart/shapes/circle";
import { generateChartStyle, typeGraphEnum } from "../../widgets/chart/style";
import useGetMarcetplaceData from "../../shared/api/useGetMarcetplaceData";
import Stocks from "../../CompanyInformation/Stocks.json";

export interface IDataChart {
    open: number;
    close: number;
    high: number;
    low: number;
    timestamp: number;
    volue?: number;
    turnover?: number;
}

export interface IrenderChart {
    predictValue?: number;
    graphType?: typeGraphEnum;
}

interface IKlineProps {
    ticker: string;
    netWorkIsLoading: boolean;
}
// netWorkIsLoading
const useKlineChart = ({ ticker, netWorkIsLoading }: IKlineProps) => {
    const isCrypro = useRef<boolean>(
        Stocks.find((value) => value.ticker === ticker)?.isCrypto
    );
    const { data, isLoading } = useGetMarcetplaceData(ticker);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
    const [currentChartData, setCurrentChartData] = useState<Array<IDataChart>>(
        []
    );
    const currentChartObj = useRef<Chart | null>(null);

    function annotationDrawExtend(ctx, coordinate, text) {
        ctx.font = "12px Roboto";
        ctx.fillStyle = "#2d6187";
        ctx.strokeStyle = "#2d6187";

        const textWidth = ctx.measureText(text).width;
        const startX = coordinate.x;
        let startY = coordinate.y + 6;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        startY += 5;
        ctx.lineTo(startX - 4, startY);
        ctx.lineTo(startX + 4, startY);
        ctx.closePath();
        ctx.fill();

        const rectX = startX - textWidth / 2 - 6;
        const rectY = startY;
        const rectWidth = textWidth + 12;
        const rectHeight = 28;
        const r = 2;
        ctx.beginPath();
        ctx.moveTo(rectX + r, rectY);
        ctx.arcTo(
            rectX + rectWidth,
            rectY,
            rectX + rectWidth,
            rectY + rectHeight,
            r
        );
        ctx.arcTo(
            rectX + rectWidth,
            rectY + rectHeight,
            rectX,
            rectY + rectHeight,
            r
        );
        ctx.arcTo(rectX, rectY + rectHeight, rectX, rectY, r);
        ctx.arcTo(rectX, rectY, rectX + rectWidth, rectY, r);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#fff";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(text, startX, startY + 14);
    }

    useEffect(() => {
        if (isLoading) return;
        genetateChartData();
    }, [isLoading]);

    const inverData = (Kdata: klinecharts.KLineData[]) => {};

    const genetateChartData = () => {
        const Kdata = generateChartDate(data, isCrypro.current);
        console.log("Kdata");
        console.log(Kdata);
        setCurrentChartData(Kdata.reverse());
        setIsDataLoaded(true);
    };

    const addToChartCircle = (dataIndex: number, price: number) => {
        currentChartObj.current.createTechnicalIndicator(" ", true, {
            id: "candle_pane",
            dragEnabled: true
        });
        currentChartObj.current.createShape(
            createCircle(dataIndex, price),
            "candle_pane"
        );
    };

    const drawPridctedValue = (predictValue, windowSize) => {
        addToChartCircle(currentChartData.length, predictValue);
    };
    const subTechnicalIndicatorTypes = ["VOL", "MACD", "KDJ"];
    const renderChart = ({ predictValue, graphType }: IrenderChart) => {
        const chart = klinecharts.init(`${"chart"}`);
        currentChartObj.current = chart;
        chart.setStyleOptions(
            generateChartStyle(graphType ? graphType : typeGraphEnum.AREA)
        );
        chart.applyNewData(currentChartData);
        chart.addShapeTemplate(generateTemplateCircle());
    };
    return {
        renderChart,
        addToChartCircle,
        drawPridctedValue,
        currentChartData,
        isDataLoaded,
        currentChartObj
    };
};

export default useKlineChart;
