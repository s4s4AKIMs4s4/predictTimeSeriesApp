export const API = "https://www.alphavantage.co/query";
import axios from "axios";

export const fetcher = async (url) => {
    const { data } = await axios.get(url);
    return data;
};
