/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',   // Static export – generates /out directory for Cloudflare Pages
  trailingSlash: true, // Required for Cloudflare Pages static routing
  images: {
    unoptimized: true, // next/image doesn't work with static export without this
  },
};

export default nextConfig;
