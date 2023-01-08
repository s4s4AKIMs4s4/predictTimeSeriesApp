
export interface IRadarChartView {
    radarData: Array<{ [key: string]: string | number }>;
    ticker: string;
    max: number;
    comparedTicker: string;
}
