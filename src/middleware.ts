import createMiddleware from 'next-intl/middleware';

const locales = ['en', 'es', 'it'] as const;
const defaultLocale = 'en';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  matcher: ['/', '/(en|es|it)/:path*'],
};
