'use client';

import { useState, useEffect } from 'react';
import styles from './FooterTime.module.css';

export function FooterTime() {
  const [time, setTime] = useState<string>('');
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      const argentinaTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Argentina/Buenos_Aires',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(now);

      const argentinaHour = parseInt(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/Argentina/Buenos_Aires',
          hour: 'numeric',
          hour12: false,
        }).format(now)
      );

      setTime(argentinaTime);
      setIsNight(argentinaHour >= 22 || argentinaHour < 7);
    }

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.footer}>
      <div className={styles.robot}>
        {isNight ? (
          <>
            <span className={styles.face}>{'{ – – }'}</span>
            <span className={styles.zzz}>
              <span>z</span>
              <span>z</span>
              <span>z</span>
            </span>
          </>
        ) : (
          <span className={styles.face}>{'{ • • }'}</span>
        )}
      </div>
      <p className={styles.time}>
        {time} in Argentina
      </p>
    </div>
  );
}
