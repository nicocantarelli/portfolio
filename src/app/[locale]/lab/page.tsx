import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/config';
import { Mascot } from '@/components/Mascot';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { PageTransition } from '@/components/PageTransition';
import { FooterTime } from '@/components/FooterTime';
import { LabNav } from '@/components/lab/LabNav';
import { DemoSection } from '@/components/lab/DemoSection';
import { ButtonEffects } from '@/components/lab/ButtonEffects/ButtonEffects';
import { TextRevealScroll } from '@/components/lab/TextRevealScroll/TextRevealScroll';
import { ProductCard } from '@/components/lab/ProductCard/ProductCard';
import { ScrollProductReveal } from '@/components/lab/ScrollProductReveal/ScrollProductReveal';
import { AddToCartAnimation } from '@/components/lab/AddToCartAnimation/AddToCartAnimation';
import { PageTransitionsDemo } from '@/components/lab/PageTransitionsDemo/PageTransitionsDemo';
import { DrawerDemo } from '@/components/lab/DrawerDemo/DrawerDemo';
import { CSSMicroInteractions } from '@/components/lab/CSSMicroInteractions/CSSMicroInteractions';
import { ScrollToTop } from '@/components/lab/ScrollToTop';
import styles from './page.module.css';

type Props = {
  params: Promise<{ locale: string }>;
};

const siteUrl = 'https://nicocantarelli.com';

const ogLocaleMap: Record<string, string> = { en: 'en_US', es: 'es_AR', it: 'it_IT' };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'lab' });

  const languages: Record<string, string> = {};
  locales.forEach((l) => {
    languages[l] = `${siteUrl}/${l}/lab`;
  });
  languages['x-default'] = `${siteUrl}/en/lab`;

  return {
    title: `${t('title')} — Nico Cantarelli`,
    description: t('description'),
    alternates: {
      canonical: `${siteUrl}/${locale}/lab`,
      languages,
    },
    openGraph: {
      title: `${t('title')} — Nico Cantarelli`,
      description: t('description'),
      url: `${siteUrl}/${locale}/lab`,
      locale: ogLocaleMap[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocaleMap[l]),
    },
  };
}

export default async function Lab({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LabContent />;
}

function LabContent() {
  const t = useTranslations('lab');
  const tProject = useTranslations('project');

  const sections = [
    { id: 'micro-interactions', label: t('navigation.microInteractions') },
    { id: 'button-effects', label: t('navigation.buttonEffects') },
    { id: 'text-reveal', label: t('navigation.textReveal') },
    { id: 'product-card', label: t('navigation.productCard') },
    { id: 'scroll-reveal', label: t('navigation.scrollReveal') },
    { id: 'add-to-cart', label: t('navigation.addToCart') },
    { id: 'page-transitions', label: t('navigation.pageTransitions') },
    { id: 'drawers', label: t('navigation.drawers') },
  ];

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

        <div className={styles.layout}>
          <LabNav sections={sections} />

          <main id="main" className={styles.content}>
            <div className={styles.intro}>
              <Link href="/" className={styles.backLink}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.5 4L1.5 8M1.5 8L5.5 12M1.5 8H10C11.3807 8 12.5 6.88071 12.5 5.5V5.5C12.5 4.11929 11.3807 3 10 3H8.5" stroke="currentColor" />
                </svg>
                {tProject('backToHome')}
              </Link>
              <h1>{t('title')}</h1>
              <p>{t('description')}</p>
            </div>

            <DemoSection
              id="micro-interactions"
              title={t('demos.microInteractions.title')}
              description={t('demos.microInteractions.description')}
            >
              <CSSMicroInteractions />
            </DemoSection>

            <DemoSection
              id="button-effects"
              title={t('demos.buttonEffects.title')}
              description={t('demos.buttonEffects.description')}
            >
              <ButtonEffects />
            </DemoSection>

            <DemoSection
              id="text-reveal"
              title={t('demos.textReveal.title')}
              description={t('demos.textReveal.description')}
            >
              <TextRevealScroll />
            </DemoSection>

            <DemoSection
              id="product-card"
              title={t('demos.productCard.title')}
              description={t('demos.productCard.description')}
            >
              <ProductCard />
            </DemoSection>

            <DemoSection
              id="scroll-reveal"
              title={t('demos.scrollReveal.title')}
              description={t('demos.scrollReveal.description')}
            >
              <ScrollProductReveal />
            </DemoSection>

            <DemoSection
              id="add-to-cart"
              title={t('demos.addToCart.title')}
              description={t('demos.addToCart.description')}
            >
              <AddToCartAnimation />
            </DemoSection>

            <DemoSection
              id="page-transitions"
              title={t('demos.pageTransitions.title')}
              description={t('demos.pageTransitions.description')}
            >
              <PageTransitionsDemo />
            </DemoSection>

            <DemoSection
              id="drawers"
              title={t('demos.drawers.title')}
              description={t('demos.drawers.description')}
            >
              <DrawerDemo />
            </DemoSection>

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
