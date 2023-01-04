import { Box, Heading } from "@chakra-ui/react";
import Link from "next/link";
import styles from "./layout.module.css";
import React from "react";

interface IHeaderProps {
    pageHeader: string;
    pathLink: string;
    isBack?: boolean;
}

const Header = ({ pageHeader, pathLink, isBack }: IHeaderProps) => {
    return (
        <>
            <header className={styles.header}>
                <Box boxShadow="2xl" borderWidth="1px">
                    <Heading
                        mt="10px"
                        mb="10px"
                        ml="15px"
                        as="span"
                        textAlign={"left"}
                        size="lg"
                        noOfLines={1}
                    >
                        <Link href={{ pathname: pathLink }}>{pageHeader}</Link>
                    </Heading>
                </Box>
            </header>
        </>
    );
};
export default React.memo(Header);
