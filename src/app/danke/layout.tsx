import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vielen Dank - Schärfauftrag erhalten | Schärfservice Hartmann",
  description: "Vielen Dank für Ihren Schärfauftrag. Wir haben Ihre Anfrage erhalten und werden uns in Kürze bei Ihnen melden.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DankeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

