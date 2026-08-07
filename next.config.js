/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true, // Ignore toutes les erreurs TypeScript
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint
  },
}

module.exports = nextConfig
