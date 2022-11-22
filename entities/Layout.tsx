import { Box, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import styles from './layout.module.css';

export default function Layout({ children }) {
  return <div className={styles.root}>
      {children}
  </div >
}