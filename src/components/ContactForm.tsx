'use client';

import { useState, FormEvent, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import styles from './ContactForm.module.css';

export function ContactForm() {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Focus close button when modal opens, handle Escape key
  useEffect(() => {
    if (isSuccess) {
      closeButtonRef.current?.focus();

      function handleEscape(e: KeyboardEvent) {
        if (e.key === 'Escape') {
          setIsSuccess(false);
          submitButtonRef.current?.focus();
        }
      }

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isSuccess]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mgonnajr', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const closeModal = useCallback(() => {
    setIsSuccess(false);
    submitButtonRef.current?.focus();
  }, []);

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">{t('form.name')}</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">{t('form.email')}</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">{t('form.message')}</label>
          <textarea id="message" name="message" rows={5} required />
        </div>
        <button
          ref={submitButtonRef}
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? t('form.sending') : t('form.submit')} <span>→</span>
        </button>
      </form>

      {isSuccess && mounted && createPortal(
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-modal-title"
          >
            <p className={styles.modalIcon} aria-hidden="true">{'{ • ◡ • }'}</p>
            <h3 id="success-modal-title">{t('success.title')}</h3>
            <p>{t('success.line1')}</p>
            <p>{t('success.line2')}</p>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeModal}
              className={styles.modalBtn}
            >
              {t('success.close')}
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
