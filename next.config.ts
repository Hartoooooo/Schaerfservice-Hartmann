import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  async redirects() {
    return [
      {
        source: "/scaler-schaerfen",
        destination: "/scaler-schleifen",
        permanent: true,
      },
      {
        source: "/kueretten-schaerfen",
        destination: "/kueretten-schleifen",
        permanent: true,
      },
      {
        source: "/chirurgische-instrumente-schaerfen",
        destination: "/chirurgische-instrumente-schleifen",
        permanent: true,
      },
      {
        source: "/schaerfkurse",
        destination: "/schaerfkurs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
