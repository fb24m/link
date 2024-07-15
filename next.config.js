/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.fb24m.ru',
				pathname: '/**/*'
			},
			{
				protocol: 'https',
				hostname: '*.gravatar.com',
				pathname: '/**/*'
			}
		]
	}
}

module.exports = nextConfig
