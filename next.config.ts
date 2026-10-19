import type { NextConfig } from "next";

const renamedImages: Record<string, string> = {
  "/schleifen%20bild.JPG": "/kuerette-schleifplatte-handschliff-schaerfservice-hartmann.jpg",
  "/schleifenblau.png": "/scaler-schleifplatte-handschliff-schaerfservice-hartmann.jpg",
  "/3%20spitzen.JPG": "/dentalinstrumente-geschaerft-schaerfservice-hartmann.jpg",
  "/schaerfservice-werkstatt-berlin.jpg": "/kueretten-scaler-geschaerft-schaerfservice-hartmann.jpg",
  "/dental-schere-schaerfwinkel-berlin.jpg": "/dentale-chirurgische-schere-schaerfen-schaerfservice-hartmann.jpg",
  "/dentalinstrumente-kassette-schaerfung.jpg": "/dentalinstrumente-sterilkassette-schaerfservice-hartmann.jpg",
  "/schaerfkursbild.png": "/schaerfkurs-zahnarztpraxis-schaerfservice-hartmann.jpg",
  "/20260115_101012.jpg": "/instrumentenpflege-produkte-schaerfservice-hartmann.jpg",
  "/Scalerplatte.jpeg": "/schleifschablone-scaler-schaerfservice-hartmann.jpg",
  "/Kuerettenplatte.jpeg": "/schleifschablone-kueretten-schaerfservice-hartmann.jpg",
  "/scaler.webp": "/scaler-schaerfen-lassen-schaerfservice-hartmann.webp",
  "/kueretten.webp": "/kueretten-schaerfen-lassen-schaerfservice-hartmann.webp",
};

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
      // Umbenannte Bilder (alte Dateinamen sind bei Google indexiert)
      ...Object.entries(renamedImages).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
