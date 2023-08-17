/** @type {import('next').NextConfig} */

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
};

module.exports = nextConfig;
