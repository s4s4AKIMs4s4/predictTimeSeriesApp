import Head from 'next/head'
import inputPage from './inputPage.module.css'
import TickerProvider from '../Context/Providers/TickerProvider';
import SearchView from '../widgets/Search/SearchView';
import Layout from '../entities/Layout';
import Header from '../entities/Header';
import MainTimeSiresBody from '../entities/Containers/InputTimeSiresContainer';
import { Button, Text } from '@chakra-ui/react';
import Image from 'next/image';
import WizardContainer from '../entities/Containers/WizardContainer';
import { useMemo, useState } from 'react';
import { sep } from 'path';
import useNavigate from '../features/useNavigate';


interface IWizrardSteps {
  imageSrc: string;
  description: string,
  isActice: boolean,
  index: number
}

export default function InputPage() {
  const {navigateToSelectPage} = useNavigate()

  const [wizardSteps, setWizardSteps] = useState<Array<IWizrardSteps>>([
    {
      imageSrc: '/images/parametrs.png',
      description: 'ky',
      isActice: true,
      index: 1,
    },
    {
      imageSrc: '/images/indicators.png',
      description: 'sa',
      isActice: false,
      index: 2,
    },
    {
      imageSrc: '/images/prediction.png',
      description: 'cv',
      isActice: false,
      index: 3,
    },
  ])

  const getNextStep = () => {
    const currentStep = wizardSteps.find(step => step.isActice)
    setWizardSteps(wizardSteps.map((step) => {
      const isActice = (currentStep.index + 1) === step.index
      return {
        ...step,
        isActice: isActice
      }
    }))
  }

  const wizardCardJsx = useMemo(() => {
    const currentActiveCard = wizardSteps.find((step) => step.isActice)
    return <>
      <Image
        src={currentActiveCard.imageSrc}
        height={400}
        width={400}
        alt="parametrs"
      />
      <div>
        <Text fontSize='2xl'>{currentActiveCard.description}</Text>
        {
          currentActiveCard.index === wizardSteps.length ?
            <Button onClick={navigateToSelectPage} colorScheme='teal' size='lg'>
              Выбрать тикер для прогноза
            </Button>
            : <Button onClick={getNextStep} colorScheme='teal' size='lg'>
              Дальше
            </Button>
        }

      </div>
    </>

  }, [wizardSteps])

  return (
    <Layout>
      <Head>
        <title>predict time series app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header pageHeader='Home' pathLink='/' isBack={false} />
      <WizardContainer>
        <div>
          {wizardCardJsx}

        </div>
      </WizardContainer>
    </Layout>
  )
}
