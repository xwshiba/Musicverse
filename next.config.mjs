/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Outputs a Single-Page Application (SPA).
    distDir: './dist', // Changes the build output directory to `./dist/`.
    images: { unoptimized: true }, // Disables image optimization as image API is not available in export mode.
}

export default nextConfig