import Head from "next/head";
import inputPageCSS from "./inputPage.module.css";
import Layout from "../entities/Layout";
import Header from "../entities/Header";
import { Button, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import WizardContainer from "../entities/Containers/WizardContainer";
import { useMemo, useState } from "react";
import useNavigate from "../features/useNavigate";

interface IWizrardSteps {
    imageSrc: string;
    description: string;
    isActice: boolean;
    index: number;
}

export default function InputPage() {
    const { navigateToSelectPage } = useNavigate();
    const [wizardSteps, setWizardSteps] = useState<Array<IWizrardSteps>>([
        {
            imageSrc: "/images/wizard-step-1.png",
            description:
                "Study the financial condition and trading history of the selected stock",
            isActice: true,
            index: 1
        },
        {
            imageSrc: "/images/Screenshot_10.png",
            description: "View general trading statistics",
            isActice: false,
            index: 2
        },
        {
            imageSrc: "/images/Screenshot_9.png",
            description:
                "Based on the information received, set up a neural network and make a forecast for the next day",
            isActice: false,
            index: 3
        }
    ]);

    const getNextStep = () => {
        const currentStep = wizardSteps.find((step) => step.isActice);
        setWizardSteps(
            wizardSteps.map((step) => {
                const isActice = currentStep.index + 1 === step.index;
                return {
                    ...step,
                    isActice: isActice
                };
            })
        );
    };
    const isLastStep = useMemo(() => {
        const currentActiveCard = wizardSteps.find((step) => step.isActice);
        return currentActiveCard.index === wizardSteps.length;
    }, [wizardSteps]);

    const wizardCardJsx = useMemo(() => {
        const currentActiveCard = wizardSteps.find((step) => step.isActice);
        return (
            <>
                <Image
                    src={currentActiveCard.imageSrc}
                    height={350}
                    width={350}
                    alt="parametrs"
                />
                <div>
                    <Text
                        data-testid={"description"}
                        align="center"
                        fontSize="lg"
                    >
                        {currentActiveCard.description}
                    </Text>
                    <div className={inputPageCSS.wizardCard__button}>
                        <Button
                            onClick={
                                isLastStep ? navigateToSelectPage : getNextStep
                            }
                            colorScheme="teal"
                            size="lg"
                            data-testid={"next-button"}
                        >
                            {isLastStep
                                ? "Choose a ticker for the forecast"
                                : "Next"}
                        </Button>
                    </div>
                </div>
            </>
        );
    }, [wizardSteps]);

    return (
        <Layout>
            <Head>
                <title>predict time series app</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header pageHeader="Home" pathLink="/" isBack={false} />
            <WizardContainer>
                <div className={inputPageCSS.wizardWrapper}>
                    <Heading
                        as="h1"
                        textAlign={"center"}
                        size="xl"
                        noOfLines={3}
                        role={"heading"}
                    >
                        The application allows
                    </Heading>
                    <div className={inputPageCSS.wizardCard}>
                        {wizardCardJsx}
                    </div>
                </div>
            </WizardContainer>
        </Layout>
    );
}
