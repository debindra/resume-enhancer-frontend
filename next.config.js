/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Enable standalone output for Docker
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';

    return [
      // Rewrite API routes to FastAPI, but exclude dashboard and billing
      // which are handled by Next.js API routes
      // Note: /api/v1/analyzer routes are also handled by Next.js API routes
      {
        source: '/api/:path((?!dashboard|billing).*)',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

