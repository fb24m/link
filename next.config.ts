import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.fb24m.ru', pathname: '/**/*' },
      { protocol: 'https', hostname: '*.gravatar.com', pathname: '/**/*' },
    ],
  },
  // sassOptions: { api: 'modern-compiler' },
}

export default nextConfig
