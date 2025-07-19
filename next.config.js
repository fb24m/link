/** @type {import('next').NextConfig} */
export default {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.fb24m.ru',
        pathname: '/**/*',
      },
      {
        protocol: 'https',
        hostname: '*.gravatar.com',
        pathname: '/**/*',
      },
    ],
  },
  sassOptions: {
    api: 'modern-compiler',
  },
}

