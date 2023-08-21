/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'ipfs.loopring.io',
      'fruit.saladexchange.com',
      'ipfs.io',
      'gateway.pinata.cloud',
      'd2y691019xyzhi.cloudfront.net',
      'static.gstop-content.com',
      'cdn.loopexchange.art',
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Modify the Babel loader rules for specific modules
    config.module.rules.push({
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      include: [
        // Include the paths you want to add to babelLoader rules
        path.resolve(__dirname, '../../node_modules/@walletconnect'),
        path.resolve(__dirname, '../../node_modules/@web3modal'),
        // You can add more paths here if needed
      ],
      // Add any other necessary configuration options
    });

    // You can modify other parts of the webpack configuration here if needed

    return config;
  },
};

module.exports = nextConfig;
