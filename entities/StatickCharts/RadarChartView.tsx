import {
    Radar,
    RadarChart,
    PolarGrid,
    Legend,
    PolarAngleAxis,
    PolarRadiusAxis
} from "recharts";
import { ResponsiveContainer } from "recharts";
import { IRadarChartView } from "./Model";

const RadarChartView: React.FC<IRadarChartView> = ({
    radarData,
    max,
    ticker,
    comparedTicker
}) => {
    return (
        <>
            <ResponsiveContainer width="99%" height="90%">
                <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="100%"
                    data={radarData}
                >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, max]} />
                    <Radar
                        name={ticker}
                        dataKey={ticker}
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.7}
                    />
                    <Radar
                        name={comparedTicker}
                        dataKey={comparedTicker}
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        fillOpacity={0.7}
                    />
                    <Legend />
                </RadarChart>
            </ResponsiveContainer>
        </>
    );
};
export default RadarChartView;
