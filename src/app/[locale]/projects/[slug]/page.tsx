import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Mascot } from '@/components/Mascot';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { FooterTime } from '@/components/FooterTime';
import { PageTransition } from '@/components/PageTransition';
import { getProjectBySlug, getAllProjectSlugs, getProjectTranslations } from '@/data/projects';
import { locales, type Locale } from '@/i18n/config';
import styles from './page.module.css';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

const siteUrl = 'https://nicocantarelli.com';

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const project = getProjectBySlug(slug);
  const translations = getProjectTranslations(slug, locale as Locale);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  const languages: Record<string, string> = {};
  locales.forEach((l) => {
    languages[l] = `${siteUrl}/${l}/projects/${slug}`;
  });

  return {
    title: `${project.name} - Nico Cantarelli`,
    description: translations?.longDescription || project.longDescription,
    alternates: {
      canonical: `${siteUrl}/${locale}/projects/${slug}`,
      languages,
    },
    openGraph: {
      title: `${project.name} - Nico Cantarelli`,
      description: translations?.longDescription || project.longDescription,
      url: `${siteUrl}/${locale}/projects/${slug}`,
      locale: locale,
      alternateLocale: locales.filter((l) => l !== locale),
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectContent project={project} locale={locale as Locale} />;
}

type Project = NonNullable<ReturnType<typeof getProjectBySlug>>;

function ProjectContent({ project, locale }: { project: Project; locale: Locale }) {
  const t = useTranslations('project');
  const translations = getProjectTranslations(project.slug, locale);

  const description = translations?.description || project.description;
  const longDescription = translations?.longDescription || project.longDescription;
  const role = translations?.role || project.role;

  return (
    <PageTransition>
      <a href="#main" className="skip-link">Skip to main content</a>
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={`container ${styles.headerInner}`}>
            <Mascot />
            <div className={styles.headerControls}>
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main id="main" className={styles.main}>
          <div className="container">
            <div className={styles.navRow}>
              <Link href="/#work" className={styles.backLink}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.5 4L1.5 8M1.5 8L5.5 12M1.5 8H10C11.3807 8 12.5 6.88071 12.5 5.5V5.5C12.5 4.11929 11.3807 3 10 3H8.5" stroke="currentColor" />
                </svg>
                {t('backToHome')}
              </Link>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.visitLink}
                aria-label={`${t('visitSite')} ${project.name} (opens in new tab)`}
              >
                {t('visitSite')}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.5 4L12.5 8M12.5 8L8.5 12M12.5 8H4C2.61929 8 1.5 6.88071 1.5 5.5V5.5C1.5 4.11929 2.61929 3 4 3H5.5" stroke="currentColor" />
                </svg>
              </a>
            </div>

            <article className={styles.project}>
              {project.images.length > 0 && (
                <div className={styles.heroImage}>
                  <div className={styles.browserFrame}>
                    <div className={styles.browserHeader}>
                      <div className={styles.browserDots} aria-hidden="true">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <div className={styles.browserUrl}>{project.url}</div>
                    </div>
                    <div className={styles.imageContainer}>
                      <Image
                        src={project.images[0]}
                        alt={t('screenshotAlt', { name: project.name, number: 1 })}
                        fill
                        sizes="(max-width: 768px) 100vw, 800px"
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        priority
                      />
                    </div>
                  </div>
                </div>
              )}

              <header className={styles.projectHeader}>
                <h1>{project.name}</h1>
                <p className={styles.tagline}>{description}</p>
              </header>

              <section className={styles.section}>
                <h2 className="mono">{t('about')}</h2>
                <p>{longDescription}</p>
              </section>

              <section className={styles.section}>
                <h2 className="mono">{t('role')}</h2>
                <p>{role}</p>
              </section>

              <section className={styles.section}>
                <h2 className="mono">{t('techStack')}</h2>
                <ul className={styles.techList}>
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </section>

              {(() => {
                const hasVideos = project.videos && project.videos.length > 0;
                const galleryImages = project.images.slice(1);
                const desktopImages = galleryImages.filter(img => !img.includes('-mobile'));
                const mobileImages = galleryImages.filter(img => img.includes('-mobile'));
                const hasGalleryContent = hasVideos || galleryImages.length > 0;

                if (!hasGalleryContent) return null;

                return (
                  <section className={styles.gallery}>
                    <h2 className="mono">{t('gallery')}</h2>
                    <div className={styles.galleryGrid}>
                      {hasVideos && project.videos!.map((video) => (
                        <div key={video} className={styles.galleryBrowser}>
                          <div className={styles.browserHeader}>
                            <div className={styles.browserDots} aria-hidden="true">
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                            <div className={styles.browserUrl}>{project.url}</div>
                          </div>
                          <div className={styles.videoContainer}>
                            <video
                              src={video}
                              autoPlay
                              loop
                              muted
                              playsInline
                              aria-label={t('videoAlt', { name: project.name })}
                            />
                          </div>
                        </div>
                      ))}
                      {desktopImages.map((image, index) => (
                        <div key={image} className={styles.galleryBrowser}>
                          <div className={styles.browserHeader}>
                            <div className={styles.browserDots} aria-hidden="true">
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                            <div className={styles.browserUrl}>{project.url}</div>
                          </div>
                          <div className={styles.galleryItem}>
                            <Image
                              src={image}
                              alt={t('screenshotAlt', { name: project.name, number: index + 2 })}
                              fill
                              sizes="(max-width: 768px) 100vw, 600px"
                              style={{ objectFit: 'cover', objectPosition: 'top' }}
                            />
                          </div>
                        </div>
                      ))}
                      {mobileImages.length > 0 && (
                        <div className={styles.galleryRow}>
                          {mobileImages.map((item, index) => {
                            const isVideo = item.endsWith('.mp4');
                            return (
                              <div key={item} className={styles.mobileBrowser}>
                                <div className={styles.mobileHeader}>
                                  <div className={styles.browserDots} aria-hidden="true">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                  </div>
                                </div>
                                <div className={styles.mobileScreen}>
                                  {isVideo ? (
                                    <video
                                      src={item}
                                      autoPlay
                                      loop
                                      muted
                                      playsInline
                                      aria-label={t('videoAlt', { name: project.name })}
                                    />
                                  ) : (
                                    <Image
                                      src={item}
                                      alt={t('mobileScreenshotAlt', { name: project.name, number: index + 1 })}
                                      fill
                                      sizes="180px"
                                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                                    />
                                  )}
                                </div>
                                <div className={styles.mobileFooter}>
                                  <div className={styles.browserUrl}>{project.url}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </section>
                );
              })()}

            </article>
          </div>
        </main>

        <footer className={styles.footer}>
          <div className="container">
            <FooterTime />
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}
