import { MetadataRoute } from 'next';
import { getAllProjectSlugs } from '@/data/projects';
import { locales, defaultLocale } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nicocantarelli.com';

  function getUrl(path: string, locale: string) {
    return `${baseUrl}/${locale}${path}`;
  }

  function getAlternates(path: string) {
    const languages: Record<string, string> = {};
    locales.forEach((locale) => {
      languages[locale] = getUrl(path, locale);
    });
    languages['x-default'] = `${baseUrl}/en${path}`;
    return { languages };
  }

  const homePages = locales.map((locale) => ({
    url: getUrl('', locale),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: locale === defaultLocale ? 1 : 0.9,
    alternates: getAlternates(''),
  }));

  const projectSlugs = getAllProjectSlugs();
  const projectPages = locales.flatMap((locale) =>
    projectSlugs.map((slug) => ({
      url: getUrl(`/projects/${slug}`, locale),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: locale === defaultLocale ? 0.8 : 0.7,
      alternates: getAlternates(`/projects/${slug}`),
    }))
  );

  const labPages = locales.map((locale) => ({
    url: getUrl('/lab', locale),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: locale === defaultLocale ? 0.8 : 0.7,
    alternates: getAlternates('/lab'),
  }));

  return [...homePages, ...labPages, ...projectPages];
}
