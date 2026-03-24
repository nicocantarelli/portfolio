'use client';

import { useEffect, useState } from 'react';
import styles from './TableOfContents.module.css';

type Section = {
  id: string;
  label: string;
};

type Props = {
  sections: Section[];
  children?: React.ReactNode;
};

export function TableOfContents({ sections, children }: Props) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id);
            }
          });
        },
        {
          rootMargin: '-20% 0px -70% 0px',
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.toc} aria-label="Table of contents">
      <ul className={styles.list}>
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(e) => handleClick(e, section.id)}
              className={`${styles.link} ${activeSection === section.id ? styles.active : ''}`}
              aria-current={activeSection === section.id ? 'location' : undefined}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
      {children}
    </nav>
  );
}
