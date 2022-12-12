import styles from '../layout.module.css'

interface IPredictPageBody {
    children: React.ReactElement
}
const StatickViewContainer: React.FC<IPredictPageBody> = ({ children }) => {
    return <main className={styles.mainContainer}>
        <div className={styles.StatickViewContainer}>
            {children}
        </div>
    </main>
}
export default StatickViewContainer 