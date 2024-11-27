/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 静的エクスポートを有効にする
  experimental: {
    esmExternals: 'loose'
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }]; // required to make pdfjs work
    return config;
  },
};

module.exports = nextConfig;
