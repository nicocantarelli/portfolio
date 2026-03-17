'use client';

import { ReactNode } from 'react';
import styles from './PageTransition.module.css';

type Props = {
  children: ReactNode;
};

export function PageTransition({ children }: Props) {
  return <div className={styles.page}>{children}</div>;
}
