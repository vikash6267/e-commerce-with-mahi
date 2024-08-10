const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

// Load environment variables
const baseUrl = "https://demo.mahitechnocrafts.in/api/v1";
const productEndpoint = '/product/all-product';

async function fetchProducts() {
  try {
    const response = await axios.get(`${baseUrl}${productEndpoint}`);
    return response?.data?.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function generateSitemap() {
  const products = await fetchProducts();
  const sitemapStream = new SitemapStream({ hostname: 'https://wearabsence.com' });

  // Create an array of URLs for the sitemap
  const productUrls = products.map(product => ({
    url: `/product/${product.slug}`,
    lastmod: new Date(product.updatedAt).toISOString(),
    changefreq: 'daily',
    priority: 0.8,
    images: product.images.map(image => ({
      url: image.url,
      title: product.title,
      caption: product.description
    }))
  }));

  // Generate the sitemap XML
  const xmlStream = Readable.from(productUrls).pipe(sitemapStream);

  try {
    const data = await streamToPromise(xmlStream);
    fs.writeFileSync(path.join(__dirname, 'public', 'sitemap_products.xml'), data.toString());
    console.log('Sitemap generated successfully.');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();
