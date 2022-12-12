import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ISynchronizationChart } from './Model';

const SynchronizationChart:React.FC<ISynchronizationChart> = ({lastData,lastDataFunciton,ticker,comparedTicker}) => {
    return <>
    <div>
                    <h4>{ticker}:</h4>
                    <AreaChart
                        width={500}
                        height={200}
                        data={lastData.ticker}
                        syncId="anyId"
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey={lastDataFunciton} stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                    <p>{comparedTicker}:</p>
                    <AreaChart
                        width={500}
                        height={200}
                        data={lastData.comapredTicker}
                        syncId="anyId"
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey={lastDataFunciton} stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                </div>
    </>
}
export default SynchronizationChart