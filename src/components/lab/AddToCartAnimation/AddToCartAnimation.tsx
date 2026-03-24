'use client';

import { useState, useRef, useCallback } from 'react';
import styles from './AddToCartAnimation.module.css';

export function AddToCartAnimation() {
  const [cartCount, setCartCount] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [flyingItems, setFlyingItems] = useState<{ id: number; x: number; y: number }[]>([]);
  const productRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);

  const handleAddToCart = useCallback(() => {
    if (isAdding) return;
    setIsAdding(true);

    const product = productRef.current;
    const cart = cartRef.current;
    if (!product || !cart) return;

    const productRect = product.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const id = idCounter.current++;
    setFlyingItems((prev) => [
      ...prev,
      {
        id,
        x: cartRect.left - productRect.left + cartRect.width / 2 - 15,
        y: cartRect.top - productRect.top + cartRect.height / 2 - 15,
      },
    ]);

    setTimeout(() => {
      setCartCount((c) => c + 1);
      setFlyingItems((prev) => prev.filter((item) => item.id !== id));
      setIsAdding(false);
    }, 600);
  }, [isAdding]);

  const handleReset = useCallback(() => {
    setCartCount(0);
    setIsAdding(false);
    setFlyingItems([]);
  }, []);

  return (
    <div className={styles.container}>
      <div ref={cartRef} className={styles.cart}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        {cartCount > 0 && (
          <span key={cartCount} className={styles.badge}>
            {cartCount}
          </span>
        )}
      </div>

      <div className={styles.productArea}>
        <div ref={productRef} className={styles.product}>
          <div className={styles.productImage}>
            <div className={styles.productGradient} />
          </div>
          {flyingItems.map((item) => (
            <div
              key={item.id}
              className={styles.flyingItem}
              style={{
                '--fly-x': `${item.x}px`,
                '--fly-y': `${item.y}px`,
              } as React.CSSProperties}
            />
          ))}
          <div className={styles.productInfo}>
            <span className={styles.productName}>Artisan Mug</span>
            <span className={`${styles.productPrice} mono`}>$42</span>
          </div>
          <button
            className={`${styles.addBtn} ${isAdding ? styles.adding : ''}`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            <span className={styles.addBtnText}>
              {isAdding ? '✓' : 'Add to Cart'}
            </span>
          </button>
        </div>
      </div>

      {cartCount > 0 && (
        <button className={styles.resetBtn} onClick={handleReset}>
          Reset demo
        </button>
      )}
    </div>
  );
}
