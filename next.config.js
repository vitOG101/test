/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_HOST: process.env.API_HOST,
        LOCAL_HOST: process.env.LOCAL_HOST,
    },
}

module.exports = nextConfig
