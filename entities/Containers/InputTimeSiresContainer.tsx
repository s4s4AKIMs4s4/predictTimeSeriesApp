import React from "react";
import styles from "../layout.module.css";
import MainContainer from "./MainContainer";

interface IInputTimeSiresBody {
    children: React.ReactElement;
}

const InputTimeSiresContainer: React.FC<IInputTimeSiresBody> = ({
    children
}) => {
    return (
        <MainContainer>
            <div className={styles.InputContainer}>{children}</div>
        </MainContainer>
    );
};
export default InputTimeSiresContainer;
