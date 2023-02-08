/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination:
          "https://port-0-flowtaskback-luj2cldvfo2xv.sel3.cloudtype.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
