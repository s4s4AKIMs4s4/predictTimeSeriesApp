import React from 'react'
import styles from '../components/layout.module.css'

interface IPredictPageBody {
    children: React.ReactElement
}
const PredictPageBody: React.FC<IPredictPageBody> = ({ children }) => {
    return <main className={styles.mainContainer}>
        <div className={styles.predictPageContainer}>
            {children}
        </div>
    </main>
}
export default PredictPageBody