import React from "react";
import styles from "../layout.module.css";
interface IMainContainer {
    children: React.ReactElement;
}
const MainContainer: React.FC<IMainContainer> = ({ children }) => {
    return <main className={styles.mainContainer}>{children}</main>;
};
export default MainContainer;
