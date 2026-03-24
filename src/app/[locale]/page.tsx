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
                <svg className={styles.labCircle} style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible', pointerEvents: 'none', width: '100px', height: '100px' }}>
                  <path d="M80 0.7C84.5 0.2 92 -0.4 96 1C100 2.4 103 6.5 104 8.9C105 11.4 104.4 13.8 102.5 15.8C100.7 17.7 97 20 92.9 20.8C88.8 21.5 82.7 20.9 77.9 20.2C73.1 19.4 66.8 17.7 64.2 16.1C61.5 14.5 61.8 12.7 62.1 10.6C62.5 8.4 62.4 4.7 66.3 3.1C70.2 1.6 82.2 1.5 85.6 1.2C89 1 87.4 1.7 87 1.7" fill="none" stroke="rgb(255, 0, 170)" strokeWidth="1.5" />
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
