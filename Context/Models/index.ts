import React from "react";
export interface IMessageContext {
    ticker: string | null;
    setTicker: (picedTicer: string) => void;
    comparedTicker: string | null;
    setCompatedTicker: (picedTicer: string) => void;
}
export const TickerContext = React.createContext<IMessageContext>({
    ticker: "",
    setTicker: () => {},
    comparedTicker: null,
    setCompatedTicker: () => {}
});
