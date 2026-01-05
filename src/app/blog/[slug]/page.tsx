import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { blogPosts } from "@/lib/blogPosts";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find(p => p.id === slug);
  if (!post) return { title: "Artikel nicht gefunden" };

  const url = `https://www.dentalschleifen.de/blog/${post.id}`;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      images: [{ url: `https://www.dentalschleifen.de${post.imageUrl}`, width: 1200, height: 630, alt: post.imageAlt }],
      type: "article",
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.id === slug);
  if (!post) {
    return (
      <Container className="py-16">
        <h1 className="text-2xl font-semibold mb-4">Artikel nicht gefunden</h1>
        <Link href="/" className="text-blue-600 hover:underline">Zurück zur Startseite</Link>
      </Container>
    );
  }

  // Spezielle Bildposition nur für "reinigung-dentalinstrumente"
  const imageClassName = post.id === "reinigung-dentalinstrumente" 
    ? "object-cover object-[center_20%]" 
    : "object-cover";

  return (
    <article className="pb-12 -mt-8">
      {/* Hero Bild mit Titel-Overlay - startet direkt am Ende des Headers */}
      <div className="relative w-full h-[50vh] min-h-[360px] max-h-[640px] mt-[96px]">
        <Image src={post.imageUrl} alt={post.imageAlt} fill className={imageClassName} priority />
        {/* Gradient für bessere Lesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* Titel unten links - mit Container-Breite */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container-page pb-6 sm:pb-10">
            <div className="text-white/80 text-sm sm:text-base mb-2">{post.date}</div>
            <h1 className="text-white text-2xl sm:text-4xl font-semibold leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <Container>
        <div className="mt-10">
          <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{post.fullText}</p>
        </div>

        <div className="mt-10">
          <Link href="/" className="text-blue-600 hover:text-blue-700 hover:underline">← Zurück zur Startseite</Link>
        </div>
      </Container>
    </article>
  );
}


