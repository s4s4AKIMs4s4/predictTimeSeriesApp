import { CircularProgress } from "@chakra-ui/react";
import { ICircularProgres } from "./model";
import React from "react";

const CircularProgres: React.FC<ICircularProgres> = ({
    circularProgressValue
}) => {
    return (
        <>
            <CircularProgress value={circularProgressValue} />
        </>
    );
};
export default React.memo(CircularProgress);
