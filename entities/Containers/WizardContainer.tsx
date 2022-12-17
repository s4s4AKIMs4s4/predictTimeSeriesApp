import React from 'react'
import styles from '../layout.module.css'
import MainContainer from './MainContainer'

interface IInputTimeSiresBody {
    children: React.ReactElement
}

const WizardContainer: React.FC<IInputTimeSiresBody> = ({ children }) => {
    return <MainContainer>
        <div className={styles.wizardContainer}>
            {children}
        </div>
    </MainContainer>
}
export default WizardContainer