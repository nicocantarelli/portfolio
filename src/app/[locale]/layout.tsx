import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { locales, type Locale } from '@/i18n/config';
import { satoshi, cascadiaCode } from '@/fonts';

const siteUrl = 'https://nicocantarelli.com';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return (
    <html lang={locale} className={`${satoshi.variable} ${cascadiaCode.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Nico Cantarelli',
              alternateName: 'Nicolas Cantarelli',
              url: siteUrl,
              jobTitle: 'Frontend Developer',
              description: t('description'),
              knowsAbout: ['Shopify', 'WordPress', 'React', 'Next.js', 'JavaScript', 'CSS', 'Web Development'],
              sameAs: [
                'https://x.com/bycantarelli',
                'https://github.com/nicocantarelli',
              ],
              inLanguage: locale,
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
