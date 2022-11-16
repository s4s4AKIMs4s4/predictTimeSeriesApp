import { Box, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import styles from './layout.module.css';

export default function Layout({ children }) {
  return <div className={styles.root}>

    <div className={styles.header}>
      <Box
        boxShadow='2xl'
        borderWidth='1px'
      >
        <Heading mt='5px' mb='5px' ml='5px' as='span' textAlign={'left'} size='lg' noOfLines={1}>
          <Link href={{ pathname: '/' }}>
            Home
          </Link>
        </Heading>
      </Box>
    </div>
    <main className={styles.container}>
      {children}
    </main >
  </div >
}