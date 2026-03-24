import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Mascot } from '@/components/Mascot';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ContactForm } from '@/components/ContactForm';
import { FooterTime } from '@/components/FooterTime';
import { FadeIn } from '@/components/FadeIn';
import { PageTransition } from '@/components/PageTransition';
import { TableOfContents } from '@/components/TableOfContents';
import { ScrollToTop } from '@/components/lab/ScrollToTop';
import { projects, getProjectDescription } from '@/data/projects';
import { locales, type Locale } from '@/i18n/config';
import styles from './page.module.css';

type Props = {
  params: Promise<{ locale: string }>;
};

const siteUrl = 'https://nicocantarelli.com';

const ogLocaleMap: Record<string, string> = { en: 'en_US', es: 'es_AR', it: 'it_IT' };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  const languages: Record<string, string> = {};
  locales.forEach((l) => {
    languages[l] = `${siteUrl}/${l}`;
  });
  languages['x-default'] = `${siteUrl}/en`;

  return {
    title: { absolute: t('title') },
    description: t('description'),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${siteUrl}/${locale}`,
      locale: ogLocaleMap[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocaleMap[l]),
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent locale={locale as Locale} />;
}

function HomeContent({ locale }: { locale: Locale }) {
  const t = useTranslations();

  const sections = [
    { id: 'home', label: t('navigation.home') },
    { id: 'work', label: t('navigation.work') },
    { id: 'services', label: t('navigation.services') },
    // { id: 'testimonials', label: t('navigation.testimonials') },
    { id: 'about', label: t('navigation.about') },
    { id: 'contact', label: t('navigation.contact') },
  ];

  const testimonials = t.raw('testimonials.items') as Array<{
    quote: string;
    author: string;
    role: string;
  }>;

  const aboutParagraphs = t.raw('about.paragraphs') as string[];
  const skills = t.raw('about.skills') as string[];

  return (
    <PageTransition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Nico Cantarelli',
            url: 'https://nicocantarelli.com',
          }),
        }}
      />
      <a href="#main" className="skip-link">Skip to main content</a>
      <div className={styles.page}>
        {/* Header */}
        <header className={styles.header}>
          <div className={`container ${styles.headerInner}`}>
            <Mascot />
            <div className={styles.headerControls}>
              <LanguageToggle />
              <Link href="/lab" className={styles.labLinkMobile}>
                {t('navigation.lab')}
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Two-column layout */}
        <div className={styles.layout}>
          <TableOfContents sections={sections}>
            <Link href="/lab" className={styles.tocLabLink}>
              <span className={styles.labWordWrap}>
                {t('navigation.lab')}
                <svg className={styles.labCircle} viewBox="0 0 44 26" fill="none">
                  <path className={styles.labCirclePath1} d="M30 2C34 3 39 5 41 8C43 11 43 15 40 18C37 21 31 24 24 24C17 24 9 22 5 19C1 16 0 12 1 9C2 6 6 3 11 2C16 1 25 1 30 2C34 3 39 5 41 8" stroke="rgb(255, 0, 170)" strokeWidth="1.5" fill="none" />
                  <path className={styles.labCirclePath2} d="M14 5C18 3 24 2 29 3C34 4 38 7 39 10C40 13 39 16 36 18.5C33 21 27 22 22 22C17 22 11 21 7 18.5C3 16 2 13 2.5 10.5C3 8 7 5.5 11 4.5C15 3.5 16 5 14 5" stroke="rgb(255, 0, 170)" strokeWidth="1.5" fill="none" />
                </svg>
              </span>
            </Link>
          </TableOfContents>

          <main id="main" className={styles.content}>
            {/* Hero */}
            <section id="home" className={styles.hero}>
              <FadeIn>
                <h1>
                  {t('hero.greeting')} <span className="highlight">{t('hero.name')}</span>
                </h1>
                <p className={styles.tagline}>
                  {t.rich('hero.tagline', {
                    action: (chunks) => <span className="underline-sketch">{chunks}</span>
                  })}
                </p>
                <p className={styles.intro}>
                  {t('hero.intro')}
                </p>
                <a href="#contact" className={styles.cta}>
                  {t('hero.cta')} <span>→</span>
                </a>
              </FadeIn>
            </section>

            {/* Work */}
            <section id="work" className={styles.work}>
              <h2 className="mono">{t('work.title')}</h2>
              <div className={styles.projects}>
                {projects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className={styles.project}
                  >
                    <div className={styles.browserFrame}>
                      <div className={styles.browserHeader}>
                        <div className={styles.browserDots} aria-hidden="true">
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
                            alt={t('work.imageAlt', { name: project.name })}
                            fill
                            sizes="(max-width: 768px) 100vw, 600px"
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
                      <p>{getProjectDescription(project.slug, locale)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Services */}
            <section id="services" className={styles.services}>
              <FadeIn>
                <h2 className="mono">{t('services.title')}</h2>
                <ul className={styles.servicesList}>
                  <li>
                    <h3>{t('services.shopify.title')}</h3>
                    <p>{t('services.shopify.description')}</p>
                  </li>
                  <li>
                    <h3>{t('services.wordpress.title')}</h3>
                    <p>{t('services.wordpress.description')}</p>
                  </li>
                  <li>
                    <h3>{t('services.landing.title')}</h3>
                    <p>{t('services.landing.description')}</p>
                  </li>
                  <li>
                    <h3>{t('services.maintenance.title')}</h3>
                    <p>{t('services.maintenance.description')}</p>
                  </li>
                </ul>
              </FadeIn>
            </section>

            {/* Testimonials — uncomment when you have real quotes
            <section id="testimonials" className={styles.testimonials}>
              <FadeIn>
                <h2 className="mono">{t('testimonials.title')}</h2>
                <div className={styles.testimonialsList}>
                  {testimonials.map((item, index) => (
                    <blockquote key={index} className={styles.testimonial}>
                      <p>"{item.quote}"</p>
                      <cite>— {item.author}, {item.role}</cite>
                    </blockquote>
                  ))}
                </div>
              </FadeIn>
            </section>
            */}

            {/* About */}
            <section id="about" className={styles.about}>
              <FadeIn>
                <h2 className="mono">{t('about.title')}</h2>
                <div className={styles.aboutContent}>
                  <p>
                    {aboutParagraphs[0].split('{agency}')[0]}
                    <a
                      href="https://dribbble.com/lumiosdigital"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-double"
                      aria-label={`${t('about.agencyName')} (opens in new tab)`}
                    >
                      {t('about.agencyName')}
                    </a>
                    {aboutParagraphs[0].split('{agency}')[1]}
                  </p>
                  <p>
                    <span className="highlight-orange">{aboutParagraphs[1]}</span>
                  </p>
                  <p>{aboutParagraphs[2]}</p>
                  <p>
                    <strong>{t('about.skillsTitle')}</strong>
                  </p>
                  <ul className={styles.skills}>
                    {skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </section>

            {/* Contact */}
            <section id="contact" className={styles.contact}>
              <FadeIn>
                <h2 className="mono">{t('contact.title')}</h2>
                <p className={styles.contactIntro}>{t('contact.intro')}</p>
                <ContactForm />
              </FadeIn>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
              <FooterTime />
            </footer>
          </main>
        </div>
      </div>
      <ScrollToTop />
    </PageTransition>
  );
}
