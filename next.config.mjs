/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'introvistawebplatform.appspot.com',
      },
      {
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
}

export default nextConfig
