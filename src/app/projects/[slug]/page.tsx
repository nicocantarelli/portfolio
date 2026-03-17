import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Mascot } from '@/components/Mascot';
import { ThemeToggle } from '@/components/ThemeToggle';
import { FooterTime } from '@/components/FooterTime';
import { PageTransition } from '@/components/PageTransition';
import { getProjectBySlug, getAllProjectSlugs } from '@/data/projects';
import styles from './page.module.css';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.name} - Nico Cantarelli`,
    description: project.longDescription,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <PageTransition>
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Mascot />
          <ThemeToggle />
        </div>
      </header>

      <main className={styles.main}>
        <div className="container">
          <div className={styles.navRow}>
            <Link href="/#work" className={styles.backLink}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 4L1.5 8M1.5 8L5.5 12M1.5 8H10C11.3807 8 12.5 6.88071 12.5 5.5V5.5C12.5 4.11929 11.3807 3 10 3H8.5" stroke="currentColor" />
              </svg>
              Back to home
            </Link>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.visitLink}
            >
              Visit site
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
                    <div className={styles.browserDots}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className={styles.browserUrl}>{project.url}</div>
                  </div>
                  <div className={styles.imageContainer}>
                    <Image
                      src={project.images[0]}
                      alt={`${project.name} website screenshot`}
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
              <p className={styles.tagline}>{project.description}</p>
            </header>

            <section className={styles.section}>
              <h2 className="mono">// About</h2>
              <p>{project.longDescription}</p>
            </section>

            <section className={styles.section}>
              <h2 className="mono">// What I did</h2>
              <p>{project.role}</p>
            </section>

            <section className={styles.section}>
              <h2 className="mono">// Tech stack</h2>
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
                  <h2 className="mono">// Gallery</h2>
                  <div className={styles.galleryGrid}>
                    {hasVideos && project.videos!.map((video) => (
                      <div key={video} className={styles.galleryBrowser}>
                        <div className={styles.browserHeader}>
                          <div className={styles.browserDots}>
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
                          />
                        </div>
                      </div>
                    ))}
                    {desktopImages.map((image, index) => (
                      <div key={image} className={styles.galleryBrowser}>
                        <div className={styles.browserHeader}>
                          <div className={styles.browserDots}>
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                          <div className={styles.browserUrl}>{project.url}</div>
                        </div>
                        <div className={styles.galleryItem}>
                          <Image
                            src={image}
                            alt={`${project.name} screenshot ${index + 2}`}
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
                                <div className={styles.browserDots}>
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
                                  />
                                ) : (
                                  <Image
                                    src={item}
                                    alt={`${project.name} mobile screenshot ${index + 1}`}
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
