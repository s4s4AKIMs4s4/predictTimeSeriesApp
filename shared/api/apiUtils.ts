export const API = "https://www.alphavantage.co/query";
//@ts-ignore
export const fetcher = (...args) => fetch(...args).then((res) => res.json());
