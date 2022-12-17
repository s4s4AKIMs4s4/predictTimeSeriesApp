import { useRouter } from "next/router";
import { TimePeriod } from "../entities/Time/Model";

const useNavigate = () => {
    const router = useRouter();

    const navigateToPredictPage = (ticker:string) => {
        router.push(`/predict?ticker=${ticker}`)
    }

    const navigateToStatistickPage = (ticker:string) => {
        router.push(`/statistic?ticker=${ticker}`)
        // statistic?ticker=MSFT
    }


    const navigateToSelectPage = () => {
        router.push(`/select`)
        // statistic?ticker=MSFT
    }
    
    const navigateToComparePage = (ticker:string, comparedTicker:string, timePeriod:TimePeriod) => {
            router.push(`/comparePage?ticker=${ticker}&compared-ticker=${comparedTicker}&timePeriod=${timePeriod}`)
    }
    return {
        navigateToPredictPage,
        navigateToComparePage,
        navigateToStatistickPage,
        navigateToSelectPage
    }
}
export default useNavigate