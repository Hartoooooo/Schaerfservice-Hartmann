import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  async headers() {
    // Basis-Sicherheitsheader für alle Seiten (bewusst ohne CSP, damit Analytics/Clarity laufen)
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
        ],
      },
    ];
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
