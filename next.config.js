/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "is3.cloudhost.id",
        port: "",
        pathname: "/bagusok/**",
      },
    ],
  },
};

module.exports = nextConfig;
