import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/register",
        destination: "https://unstop.com/p/devhack-2026-devhost-2026-sahyadri-open-source-community-1759829",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
