/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: '.next', // Use `.next` for production builds on Vercel
    images: { unoptimized: true }, // Disables image optimization as image API is not available in export mode.
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.API_URL || 'http://localhost:4000/api/:path*' // Proxy to Backend
            }
        ];
    }
}

export default nextConfig;
