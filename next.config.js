/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@prisma/client', 'pg', '@prisma/adapter-pg', 'pg-connection-string'],
}

module.exports = nextConfig
