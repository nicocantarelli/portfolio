'use client';

import { useState, useCallback, useRef } from 'react';
import styles from './PageTransitionsDemo.module.css';

type TransitionType = 'fade' | 'slide' | 'morph';

const pages = [
  {
    id: 'home',
    title: 'Welcome',
    content: 'A modern storefront with curated collections and seasonal highlights.',
    accent: 'var(--color-accent-blue)',
  },
  {
    id: 'products',
    title: 'Products',
    content: 'Browse our handcrafted selection of artisan goods, each made with care.',
    accent: 'var(--color-accent-green)',
  },
  {
    id: 'about',
    title: 'Our Story',
    content: 'Founded in 2020, we believe in sustainable craft and honest materials.',
    accent: 'var(--color-accent-orange)',
  },
];

export function PageTransitionsDemo() {
  const [currentPage, setCurrentPage] = useState(0);
  const [transitionType, setTransitionType] = useState<TransitionType>('fade');
  const [phase, setPhase] = useState<'idle' | 'exit' | 'enter'>('idle');
  const nextPageRef = useRef(0);

  const navigateTo = useCallback((index: number) => {
    if (index === currentPage || phase !== 'idle') return;

    nextPageRef.current = index;
    setPhase('exit');

    setTimeout(() => {
      setCurrentPage(index);
      setPhase('enter');

      setTimeout(() => {
        setPhase('idle');
      }, 350);
    }, 300);
  }, [currentPage, phase]);

  const page = pages[currentPage];

  const contentClass = [
    styles.pageContent,
    phase === 'exit' ? styles[`${transitionType}Exit`] : '',
    phase === 'enter' ? styles[`${transitionType}Enter`] : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.tabs}>
          {(['fade', 'slide', 'morph'] as TransitionType[]).map((type) => (
            <button
              key={type}
              className={`${styles.tab} ${transitionType === type ? styles.tabActive : ''}`}
              onClick={() => setTransitionType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.browser}>
        <div className={styles.browserBar}>
          <div className={styles.dots} aria-hidden="true">
            <span /><span /><span />
          </div>
          <div className={styles.urlBar}>demo-store.com/{page.id}</div>
        </div>

        <div className={styles.browserContent}>
          <nav className={styles.pageNav}>
            {pages.map((p, i) => (
              <button
                key={p.id}
                className={`${styles.pageLink} ${i === currentPage ? styles.pageLinkActive : ''}`}
                onClick={() => navigateTo(i)}
                style={i === currentPage ? { borderColor: page.accent } : undefined}
              >
                {p.title}
              </button>
            ))}
          </nav>

          <div className={contentClass}>
            <div
              className={styles.pageHero}
              style={{ background: page.accent }}
            />
            <h3 className={styles.pageTitle}>{page.title}</h3>
            <p className={styles.pageText}>{page.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
