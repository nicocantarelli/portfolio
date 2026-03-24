'use client';

import { useEffect } from 'react';

type Props = {
  locale: string;
};

export function SetHtmlLang({ locale }: Props) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
