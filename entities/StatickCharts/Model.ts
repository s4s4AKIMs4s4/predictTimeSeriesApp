import { ILastDate, lastDataEnum } from "../../components/StatickView";

export interface ISynchronizationChart{
    lastData:ILastDate,
    lastDataFunciton:lastDataEnum,
    ticker:string,
    comparedTicker:string
}

export interface IRadarChartView{
    radarData:Array<{ [key: string]: string | number }>,
    ticker:string,
    max:number,
    comparedTicker:string
}