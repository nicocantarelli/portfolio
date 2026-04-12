import localFont from 'next/font/local';

export const satoshi = localFont({
  src: [
    { path: './Satoshi-Regular.woff2', weight: '400', style: 'normal' },
    { path: './Satoshi-Medium.woff2', weight: '500', style: 'normal' },
    { path: './Satoshi-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
});

export const cascadiaCode = localFont({
  src: [
    { path: './CascadiaCode-Regular.woff2', weight: '400', style: 'normal' },
    { path: './CascadiaCode-SemiBold.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
});
