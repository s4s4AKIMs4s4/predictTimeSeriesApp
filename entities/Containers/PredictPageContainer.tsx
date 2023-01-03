import React from "react";
import styles from "../layout.module.css";

interface IPredictPageBody {
    children: React.ReactElement;
}
const PredictPageContainer: React.FC<IPredictPageBody> = ({ children }) => {
    return (
        <main className={styles.mainContainer}>
            <div className={styles.predictPageContainer}>{children}</div>
        </main>
    );
};
export default PredictPageContainer;
