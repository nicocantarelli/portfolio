'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ScrollProductReveal.module.css';

export function ScrollProductReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight;
      const end = -rect.height;
      const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.min(1, progress * 3);
  const rotation = (1 - Math.min(1, progress * 2)) * 15;
  const scale = 0.7 + Math.min(0.3, progress * 0.6);
  const detailsOpacity = Math.max(0, (progress - 0.25) * 2);

  return (
    <div ref={sectionRef} className={styles.container}>
      <div
        className={styles.product}
        style={{
          opacity,
          transform: `rotate(${rotation}deg) scale(${scale})`,
        }}
      >
        {/* Bottle silhouette via CSS */}
        <div className={styles.bottle}>
          <div className={styles.bottleCap} />
          <div className={styles.bottleNeck} />
          <div className={styles.bottleBody}>
            <div className={styles.bottleLabel}>
              <span className={styles.brandName}>ARTISAN</span>
              <span className={styles.productType}>Reserve</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.details} style={{
        opacity: detailsOpacity,
        transform: `translateY(${(1 - detailsOpacity) * 12}px)`,
      }}>
        <div className={styles.detail}>
          <span className={`${styles.detailLabel} mono`}>Origin</span>
          <span className={styles.detailValue}>Mendoza, Argentina</span>
        </div>
        <div className={styles.detail}>
          <span className={`${styles.detailLabel} mono`}>Volume</span>
          <span className={styles.detailValue}>750ml</span>
        </div>
        <div className={styles.detail}>
          <span className={`${styles.detailLabel} mono`}>Year</span>
          <span className={styles.detailValue}>2024</span>
        </div>
      </div>
    </div>
  );
}
