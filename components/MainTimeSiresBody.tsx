import React from 'react'
import styles from '../components/layout.module.css'

interface IMainTimeSiresBody {
    children: React.ReactElement
}
const MainTimeSiresBody: React.FC<IMainTimeSiresBody> = ({ children }) => {
    return <main className={styles.mainContainer}>
        <div className={styles.container}>
            {children}
        </div>
    </main>
}
export default MainTimeSiresBody