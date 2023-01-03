import React from "react";
import styles from "../layout.module.css";
import MainContainer from "./MainContainer";

interface IInputTimeSiresBody {
    children: React.ReactElement;
}

const StatickContainer: React.FC<IInputTimeSiresBody> = ({ children }) => {
    return (
        <MainContainer>
            <div className={styles.staticContainer}>{children}</div>
        </MainContainer>
    );
};
export default StatickContainer;
