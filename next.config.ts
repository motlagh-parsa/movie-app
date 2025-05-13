/** @type {import('next').NextConfig} */
const nextConfig: { images: { domains: string[] } } = {
    images: {
        domains: ['image.tmdb.org'],
    },
};

module.exports = nextConfig;
