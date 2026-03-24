'use client';

import { useRef, useCallback, useState } from 'react';
import styles from './ProductCard.module.css';

const products = [
  { name: 'Ceramic Vase', price: '$89', gradient: 'linear-gradient(135deg, #667eea, #764ba2)', details: 'Hand-thrown stoneware with a reactive glaze finish. Each piece is unique.' },
  { name: 'Oak Desk Lamp', price: '$124', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)', details: 'Solid oak base with adjustable brass arm. Warm LED bulb included.' },
  { name: 'Linen Throw', price: '$65', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)', details: 'Stonewashed Belgian linen. Softens beautifully with every wash.' },
];

export function ProductCard() {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <Card key={product.name} {...product} />
      ))}
    </div>
  );
}

function Card({ name, price, gradient, details }: { name: string; price: string; gradient: string; details: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (flipped) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  }, [flipped]);

  const handleMouseLeave = useCallback(() => {
    if (flipped) return;
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg)';
  }, [flipped]);

  return (
    <div className={styles.cardWrapper}>
      <div
        ref={cardRef}
        className={`${styles.card} ${flipped ? styles.flipped : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Front */}
        <div className={styles.front}>
          <div className={styles.image} style={{ background: gradient }} />
          <div className={styles.overlay}>
            <button className={styles.quickView} onClick={() => setFlipped(true)}>Quick View</button>
          </div>
          <div className={styles.info}>
            <span className={styles.name}>{name}</span>
            <span className={`${styles.price} mono`}>{price}</span>
          </div>
          <button className={styles.addBtn}>Add to cart</button>
        </div>

        {/* Back */}
        <div className={styles.back}>
          <div className={styles.backContent}>
            <h4 className={styles.backTitle}>{name}</h4>
            <p className={styles.backPrice}>{price}</p>
            <p className={styles.backDetails}>{details}</p>
          </div>
          <button className={styles.backClose} onClick={() => setFlipped(false)}>
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
