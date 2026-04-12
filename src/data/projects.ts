import { type Locale } from '@/i18n/config';

export type Project = {
  slug: string;
  name: string;
  url: string;
  description: string;
  longDescription: string;
  role: string;
  tech: string[];
  images: string[];
  videos?: string[];
};

type ProjectTranslation = {
  description: string;
  longDescription: string;
  role: string;
};

const projectTranslations: Record<Locale, Record<string, ProjectTranslation>> = {
  en: {
    baudie: {
      description: 'Pre-deodorant enhancer brand',
      longDescription: 'E-commerce site for Baudie, a pre-deodorant spray powered by odor-eliminating bacterial technology. The site educates customers on the science while driving conversions.',
      role: 'Built the entire Shopify theme from scratch. Created a bespoke hero section with rotating product cards, quick view functionality, and made every block customizable from the theme editor.',
    },
    'nirup-island': {
      description: 'Private island retreat',
      longDescription: 'A website for a private island retreat featuring a custom booking system and interactive maps. Multiple page layouts accommodate different content types like excursions, events, and restaurants.',
      role: 'Built the full WordPress site from scratch. Developed a custom booking system using WP plugins, created an interactive pin map with tooltips and full editor control, and designed flexible layouts for each content type.',
    },
    walkfully: {
      description: 'Wellness and lifestyle brand',
      longDescription: 'A wellness brand site that blends editorial content with e-commerce. Built on the Haven theme but heavily rebuilt with mostly custom sections to match their design vision.',
      role: 'Rebuilt the homepage, about us, science, blog, and product pages with custom sections. Created unique product page layouts, integrated editorial content, and built a custom navigation system.',
    },
    satqoe: {
      description: 'Satellite communications company',
      longDescription: 'A corporate website for a satellite communications company, featuring custom SVG animations throughout the site that bring the technical content to life.',
      role: 'Built the custom WordPress theme and created all the SVG animations from scratch, adding visual interest and helping explain complex technical concepts.',
    },
    tashola: {
      description: 'Jewelry e-commerce store',
      longDescription: 'A luxury jewelry e-commerce store built entirely from scratch on Shopify. The site features smooth animations, a custom product filtering system, and a bespoke cart and checkout experience.',
      role: 'Built the full Shopify theme from Figma designs. Developed custom product filtering, scroll animations and hover interactions, and a tailored cart drawer with upsells.',
    },
  },
  es: {
    baudie: {
      description: 'Marca de potenciador pre-desodorante',
      longDescription: 'Sitio de e-commerce para Baudie, un spray pre-desodorante con tecnología bacteriana que elimina olores. El sitio educa a los clientes sobre la ciencia mientras impulsa las conversiones.',
      role: 'Construí el tema completo de Shopify desde cero. Creé una sección hero personalizada con tarjetas de productos rotativas, funcionalidad de vista rápida, y cada bloque es personalizable desde el editor del tema.',
    },
    'nirup-island': {
      description: 'Resort en isla privada',
      longDescription: 'Un sitio web para un resort en isla privada con sistema de reservas personalizado y mapas interactivos. Múltiples diseños de página acomodan diferentes tipos de contenido como excursiones, eventos y restaurantes.',
      role: 'Construí el sitio completo en WordPress desde cero. Desarrollé un sistema de reservas personalizado usando plugins de WP, creé un mapa interactivo con pins y tooltips con control total desde el editor, y diseñé layouts flexibles para cada tipo de contenido.',
    },
    walkfully: {
      description: 'Marca de bienestar y estilo de vida',
      longDescription: 'Un sitio de marca de bienestar que combina contenido editorial con e-commerce. Construido sobre el tema Haven pero reconstruido ampliamente con secciones personalizadas para coincidir con su visión de diseño.',
      role: 'Reconstruí la página de inicio, sobre nosotros, ciencia, blog y páginas de producto con secciones personalizadas. Creé layouts únicos para páginas de producto, integré contenido editorial y construí un sistema de navegación personalizado.',
    },
    satqoe: {
      description: 'Empresa de comunicaciones satelitales',
      longDescription: 'Un sitio web corporativo para una empresa de comunicaciones satelitales, con animaciones SVG personalizadas en todo el sitio que dan vida al contenido técnico.',
      role: 'Construí el tema personalizado de WordPress y creé todas las animaciones SVG desde cero, agregando interés visual y ayudando a explicar conceptos técnicos complejos.',
    },
    tashola: {
      description: 'Tienda de joyería online',
      longDescription: 'Una tienda de joyería de lujo construida completamente desde cero en Shopify. El sitio presenta animaciones suaves, un sistema de filtrado de productos personalizado y una experiencia de carrito y checkout a medida.',
      role: 'Construí el tema completo de Shopify desde diseños de Figma. Desarrollé filtrado de productos personalizado, animaciones de scroll e interacciones hover, y un carrito lateral con ventas adicionales.',
    },
  },
  it: {
    baudie: {
      description: 'Brand di potenziatore pre-deodorante',
      longDescription: 'Sito e-commerce per Baudie, uno spray pre-deodorante con tecnologia batterica che elimina gli odori. Il sito educa i clienti sulla scienza mentre guida le conversioni.',
      role: 'Ho costruito l\'intero tema Shopify da zero. Ho creato una sezione hero personalizzata con schede prodotto rotanti, funzionalità di visualizzazione rapida, e ogni blocco è personalizzabile dall\'editor del tema.',
    },
    'nirup-island': {
      description: 'Resort su isola privata',
      longDescription: 'Un sito web per un resort su isola privata con sistema di prenotazione personalizzato e mappe interattive. Layout multipli della pagina ospitano diversi tipi di contenuto come escursioni, eventi e ristoranti.',
      role: 'Ho costruito l\'intero sito WordPress da zero. Ho sviluppato un sistema di prenotazione personalizzato usando plugin WP, creato una mappa interattiva con pin e tooltip con controllo completo dall\'editor, e progettato layout flessibili per ogni tipo di contenuto.',
    },
    walkfully: {
      description: 'Brand di benessere e lifestyle',
      longDescription: 'Un sito di brand di benessere che unisce contenuti editoriali con l\'e-commerce. Costruito sul tema Haven ma ampiamente ricostruito con sezioni personalizzate per corrispondere alla loro visione di design.',
      role: 'Ho ricostruito la homepage, chi siamo, scienza, blog e pagine prodotto con sezioni personalizzate. Ho creato layout unici per le pagine prodotto, integrato contenuti editoriali e costruito un sistema di navigazione personalizzato.',
    },
    satqoe: {
      description: 'Azienda di comunicazioni satellitari',
      longDescription: 'Un sito web aziendale per una compagnia di comunicazioni satellitari, con animazioni SVG personalizzate in tutto il sito che danno vita ai contenuti tecnici.',
      role: 'Ho costruito il tema WordPress personalizzato e creato tutte le animazioni SVG da zero, aggiungendo interesse visivo e aiutando a spiegare concetti tecnici complessi.',
    },
    tashola: {
      description: 'Negozio di gioielli online',
      longDescription: 'Un negozio di gioielli di lusso costruito interamente da zero su Shopify. Il sito presenta animazioni fluide, un sistema di filtraggio prodotti personalizzato e un\'esperienza di carrello e checkout su misura.',
      role: 'Ho costruito l\'intero tema Shopify dai design Figma. Ho sviluppato il filtraggio prodotti personalizzato, animazioni scroll e interazioni hover, e un carrello laterale con upsell.',
    },
  },
};

