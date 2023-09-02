require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Netlify Preview Test`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [{
    resolve: 'gatsby-source-sanity',
    options: {
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET,
      token: process.env.SANITY_TOKEN,
      overlayDrafts: true,
    }
  }, {
    resolve: 'gatsby-plugin-netlify',
    options: {
      allPageHeaders: [
        'X-XSS-Protection: 1; mode=block',
        'X-Content-Type-Options: nosniff',
        'Referrer-Policy: same-origin',
        `Content-Security-Policy: frame-ancestors 'self' http://localhost`,
        'X-Frame-Options': 'ALLOW',
      ],
    },
  }, 'gatsby-plugin-image', 'gatsby-plugin-sharp', 'gatsby-transformer-sharp']
};
