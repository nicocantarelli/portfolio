import Link from 'next/link';
import { Mascot } from '@/components/Mascot';
import { ThemeToggle } from '@/components/ThemeToggle';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Mascot />
          <ThemeToggle />
        </div>
      </header>

      <main className={styles.main}>
        <div className="container">
          <div className={styles.content}>
            <span className={styles.code}>404</span>
            <h1>Page not found</h1>
            <p>The page you're looking for doesn't exist or has been moved.</p>
            <Link href="/" className={styles.backLink}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 4L1.5 8M1.5 8L5.5 12M1.5 8H10C11.3807 8 12.5 6.88071 12.5 5.5V5.5C12.5 4.11929 11.3807 3 10 3H8.5" stroke="currentColor" />
              </svg>
              Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
