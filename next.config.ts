import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "", // Leave blank unless you're using a custom port
        pathname: "/**", // Match all paths
      },
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
        port: "", // Leave blank unless you're using a custom port
        pathname: "/**", // Match all paths
      },
    ],
  },
};

export default nextConfig;
