'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Mascot.module.css';

export function Mascot() {
  const [isBlinking, setIsBlinking] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const mascotRef = useRef<HTMLDivElement>(null);

  // Random blinking
  useEffect(() => {
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    };

    const scheduleNextBlink = () => {
      const delay = 2000 + Math.random() * 4000; // 2-6 seconds
      return setTimeout(() => {
        blink();
        scheduleNextBlink();
      }, delay);
    };

    const timeoutId = scheduleNextBlink();
    return () => clearTimeout(timeoutId);
  }, []);

  // Eye tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mascotRef.current) return;

      const rect = mascotRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Limit movement to a small range
      const maxOffset = 2;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const normalizedX = (deltaX / distance) * Math.min(distance / 100, maxOffset);
      const normalizedY = (deltaY / distance) * Math.min(distance / 100, maxOffset);

      setEyeOffset({
        x: isNaN(normalizedX) ? 0 : normalizedX,
        y: isNaN(normalizedY) ? 0 : normalizedY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={mascotRef} className={styles.mascot} aria-hidden="true">
      <span className={styles.brace}>{'{'}</span>
      <span
        className={styles.eyes}
        style={{
          transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
        }}
      >
        {isBlinking ? '- -' : '• •'}
      </span>
      <span className={styles.brace}>{'}'}</span>
    </div>
  );
}
