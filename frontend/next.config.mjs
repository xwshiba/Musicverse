/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: './dist', // Changes the build output directory to `./dist/`.
    images: { unoptimized: true }, // Disables image optimization as image API is not available in export mode.
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:4000/api/:path*' // Proxy to Backend
            }
        ];
    }
}

export default nextConfig;
