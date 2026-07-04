/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.stripe.com",
        pathname: "/links/**",
      },
    ],
  },
};

module.exports = nextConfig;
