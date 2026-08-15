import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  async redirects() {
    return [
      {
        source: "/schaerfkurse",
        destination: "/schaerfkurs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
