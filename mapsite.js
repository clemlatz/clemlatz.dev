const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs').promises;
const experiences = require('./src/data/experiences.json');

// Creates a sitemap object given the input configuration with URLs
const sitemap = new SitemapStream({ hostname: 'https://iwazaru.dev' });

const locales = ['en', 'fr'];

locales.forEach(locale => {
  // Home page
  sitemap.write({
    url: `/${locale}/`,
    priority: 1,
    lastmodfile: './src/components/Home/Home.js',
  });

  // Career page
  sitemap.write({
    url: `/${locale}/career`,
    priority: 0.9,
    lastmodfile: './src/data/experiences.json',
  });

  // Individual experiences sub-page
  experiences.forEach(({ slug }) => {
    sitemap.write({
      url: `/${locale}/career/${slug}`,
      priority: 0.8,
      lastmodfile: './src/data/experiences.json',
    });
  });

  // Links page
  sitemap.write({
    url: `/${locale}/links`,
    priority: 0.9,
    lastmodfile: './src/components/Links/Links.js',
  });
});

sitemap.end();

streamToPromise(sitemap)
  .then(sitemap => {
    return fs.writeFile('./build/sitemap.xml', sitemap.toString());
  })
  .then(() => console.log('Sitemap saved to ./build/sitemap.xml'))
  .catch(console.error);
