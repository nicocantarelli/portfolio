'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './TextRevealScroll.module.css';

const WORD_TEXT = 'Design is not just what it looks like and feels like. Design is how it works.';
const CHAR_TEXT = 'Build · Ship · Iterate';

export function TextRevealScroll() {
  return (
    <div className={styles.container}>
      <WordReveal text={WORD_TEXT} />
      <div className={styles.divider} />
      <CharReveal text={CHAR_TEXT} />
    </div>
  );
}

function WordReveal({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const handleScroll = () => {
              const rect = el.getBoundingClientRect();
              const windowHeight = window.innerHeight;
              const start = windowHeight * 0.8;
              const end = windowHeight * 0.2;
              const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
              setProgress(p);
            };
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
            return () => window.removeEventListener('scroll', handleScroll);
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');

  return (
    <div>
      <span className={`${styles.label} mono`}>Word by word</span>
      <p ref={containerRef} className={styles.text}>
        {words.map((word, i) => {
          const wordProgress = i / words.length;
          const isRevealed = progress > wordProgress;
          return (
            <span
              key={i}
              className={`${styles.word} ${isRevealed ? styles.revealed : ''}`}
            >
              {word}{' '}
            </span>
          );
        })}
      </p>
    </div>
  );
}

function CharReveal({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const handleScroll = () => {
              const rect = el.getBoundingClientRect();
              const windowHeight = window.innerHeight;
              const start = windowHeight * 0.8;
              const end = windowHeight * 0.2;
              const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
              setProgress(p);
            };
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
            return () => window.removeEventListener('scroll', handleScroll);
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const chars = text.split('');

  return (
    <div>
      <span className={`${styles.label} mono`}>Character by character</span>
      <p ref={containerRef} className={`${styles.text} ${styles.charText}`}>
        {chars.map((char, i) => {
          const charProgress = i / chars.length;
          const isRevealed = progress > charProgress;
          return (
            <span
              key={i}
              className={`${styles.char} ${isRevealed ? styles.revealed : ''}`}
            >
              {char}
            </span>
          );
        })}
      </p>
    </div>
  );
}
