import { useState } from "react";
import { TickerContext } from "../Models";

interface AuxProps {
    children: React.ReactNode;
}

const TickerProvider = ({ children }: AuxProps) => {
    const [pickedTicker, setPickedTicker] = useState<null | string>(null)
    const [copmaredTicer, setcopmaredTicer] = useState<null | string>(null)
    
    return <>
        <TickerContext.Provider
            value={
                {
                    ticker: pickedTicker,
                    setTicker: setPickedTicker,
                    setCompatedTicker:setcopmaredTicer,
                    comparedTicker:copmaredTicer
                }
            }
        >
            {children}
        </TickerContext.Provider>
    </>
}

export default TickerProvider