'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './Drawer.module.css';

type Position = 'bottom' | 'right';

type Props = {
  open: boolean;
  onClose: () => void;
  position?: Position;
  draggable?: boolean;
  snapPoints?: number[];
  initialSnapPoint?: number;
  onSnapPointChange?: (index: number) => void;
  scaledDown?: boolean;
  showCloseButton?: boolean;
  title?: string;
  description?: string;
  ariaLabel?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function Drawer({
  open,
  onClose,
  position = 'bottom',
  draggable = false,
  snapPoints,
  initialSnapPoint = 0,
  onSnapPointChange,
  scaledDown = false,
  showCloseButton = false,
  title,
  description,
  ariaLabel,
  children,
  footer,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<'closed' | 'entering' | 'open' | 'exiting'>('closed');
  const [isDragging, setIsDragging] = useState(false);
  const [currentSnap, setCurrentSnap] = useState(initialSnapPoint);
  const drawerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ y: 0, x: 0, time: 0 });
  const previousFocusRef = useRef<Element | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Open/close phase management
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement;
      setCurrentSnap(initialSnapPoint);
      // First render off-screen, then animate in on next frame
      setPhase('entering');
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase('open');
        });
      });
      return () => cancelAnimationFrame(raf);
    } else if (phase === 'open' || phase === 'entering') {
      setPhase('exiting');
      const timer = setTimeout(() => setPhase('closed'), 300);
      return () => clearTimeout(timer);
    }
  }, [open, initialSnapPoint]);

  // Body scroll lock
  useEffect(() => {
    if (phase === 'entering' || phase === 'open') {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [phase]);

  // Focus trap + Escape key
  useEffect(() => {
    if (phase !== 'open') return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    // Focus first focusable element
    const focusables = drawer.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length > 0) {
      focusables[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus();
      }
    };
  }, [phase, onClose]);

  // Snap point height
  const getSnapHeight = useCallback((index: number) => {
    if (!snapPoints || !snapPoints[index]) return undefined;
    return `${snapPoints[index]}vh`;
  }, [snapPoints]);

  // Drag handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (position !== 'bottom') return;
    setIsDragging(true);
    dragStartRef.current = { y: e.clientY, x: e.clientX, time: Date.now() };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [position]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || position !== 'bottom') return;
    const deltaY = e.clientY - dragStartRef.current.y;
    const drawer = drawerRef.current;
    if (!drawer || deltaY < 0) return;
    drawer.style.transform = `translateY(${deltaY}px)`;
  }, [isDragging, position]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging || position !== 'bottom') return;
    setIsDragging(false);
    const deltaY = e.clientY - dragStartRef.current.y;
    const elapsed = Date.now() - dragStartRef.current.time;
    const velocity = deltaY / elapsed;
    const drawer = drawerRef.current;

    if (!drawer) return;

    if (snapPoints && snapPoints.length > 0) {
      // Snap point logic
      const drawerHeight = drawer.getBoundingClientRect().height;
      const windowHeight = window.innerHeight;
      const currentHeight = drawerHeight - deltaY;
      const currentVh = (currentHeight / windowHeight) * 100;

      if (velocity > 0.5 || currentVh < (snapPoints[0] * 0.5)) {
        drawer.style.transform = '';
        onClose();
        return;
      }

      // Find closest snap point
      let closestIndex = 0;
      let closestDist = Math.abs(currentVh - snapPoints[0]);
      for (let i = 1; i < snapPoints.length; i++) {
        const dist = Math.abs(currentVh - snapPoints[i]);
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }
      }

      // If flicking up fast, go to next snap point up
      if (velocity < -0.3 && closestIndex < snapPoints.length - 1) {
        closestIndex = Math.min(closestIndex + 1, snapPoints.length - 1);
      }

      setCurrentSnap(closestIndex);
      onSnapPointChange?.(closestIndex);
      drawer.style.transform = '';
    } else {
      // Simple dismiss logic
      if (deltaY > 100 || velocity > 0.5) {
        drawer.style.transform = '';
        onClose();
      } else {
        drawer.style.transform = '';
      }
    }
  }, [isDragging, position, snapPoints, onClose, onSnapPointChange]);

  if (!mounted || phase === 'closed') return null;
  const isVisible = phase === 'open';

  const drawerStyle: React.CSSProperties = {};
  if (snapPoints && phase === 'open') {
    drawerStyle.height = getSnapHeight(currentSnap);
    drawerStyle.maxHeight = '90vh';
    drawerStyle.transition = isDragging
      ? 'none'
      : 'height 0.3s cubic-bezier(0.32, 0.72, 0, 1), transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)';
  }

  const drawerClasses = [
    styles.drawer,
    styles[position],
    isVisible ? styles.open : '',
    isDragging ? styles.dragging : '',
    scaledDown ? styles.scaledDown : '',
  ].filter(Boolean).join(' ');

  return createPortal(
    <>
      <div
        className={`${styles.overlay} ${phase === 'exiting' ? styles.overlayExiting : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={drawerRef}
        className={drawerClasses}
        style={drawerStyle}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel || title || 'Drawer'}
      >
        {position === 'bottom' && draggable && (
          <div
            className={styles.dragHandle}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            role="separator"
            aria-orientation="horizontal"
          >
            <div className={styles.dragBar} />
          </div>
        )}

        {snapPoints && (
          <div className={styles.snapIndicator}>
            {snapPoints.map((_, i) => (
              <div
                key={i}
                className={`${styles.snapDot} ${i === currentSnap ? styles.snapDotActive : ''}`}
              />
            ))}
          </div>
        )}

        {(title || showCloseButton) && (
          <div className={styles.header}>
            <div>
              {title && <h3 className={styles.title}>{title}</h3>}
              {description && <p className={styles.description}>{description}</p>}
            </div>
            {showCloseButton && (
              <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className={styles.body}>
          {children}
        </div>

        {footer && (
          <div className={styles.footer}>
            {footer}
          </div>
        )}
      </div>
    </>,
    document.body
  );
}
