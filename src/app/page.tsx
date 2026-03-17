import Image from 'next/image';
import Link from 'next/link';
import { Mascot } from '@/components/Mascot';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ContactForm } from '@/components/ContactForm';
import { FooterTime } from '@/components/FooterTime';
import { FadeIn } from '@/components/FadeIn';
import { PageTransition } from '@/components/PageTransition';
import { projects } from '@/data/projects';
import styles from './page.module.css';

export default function Home() {
  return (
    <PageTransition>
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Mascot />
          <ThemeToggle />
        </div>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <FadeIn>
            <h1>
              Hi, I'm <span className="highlight">Nico Cantarelli</span>
            </h1>
            <p className={styles.tagline}>
              I <span className="underline-sketch">build websites</span> from your designs.
            </p>
            <p className={styles.intro}>
              Frontend developer specializing in Shopify themes, WordPress, and custom web development.
              You bring the design, I bring it to life.
            </p>
            <a href="#contact" className={styles.cta}>
              Get in touch <span>→</span>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Work */}
      <section className={styles.work} id="work">
        <div className="container">
          <h2 className="mono">// Recent work</h2>
        </div>
        <div className={styles.projects}>
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={styles.project}
            >
              <div className={styles.browserFrame}>
                <div className={styles.browserHeader}>
                  <div className={styles.browserDots}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className={styles.browserUrl}>{project.url}</div>
                </div>
                <div className={styles.projectImage}>
                  {project.images.length > 0 ? (
                    <Image
                      src={project.images[0]}
                      alt={`${project.name} website screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, 800px"
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                    />
                  ) : (
                    <div className={styles.projectPlaceholder}>
                      <span className="mono">{project.name}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.projectInfo}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About */}
      <section className={styles.about} id="about">
        <div className="container">
          <FadeIn>
            <h2 className="mono">// About</h2>
            <div className={styles.aboutContent}>
              <p>
                I'm a frontend developer based in Argentina, having lived in Berlin, Turin, and Boston along the way. I studied programming in Berlin, and for the past year led development at{' '}
                <a href="https://dribbble.com/lumiosdigital" target="_blank" rel="noopener noreferrer" className="underline-double">
                  Lumios Digital
                </a>
                , building e-commerce sites for brands like Tashola, Baudie, and Walkfully.
              </p>
              <p>
                <span className="highlight-orange">Now I'm branching out on my own.</span>
              </p>
              <p>
                I work best with designers and agencies who have the vision. I handle the build. I speak English, Spanish and Italian, so wherever you're based, we can work together.
              </p>
              <p>
                <strong>What I work with:</strong>
              </p>
              <ul className={styles.skills}>
                <li>Custom Shopify themes</li>
                <li>WordPress & headless CMS</li>
                <li>React & Next.js</li>
                <li>Pixel-perfect from Figma</li>
                <li>Fast, clean code</li>
                <li>SEO-friendly markup</li>
                <li>Accessible / WCAG compliant</li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact */}
      <section className={styles.contact} id="contact">
        <div className="container">
          <FadeIn>
            <h2 className="mono">// Let's work together</h2>
            <p className={styles.contactIntro}>Have a project with designs ready? Let's talk.</p>
            <ContactForm />
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <FooterTime />
        </div>
      </footer>
    </div>
    </PageTransition>
  );
}
