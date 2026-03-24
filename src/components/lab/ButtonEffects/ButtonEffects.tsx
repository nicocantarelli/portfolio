'use client';

import { useRef, useCallback } from 'react';
import styles from './ButtonEffects.module.css';

export function ButtonEffects() {
  const rippleRef = useRef<HTMLButtonElement>(null);

  const handleRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = rippleRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = document.createElement('span');
    ripple.className = styles.ripple;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }, []);

  return (
    <div className={styles.grid}>
      <button className={`${styles.btn} ${styles.fill}`}>
        <span className={styles.fillBg} />
        <span className={styles.btnText}>Fill</span>
      </button>

      <button
        ref={rippleRef}
        className={`${styles.btn} ${styles.rippleBtn}`}
        onClick={handleRipple}
      >
        <span className={styles.btnText}>Ripple</span>
      </button>

      <button className={`${styles.btn} ${styles.jelly}`}>
        Jelly
      </button>

      <button className={`${styles.btn} ${styles.glow}`}>
        Glow
      </button>

      <button className={`${styles.btn} ${styles.underline}`}>
        <span>Underline</span>
      </button>

      <button className={`${styles.btn} ${styles.scale}`}>
        Scale
      </button>
    </div>
  );
}
