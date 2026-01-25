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

        {(post.downloadImages && post.downloadImages.length > 0) || (post.previewImages && post.previewImages.length > 0) ? (
          <div className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Schärfplatten</h2>
            
            {/* Bildvorschau nebeneinander */}
            <div className="space-y-4 mb-4">
              {/* Download-Bilder groß nebeneinander */}
              {post.downloadImages && post.downloadImages.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {post.downloadImages.map((imageItem, imgIndex) => {
                    const imageUrl = typeof imageItem === 'string' ? imageItem : imageItem.url;
                    const imageName = typeof imageItem === 'string' ? imageItem.split('/').pop() || `Bild ${imgIndex + 1}` : imageItem.name;
                    return (
                      <div key={imgIndex} className="relative group">
                        <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                          <Image
                            src={imageUrl}
                            alt={`${post.title} - ${imageName}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              
              {/* Preview-Bilder kleiner (ohne Download) */}
              {post.previewImages && post.previewImages.length > 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {post.previewImages.map((imageUrl, imgIndex) => {
                      const imageName = imageUrl.split('/').pop() || `Bild ${imgIndex + 1}`;
                      return (
                        <div key={imgIndex} className="relative group">
                          <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                            <Image
                              src={imageUrl}
                              alt={`${post.title} - ${imageName}`}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Info über Pflegeprodukte */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <p className="text-gray-700 text-sm">
                      Diese Pflegeprodukte sind bei uns erhältlich.{" "}
                      <Link href="/kontakt" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                        Kontaktieren Sie uns für weitere Informationen
                      </Link>
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Download-Links darunter (nur für downloadImages) */}
            {post.downloadImages && post.downloadImages.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {post.downloadImages.map((imageItem, imgIndex) => {
                  const imageUrl = typeof imageItem === 'string' ? imageItem : imageItem.url;
                  const imageName = typeof imageItem === 'string' ? imageItem.split('/').pop() || `Bild ${imgIndex + 1}` : imageItem.name;
                  const fileName = typeof imageItem === 'string' ? imageItem.split('/').pop() || `Bild ${imgIndex + 1}` : imageItem.url.split('/').pop() || imageItem.name;
                  return (
                    <a
                      key={imgIndex}
                      href={imageUrl}
                      download={fileName}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="font-medium">{imageName}</span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        ) : null}

        <div className="mt-10">
          <Link href="/" className="text-blue-600 hover:text-blue-700 hover:underline">← Zurück zur Startseite</Link>
        </div>
      </Container>
    </article>
  );
}


