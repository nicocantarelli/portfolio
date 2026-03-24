'use client';

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';
import styles from './LanguageToggle.module.css';

export function LanguageToggle() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus the first option when dropdown opens
  useEffect(() => {
    if (isOpen) {
      const currentIndex = locales.indexOf(locale);
      setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
      optionRefs.current[currentIndex >= 0 ? currentIndex : 0]?.focus();
    }
  }, [isOpen, locale]);

  const handleLocaleChange = useCallback((newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
    setFocusedIndex(-1);
    buttonRef.current?.focus();
  }, [router, pathname]);

  function handleKeyDown(e: KeyboardEvent) {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => {
          const next = (prev + 1) % locales.length;
          optionRefs.current[next]?.focus();
          return next;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => {
          const next = prev <= 0 ? locales.length - 1 : prev - 1;
          optionRefs.current[next]?.focus();
          return next;
        });
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0) {
          handleLocaleChange(locales[focusedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
        break;
      case 'Tab':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
    }
  }

  return (
    <div className={styles.wrapper} ref={dropdownRef} onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        className={styles.toggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <span className={styles.current}>{locale.toUpperCase()}</span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <ul className={styles.dropdown} role="listbox" aria-label="Available languages">
          {locales.map((l, index) => (
            <li key={l} role="presentation">
              <button
                ref={(el) => { optionRefs.current[index] = el; }}
                className={`${styles.option} ${l === locale ? styles.optionActive : ''}`}
                onClick={() => handleLocaleChange(l)}
                role="option"
                aria-selected={l === locale}
                tabIndex={-1}
              >
                <span className={styles.code}>{l.toUpperCase()}</span>
                <span className={styles.name}>{localeNames[l]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
