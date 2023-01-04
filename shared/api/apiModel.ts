export enum TimeCryptoFunctionEnum {
    DAILY = "DIGITAL_CURRENCY_DAILY"
}

export enum TimeStockFunctionEnum {
    DAILY = "TIME_SERIES_DAILY_ADJUSTED",
    TIME_SERIES_WEEKLY = "TIME_SERIES_WEEKLY"
}

//TODO: type Api Data
export interface IApiData {
    "Weekly Time Series": unknown;
    "Time Series (Digital Currency Daily)": unknown;
}
