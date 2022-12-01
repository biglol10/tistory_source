/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  ...nextConfig,
  basePath: process.env.NODE_ENV === "development" ? "/develop" : "/production",
  async redirects() {
    return [
      {
        source: "/",
        destination: `/${
          process.env.NODE_ENV === "development" ? "develop" : "production"
        }`,
        basePath: false,
        permanent: false,
      },
    ];
  },
};
