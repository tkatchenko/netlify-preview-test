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
  }, "gatsby-plugin-netlify", "gatsby-plugin-image", "gatsby-plugin-sharp", "gatsby-transformer-sharp"]
};
