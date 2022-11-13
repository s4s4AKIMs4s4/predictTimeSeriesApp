import { useRouter } from "next/router";

const useNavigate = () => {
    const router = useRouter();

    const navigateToPredictPage = (ticker:string) => {
        router.push(`/predict?ticker=${ticker}`)

    }
    return {
        navigateToPredictPage
    }
}
export default useNavigate