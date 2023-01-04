import { IApiData } from "../../../../shared/api/apiModel";
import adapter from "./adapter";

const alphavantageStockDataAdapter = (data: IApiData) => {
    const { serializeTime } = adapter();
    const StockEntyes = Object.entries(data["Weekly Time Series"]);
    return StockEntyes.map(([timeStr, value]) => {
        const { year, mounth, day } = serializeTime(timeStr);
        const timestamp = new Date(year, mounth - 1, day).getTime();
        const open = parseFloat(value["1. open"]);
        const close = parseFloat(value["4. close"]);

        const high = parseFloat(value["2. high"]);
        const low = parseFloat(value["3. low"]);

        return {
            open,
            close,
            high,
            low,
            timestamp
        };
    });
};
export default alphavantageStockDataAdapter;