export const projects: Project[] = [
  {
    slug: 'baudie',
    name: 'Baudie',
    url: 'https://baudie.com',
    description: projectTranslations.en.baudie.description,
    longDescription: projectTranslations.en.baudie.longDescription,
    role: projectTranslations.en.baudie.role,
    tech: ['Shopify', 'Liquid', 'JavaScript', 'CSS'],
    images: [
      '/projects/baudie/1.png',
      '/projects/baudie/2.png',
      '/projects/baudie/1-mobile.png',
      '/projects/baudie/2-mobile.png',
      '/projects/baudie/3-mobile.mp4',
    ],
    videos: ['/projects/baudie/hero.mp4', '/projects/baudie/bundle.mp4'],
  },
  {
    slug: 'nirup-island',
    name: 'Nirup Island',
    url: 'https://nirupisland.com',
    description: projectTranslations.en['nirup-island'].description,
    longDescription: projectTranslations.en['nirup-island'].longDescription,
    role: projectTranslations.en['nirup-island'].role,
    tech: ['WordPress', 'PHP', 'JavaScript', 'CSS'],
    images: [
      '/projects/nirup-island/1.png',
      '/projects/nirup-island/2.png',
      '/projects/nirup-island/3.png',
      '/projects/nirup-island/1-mobile.png',
      '/projects/nirup-island/2-mobile.png',
      '/projects/nirup-island/3-mobile.png',
    ],
  },
  {
    slug: 'walkfully',
    name: 'Walkfully',
    url: 'https://walkfully.com',
    description: projectTranslations.en.walkfully.description,
    longDescription: projectTranslations.en.walkfully.longDescription,
    role: projectTranslations.en.walkfully.role,
    tech: ['Shopify', 'Liquid', 'JavaScript', 'CSS'],
    images: ['/projects/walkfully/1.png'],
  },
  {
    slug: 'satqoe',
    name: 'Global Satellite Solutions',
    url: 'https://satqoe.com',
    description: projectTranslations.en.satqoe.description,
    longDescription: projectTranslations.en.satqoe.longDescription,
    role: projectTranslations.en.satqoe.role,
    tech: ['WordPress', 'PHP', 'JavaScript', 'CSS', 'SVG Animation'],
    images: ['/projects/satqoe/1.png'],
  },
  {
    slug: 'tashola',
    name: 'Tashola',
    url: 'https://tashola.com',
    description: projectTranslations.en.tashola.description,
    longDescription: projectTranslations.en.tashola.longDescription,
    role: projectTranslations.en.tashola.role,
    tech: ['Shopify', 'Liquid', 'JavaScript', 'CSS'],
    images: ['/projects/tashola/1.png', '/projects/tashola/2.png', '/projects/tashola/3.png', '/projects/tashola/1-mobile.png', '/projects/tashola/2-mobile.png'],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getProjectTranslations(slug: string, locale: Locale): ProjectTranslation | undefined {
  return projectTranslations[locale]?.[slug];
}

export function getProjectDescription(slug: string, locale: Locale): string {
  const translation = projectTranslations[locale]?.[slug];
  if (translation) {
    return translation.description;
  }
  const project = getProjectBySlug(slug);
  return project?.description || '';
}
