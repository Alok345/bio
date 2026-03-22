import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jjw4ayukjlg0hfp4.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
