import moment from "moment";

const useStaticValues = (data: klinecharts.KLineData[]) => {
    function compareNumbers(a, b) {
        return a - b;
    }

    const getMSE = (key: keyof klinecharts.KLineData) => {
        const summ = data.reduce((acc, value) => {
            return acc + value[key];
        }, 0);
        return summ / data.length;
    };

    const getMode = (atribute: keyof klinecharts.KLineData) => {
        const modeAr = data
            .map((value) => value[atribute])
            .sort(compareNumbers);
        return modeAr[Math.trunc(Number(modeAr.length / 2))];
    };
    const getTimeAgo = () => {
        const time = moment(data[0].timestamp);
        return time.fromNow();
    };

    const getMax = () => {
        return data.reduce((acc, value) => {
            return value.close > acc ? value.close : acc;
        }, 0);
    };

    const amountOfDeal = () => {
        return data.length;
    };

    const getMin = () => {
        return data.reduce((acc, value) => {
            return value.close < acc ? value.close : acc;
        }, 500000);
    };

    return {
        getMSE,
        getMode,
        getTimeAgo,
        getMax,
        getMin,
        amountOfDeal
    };
};
export default useStaticValues;
