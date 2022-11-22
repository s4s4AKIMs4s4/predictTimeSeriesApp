import { CircularProgress } from "@chakra-ui/react"
import { ICircularProgres } from "./model"

const CircularProgres:React.FC<ICircularProgres> = ({circularProgressValue}) => {
    return <>
        <CircularProgress value={circularProgressValue} />
    </>
}
export default CircularProgress




