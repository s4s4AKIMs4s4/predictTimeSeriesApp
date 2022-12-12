import { IStatickDomainData } from "../metrics.tsx/useMetricks"

const useStatickChart = () => {
    const getDomainRadarData = (data: IStatickDomainData,ticker, compareTicker) => {
        return [
            {
                subject: 'close',
                [ticker]: data.ticker.close,
                [compareTicker]: data.comparedTicker.close,
                fullMark: 150,
            },
            {
                subject: 'high',
                [ticker]: data.ticker.high,
                [compareTicker]: data.comparedTicker.high,
                fullMark: 150,
            },
            {
                subject: 'open',
                [ticker]: data.ticker.open,
                [compareTicker]: data.comparedTicker.open,
                fullMark: 150,
            },
        ]
    }

    // const get

    return {getDomainRadarData}
}
export default useStatickChart