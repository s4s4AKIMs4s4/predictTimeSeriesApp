import { useRouter } from "next/router";
import { TimePeriod } from "../entities/Time/Model";

const useNavigate = () => {
    const router = useRouter();

    const navigateToPredictPage = (ticker:string) => {
        router.push(`/predict?ticker=${ticker}`)
    }
    
    const navigateToComparePage = (ticker:string, comparedTicker:string, timePeriod:TimePeriod) => {
            router.push(`/comparePage?ticker=${ticker}&compared-ticker=${comparedTicker}&timePeriod=${timePeriod}`)
    }
    return {
        navigateToPredictPage,
        navigateToComparePage
    }
}
export default useNavigate