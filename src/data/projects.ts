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

export const projects: Project[] = [
  {
    slug: 'baudie',
    name: 'Baudie',
    url: 'https://baudie.com',
    description: 'Pre-deodorant enhancer brand',
    longDescription:
      'E-commerce site for Baudie, a pre-deodorant spray powered by odor-eliminating bacterial technology. The site educates customers on the science while driving conversions.',
    role: 'Built the entire Shopify theme from scratch. Created a bespoke hero section with rotating product cards, quick view functionality, and made every block customizable from the theme editor.',
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
    description: 'Private island retreat',
    longDescription:
      'A website for a private island retreat featuring a custom booking system and interactive maps. Multiple page layouts accommodate different content types like excursions, events, and restaurants.',
    role: 'Built the full WordPress site from scratch. Developed a custom booking system using WP plugins, created an interactive pin map with tooltips and full editor control, and designed flexible layouts for each content type.',
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
    description: 'Wellness and lifestyle brand',
    longDescription:
      'A wellness brand site that blends editorial content with e-commerce. Built on the Haven theme but heavily rebuilt with mostly custom sections to match their design vision.',
    role: 'Rebuilt the homepage, about us, science, blog, and product pages with custom sections. Created unique product page layouts, integrated editorial content, and built a custom navigation system.',
    tech: ['Shopify', 'Liquid', 'JavaScript', 'CSS'],
    images: ['/projects/walkfully/1.png'],
  },
  {
    slug: 'satqoe',
    name: 'Global Satellite Solutions',
    url: 'https://satqoe.com',
    description: 'Satellite communications company',
    longDescription:
      'A corporate website for a satellite communications company, featuring custom SVG animations throughout the site that bring the technical content to life.',
    role: 'Built the custom WordPress theme and created all the SVG animations from scratch, adding visual interest and helping explain complex technical concepts.',
    tech: ['WordPress', 'PHP', 'JavaScript', 'CSS', 'SVG Animation'],
    images: ['/projects/satqoe/1.png'],
  },
  {
    slug: 'tashola',
    name: 'Tashola',
    url: 'https://tashola.com',
    description: 'Jewelry e-commerce store',
    longDescription:
      'A luxury jewelry e-commerce store built entirely from scratch on Shopify. The site features smooth animations, a custom product filtering system, and a bespoke cart and checkout experience.',
    role: 'Built the full Shopify theme from Figma designs. Developed custom product filtering, scroll animations and hover interactions, and a tailored cart drawer with upsells.',
    tech: ['Shopify', 'Liquid', 'JavaScript', 'CSS'],
    images: ['/projects/tashola/1.png', '/projects/tashola/2.png', '/projects/tashola/3-mobile.png'],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
