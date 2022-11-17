import React from 'react'
import styles from '../components/layout.module.css'
import MainContainer from './MainContainer'

interface IInputTimeSiresBody {
    children: React.ReactElement
}

const InputTimeSiresBody: React.FC<IInputTimeSiresBody> = ({ children }) => {
    return <MainContainer>
        <div className={styles.InputContainer}>
            {children}
        </div>
    </MainContainer>
}
export default InputTimeSiresBody