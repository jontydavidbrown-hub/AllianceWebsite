/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // stop Next from proxying/optimizing remote images
  },
};

module.exports = nextConfig;
