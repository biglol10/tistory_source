/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const prodEnv = process.env.NODE_ENV === "production";

module.exports = {
  ...nextConfig,
  basePath: prodEnv ? "/production" : "/dev",
  async redirects() {
    return [
      {
        source: "/",
        destination: `/${prodEnv ? "production" : "dev"}`,
        basePath: false,
        permanent: false,
      },
      {
        source: `/${prodEnv ? "production" : "dev"}/:a([A-Za-z1-9]{3})`,
        destination: `/${prodEnv ? "production" : "dev"}/redirect`,
        basePath: false,
        permanent: false,
      },
    ];
  },
};
