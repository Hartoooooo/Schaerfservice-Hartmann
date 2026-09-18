"use client";

import { Button } from "@/components/Button";
import { WhiteButton } from "@/components/WhiteButton";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { FAQ } from "@/components/FAQ";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { analytics } from "@/components/GoogleAnalytics";
import Image from "next/image";
import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { blogPosts as blogPostsData } from "@/lib/blogPosts";
import StackingCards, { ServiceCardData } from "@/components/ui/stacking-card";
import AiBadge from "@/components/ui/AiBadge";
import HowItWorks09 from "@/components/ui/how-it-works-09";

export default function HomeContent() {
  const [copiedArticleId, setCopiedArticleId] = useState<string | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [activeBlogIndex, setActiveBlogIndex] = useState(0);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const h3Ref = useRef<HTMLHeadingElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const blogCarouselRef = useRef<HTMLDivElement>(null);

  const blogPosts = useMemo(() => blogPostsData, []);

  const updateActiveBlog = () => {
    const carousel = blogCarouselRef.current;
    if (!carousel) return;

    const cards = Array.from(carousel.children) as HTMLElement[];
    const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2;
    const closestIndex = cards.reduce((closest, card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const closestCard = cards[closest];
      const closestCenter = closestCard.offsetLeft + closestCard.offsetWidth / 2;
      return Math.abs(cardCenter - carouselCenter) < Math.abs(closestCenter - carouselCenter)
        ? index
        : closest;
    }, 0);

    setActiveBlogIndex(closestIndex);
  };

  const scrollToBlog = (index: number) => {
    const carousel = blogCarouselRef.current;
    const card = carousel?.children[index] as HTMLElement | undefined;
    if (!carousel || !card) return;

    carousel.scrollTo({ left: card.offsetLeft - carousel.offsetLeft, behavior: "smooth" });
    setActiveBlogIndex(index);
  };

  const serviceCards = useMemo<ServiceCardData[]>(() => [
    {
      title: "Instrumente schärfen",
      description: (
        <>
          Professionelles <strong>Schärfen und Aufarbeiten</strong> <strong>aller dentalen und chirurgischen Instrumente</strong>. Höchste Qualität für optimale Behandlungsergebnisse durch präzise Handarbeit.
        </>
      ),
      imageUrl: "/schleifenblau.png",
      imageAlt: "Instrumente schärfen, professionelle Schärfung",
      badgeIcon: (
        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
        </svg>
      ),
      badgeText: "Herstellerunabhängig",
      href: "/schaerfauftrag",
      linkTitle: "Dentalinstrumente schärfen lassen, Online Auftrag",
      buttonText: "Jetzt schärfen lassen",
    },
    {
      title: "Express-Schärfen in Berlin",
      description: "Wir kommen zu Ihnen in die Praxis und gehen erst, wenn alle Instrumente ihre ursprüngliche Schärfe wiedererlangt haben.",
      imageUrl: "/3 spitzen.JPG",
      imageAlt: "Express-Service Berlin, Vor-Ort-Schärfung",
      badgeIcon: (
        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      badgeText: "Nur in Berlin & Umgebung",
      href: "/express-schaerfen",
      linkTitle: "Express Schärfung Berlin, Vor-Ort-Service",
      buttonText: "Express-Service",
    },
    {
      title: "Schärfkurs in Ihrer Praxis",
      description: "Erlernen Sie die richtige Schärftechnik. Professionelle Schulungen für das Praxisteam und Einzelpersonen mit zertifizierter Expertise.",
      imageUrl: "/schaerfkursbild.png",
      imageAlt: "Schärfkurse, professionelle Schulung",
      aiImage: true,
      badgeIcon: (
        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
        </svg>
      ),
      badgeText: "2h | 1-4 Teilnehmer",
      href: "/schaerfkurs",
      linkTitle: "Schärfkurse für Dentalinstrumente, professionelle Schulung",
      buttonText: "Kurse entdecken",
    },
  ], []);

  /* Von Blog-Breadcrumb (Link zu /#expertentipps): zuverlässig zur Sektion scrollen */
  useEffect(() => {
    const scrollIfHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (id !== "expertentipps") return;
      const el = document.getElementById("expertentipps");
      if (!el) return;
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };
    scrollIfHash();
    window.addEventListener("hashchange", scrollIfHash);
    return () => window.removeEventListener("hashchange", scrollIfHash);
  }, []);

  const shareArticle = async (articleId: string) => {
    const shareUrl = `${window.location.origin}/blog/${articleId}`;
    const article = blogPosts.find(post => post.id === articleId);
    const shareData = {
      title: article?.title || 'Expertentipp',
      text: article?.excerpt || 'Interessanter Artikel über Dentalinstrumente',
      url: shareUrl
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err: unknown) {
        if (err && typeof err === 'object' && 'name' in err && err.name !== 'AbortError') {
          console.log('Native Share fehlgeschlagen, fallback zu Copy:', err);
        } else {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedArticleId(articleId);
      setTimeout(() => setCopiedArticleId(null), 2000);
    } catch (err) {
      console.error('Fehler beim Kopieren:', err);
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedArticleId(articleId);
      setTimeout(() => setCopiedArticleId(null), 2000);
    }
  };

  useEffect(() => {
    const currentStatsRef = statsRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsVisible) {
            setStatsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (currentStatsRef) {
      observer.observe(currentStatsRef);
    }

    return () => {
      if (currentStatsRef) {
        observer.unobserve(currentStatsRef);
      }
    };
  }, [statsVisible]);

  useEffect(() => {
    if (!statsVisible) return;

    const duration = 2000;
    const target1 = 450;
    const target2 = 15000;
    const target3 = 20;
    const fps = 60;
    const totalFrames = (duration / 1000) * fps;
    
    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      
      setCount1(Math.floor(target1 * progress));
      setCount2(Math.floor(target2 * progress));
      setCount3(Math.floor(target3 * progress));
      
      if (frame >= totalFrames) {
        setCount1(target1);
        setCount2(target2);
        setCount3(target3);
        clearInterval(counter);
      }
    }, 1000 / fps);

    return () => clearInterval(counter);
  }, [statsVisible]);

  const faqItems = [
    {
      question: "Wie lange dauert die Schärfung meiner Instrumente?",
      answer: (
        <>
          Die Bearbeitungszeit beträgt in der Regel 3-5 Werktage. In dringenden Fällen können wir auch unseren{" "}
          <a href="/express-schaerfen" className="text-blue-600 hover:text-blue-700 underline font-medium">
            Express-Service
          </a>{" "}
          anbieten. Sie erhalten eine detaillierte Zeitangabe bei der Auftragserteilung.
        </>
      ),
      answerText: "Die Bearbeitungszeit beträgt in der Regel 3-5 Werktage. In dringenden Fällen können wir auch unseren Express-Service anbieten. Sie erhalten eine detaillierte Zeitangabe bei der Auftragserteilung."
    },
    {
      question: "Welche Instrumente können Sie schärfen?",
      answer: "Wir schärfen herstellerunabhängig alle gängigen Dentalinstrumente wie Scaler, Küretten, Raspatorien, Exkavatoren, scharfe Löffel, Knochenküretten, Meißel, Gingivalrandschräger, Schnitzinstrumente, Wurzelheber, Luxatoren, Scheren, Microscheren, Periotome und Tunnelierungsinstrumente. Bei speziellen Instrumenten beraten wir Sie gerne vorab über die Schärfbarkeit."
    },
    {
      question: "Was kostet die Schärfung?",
      answer: "Die Preise richten sich nach der Art und Anzahl der Instrumente. Bei größeren Mengen gewähren wir Mengenrabatte. Fordern Sie gerne ein individuelles Angebot an."
    },
    {
      question: "Wie kann ich einen Schärfauftrag starten?",
      answer: "Besuchen Sie einfach unsere Schärfauftrag-Seite, füllen Sie das Formular aus und senden Sie Ihre Instrumente an uns. Wir kontaktieren Sie bei Rückfragen und informieren Sie über den Bearbeitungsstand."
    },
    {
      question: "Wie werden die Instrumente verpackt & versendet?",
      answer: "Alle von Ihnen eingeschickten Instrumente müssen sterilisiert und sicher verpackt zu uns verschickt werden. Sollten die Instrumente nicht sterilisiert sein, wird eine Reinigungspauschale von 20€ erhoben. Nach dem Schärfprozess werden Ihre Instrumente gut verpackt und versichert an Sie zurück geschickt."
    }
  ];

  return (
    <>
      {/* Breadcrumb Schema für Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.dentalschleifen.de"
              }
            ]
          })
        }}
      />

      {/* FAQ Schema für SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": 'answerText' in item ? item.answerText : typeof item.answer === 'string' ? item.answer : ''
              }
            }))
          })
        }}
      />

      {/* Organization Schema mit Logo für Google Suchergebnisse */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Schärfservice Hartmann",
            "url": "https://www.dentalschleifen.de",
            "logo": "https://www.dentalschleifen.de/SHLogo.png",
            "description": "Professionelle Schärfung von dentalen und chirurgischen Instrumenten mit über 20 Jahren Erfahrung",
            "foundingDate": "2004",
            "founder": {
              "@type": "Person",
              "name": "Björn Hartmann"
            },
            "employee": {
              "@type": "Person",
              "name": "Carina Hartmann"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Petershagener Str. 27",
              "addressLocality": "Schöneiche bei Berlin",
              "postalCode": "15566",
              "addressRegion": "Brandenburg",
              "addressCountry": "DE"
            },
            "telephone": "+49 174 9342576",
            "email": "hartmann-schaerfservice@web.de",
            "sameAs": [
              "https://www.dentalschleifen.de"
            ]
          })
        }}
      />

      {/* LocalBusiness Schema für SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Schärfservice Hartmann",
            "description": "Professionelle Schärfung von dentalen und chirurgischen Instrumenten mit über 20 Jahren Erfahrung",
            "url": "https://www.dentalschleifen.de",
            "telephone": "+49 174 9342576",
            "email": "hartmann-schaerfservice@web.de",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.dentalschleifen.de/SHLogo.png",
              "width": 5489,
              "height": 5489
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Petershagener Str. 27",
              "addressLocality": "Schöneiche bei Berlin",
              "postalCode": "15566",
              "addressRegion": "Brandenburg",
              "addressCountry": "DE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "52.4894",
              "longitude": "13.7071"
            },
            "openingHours": [
              "Mo-Fr 08:00-18:00"
            ],
            "priceRange": "€€",
            "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
            "currenciesAccepted": "EUR",
            "areaServed": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "52.4667",
                "longitude": "13.7833"
              },
              "geoRadius": "150000"
            },
            "serviceType": "Dental Instrument Sharpening",
            "founder": {
              "@type": "Person",
              "name": "Björn Hartmann"
            },
            "employee": {
              "@type": "Person",
              "name": "Carina Hartmann"
            }
          })
        }}
      />

      {/* Service Schema für SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Instrumente schärfen & schleifen Berlin",
            "description": "Professionelles Dental schärfen, Instrumente schleifen und aufbereiten von dentalen und chirurgischen Instrumenten in Berlin",
            "alternateName": ["dental schleifen", "dental schärfen", "instrumente aufbereiten", "instrumente schärfen berlin"],
            "provider": {
              "@type": "LocalBusiness",
              "name": "Schärfservice Hartmann"
            },
            "areaServed": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "52.4667",
                "longitude": "13.7833"
              },
              "geoRadius": "150000"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Schärfservice Preisliste",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Scaler & Küretten Schärfung"
                  },
                  "price": "6.04",
                  "priceCurrency": "EUR"
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Raspatorien Schärfung"
                  },
                  "price": "11.06",
                  "priceCurrency": "EUR"
                }
              ]
            }
          })
        }}
      />

      {/* Course Schema für Schärfkurse */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Schärfkurse für Dentalinstrumente",
            "description": "Professionelle Schulung zur richtigen Schärftechnik für dentale Instrumente",
            "provider": {
              "@type": "Organization",
              "name": "Schärfservice Hartmann"
            },
            "offers": {
              "@type": "Offer",
              "price": "285",
              "priceCurrency": "EUR",
              "availability": "https://schema.org/InStock"
            },
            "courseMode": "onsite",
            "timeRequired": "PT2H",
            "numberOfCredits": 2,
            "educationalLevel": "Professional"
          })
        }}
      />

      {/* Blog Schema für SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Schärfservice Hartmann Blog",
            "description": "Tipps und Ratgeber zur Instrumentenpflege und Schärfung",
            "blogPost": blogPosts.map((post) => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "articleBody": post.fullText,
              "url": `https://www.dentalschleifen.de/blog/${post.id}`,
              "datePublished": "2024-03-15",
              "dateModified": "2024-03-15",
              "author": {
                "@type": "Person",
                "name": "Carina Hartmann"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Schärfservice Hartmann",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.dentalschleifen.de/SHLogo.png",
                  "width": 5489,
                  "height": 5489
                }
              },
              "image": {
                "@type": "ImageObject",
                "url": `https://www.dentalschleifen.de${post.imageUrl}`,
                "width": 1200,
                "height": 630
              },
              "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.dentalschleifen.de/blog/${post.id}`
              },
              "keywords": ["dentalinstrumente", "schärfen", "reinigung", "pflege", "raspatorien", "scaler", "küretten"],
              "articleSection": "Expertentipps"
            }))
          })
        }}
      />
    
    <div>
      {/* Hero Section */}
      <section className="relative h-[75vh] min-h-[560px] lg:h-screen lg:min-h-0 flex items-stretch lg:items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/schaerfservice-werkstatt-berlin.jpg" 
            alt="Schärfservice Hartmann Werkstatt in Berlin, professionelle Instrumentenschärfung für dentale und chirurgische Instrumente" 
            fill
            className="object-cover object-[15%_center] lg:object-center scale-x-[-1]"
            priority
            quality={90}
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" style={{background: 'linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 50%, transparent 80%)'}}></div>
        </div>
        
        <Container className="relative z-10 h-full lg:h-auto pt-28 pb-6 sm:pb-8 lg:pt-20 lg:pb-0 w-full">
          <div className="text-left h-full lg:h-auto flex flex-col justify-end lg:block">
            {/* Visuelle Überschrift – H1 liegt im SEO-Textblock weiter unten */}
            <p className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight mb-4 lg:mb-8 text-white">
              <span className="text-blue-600">Schärfe</span>
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>in Perfektion
            </p>
            
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-white/90 leading-relaxed mb-8 lg:mb-12 max-w-4xl">
              <strong>Dentale/Chirurgische Instrumente</strong> schärfen<br />
              <strong>Präzisionsinstrumente</strong> aufarbeiten<br />
              <strong>Scaler & Küretten</strong> fachgerecht schärfen.
            </p>
            
            <div className="flex flex-row gap-3 sm:gap-4 w-full lg:w-auto">
              <Button 
                href="/schaerfauftrag" 
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 sm:px-8 py-4 text-sm sm:text-base lg:text-lg font-medium whitespace-nowrap flex-1 lg:flex-none"
                hover="lift"
                onClick={() => analytics.buttonClick('schaerfauftrag_hero', 'homepage')}
              >
                <span className="lg:hidden">Jetzt schärfen</span>
                <span className="hidden lg:inline">Schärfauftrag starten</span>
              </Button>
              <WhiteButton 
                href="/schaerfkurs" 
                className="px-4 py-4 text-sm sm:text-base lg:text-lg whitespace-nowrap flex-1 lg:flex-none"
                hover="lift"
                onClick={() => analytics.buttonClick('schaerfkurse_hero', 'homepage')}
              >
                <span className="lg:hidden">Schärfkurse</span>
                <span className="hidden lg:inline">Schärfkurse ansehen</span>
              </WhiteButton>
            </div>
          </div>
        </Container>
      </section>

      {/* SEO-Intro Section */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-12">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">
              Dentalinstrumente schärfen lassen, präzise Aufarbeitung
            </h1>
          </div>
          <div className="grid max-w-6xl mx-auto lg:grid-cols-2 gap-10 lg:gap-14 items-center lg:items-stretch">
            <div className="text-center lg:text-left order-2 lg:order-1 lg:min-h-0">
              <p className="text-xl text-gray-600 leading-relaxed mb-4">
                Stumpfe Instrumente kosten Sie Zeit, belasten Ihre Hände und machen die Arbeit unnötig schwer. Scaler, die nicht mehr greifen. Küretten, die über den Zahnstein gleiten, anstatt ihn zu entfernen. Beim Schärfservice Hartmann erhalten Sie Ihre Instrumente nach der Aufarbeitung mit voller Schärfe zurück, exakt ausgerichtet und ohne Verzögerung wieder im Einsatz.
              </p>
              <p className="text-lg text-gray-500 leading-relaxed">
                Wir sind spezialisiert auf zahnärztliche und chirurgische Instrumente und sind seit 2004 für Sie da.
              </p>
            </div>
            <div className="relative w-full aspect-[4/3] max-w-xl mx-auto lg:max-w-none lg:aspect-auto lg:h-full lg:min-h-0 min-h-[220px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 order-1 lg:order-2">
              <Image
                src="/schleifen bild.JPG"
                alt="Instrumente schärfen, professionelle Schärfung im Schärfservice Hartmann"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-8 lg:py-20 bg-gray-50">
        <Container className="max-sm:px-3">
          <div className="grid grid-cols-3 gap-2 sm:gap-8 text-center">
            {[
              {title:"450+",subtitle:"Zufriedene Kunden", value: count1, suffix: "+"},
              {title:"15.000+",subtitle:"Instrumente geschärft", value: count2, suffix: "+"},
              {title:"erfahrung-20plus", subtitle:"Erfahrung", value: count3, suffix: "+ Jahre"}
            ].map((item) => (
              <div key={item.title} className="space-y-1 lg:space-y-2">
                <div className="flex items-center justify-center gap-1 lg:gap-2">
                  <div className="whitespace-nowrap text-2xl sm:text-4xl lg:text-5xl font-bold text-blue-600">
                    {item.value.toLocaleString('de-DE')}{item.suffix}
                  </div>
                  {item.title === "450+" && (
                    <div className="relative group inline-flex items-center">
                      <span
                        className="inline-flex items-center justify-center w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-blue-100 text-blue-700 text-xs lg:text-sm font-bold cursor-help"
                        aria-label="Info zu unseren Kunden"
                      >
                        i
                      </span>
                      <div
                        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 z-20 rounded-md bg-gray-900 text-white text-xs px-3 py-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150 text-left"
                        role="tooltip"
                      >
                        Zu unseren Kunden zählen zahlreiche Zahnarztpraxen sowie Ausbildungs-/Fortbildungsinstitutionen und Universitäten.
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-[0.65rem] sm:text-base lg:text-lg text-gray-600">{item.subtitle}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">
              Unser Service
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scaler, Küretten, Raspatorien und chirurgische Instrumente, herstellerunabhängig
            </p>
          </div>

          {/* Desktop: Stacking Cards */}
          <div className="hidden lg:block">
            <StackingCards services={serviceCards} />
          </div>

          {/* Mobil/Tablet: klassisches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:hidden">
            {/* 1. Instrumenten schärfen */}
            <div className="p-0 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden">
              <div className="relative w-full h-64 mb-0 rounded-t-2xl overflow-hidden">
                <Image 
                  src="/schleifenblau.png" 
                  alt="Instrumente schärfen, professionelle Schärfung" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 px-8 pb-4">
                  <h3 ref={h1Ref} className="text-2xl leading-8 font-semibold text-white sm:text-[28px] sm:leading-9">
                    Instrumente schärfen
                  </h3>
                </div>
              </div>
              <div className="px-8 pb-8 pt-6 flex flex-col flex-grow">
              <p className="text-base text-gray-600 leading-relaxed mb-6 sm:text-lg">
                Professionelles <strong>Schärfen und Aufarbeiten</strong> <strong>aller dentalen und chirurgischen Instrumente</strong>. Höchste Qualität für optimale Behandlungsergebnisse durch präzise Handarbeit.
              </p>
              <div className="mt-auto space-y-6">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                  </svg>
                  <p className="text-sm text-blue-600 font-medium">Herstellerunabhängig</p>
                </div>
                <Link href="/schaerfauftrag" title="Dentalinstrumente schärfen lassen, Online Auftrag">
                  <InteractiveHoverButton className="w-full" text="Jetzt schärfen lassen" />
                </Link>
              </div>
              </div>
            </div>

            {/* 2. Express-Service Berlin */}
            <div className="p-0 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden">
              <div className="relative w-full h-64 mb-0 rounded-t-2xl overflow-hidden">
                <Image 
                  src="/3 spitzen.JPG" 
                  alt="Express-Service Berlin, Vor-Ort-Schärfung" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 px-8 pb-4">
                  <h3 ref={h2Ref} className="text-2xl leading-8 font-semibold text-white sm:text-[28px] sm:leading-9">
                    Express-Schärfen in Berlin
                  </h3>
                </div>
              </div>
              <div className="px-8 pb-8 pt-6 flex flex-col flex-grow">
              <p className="text-base text-gray-600 leading-relaxed mb-6 sm:text-lg">
                Wir kommen zu Ihnen in die Praxis und gehen erst, wenn alle Instrumente
                ihre ursprüngliche Schärfe wiedererlangt haben.
              </p>
              <div className="mt-auto space-y-6">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <p className="text-sm text-blue-600 font-medium">Nur in Berlin & Umgebung</p>
                </div>
                <Link href="/express-schaerfen" title="Express Schärfung Berlin, Vor-Ort-Service">
                  <InteractiveHoverButton className="w-full" text="Express-Service" />
                </Link>
              </div>
              </div>
            </div>

            {/* 3. Schärfkurse */}
            <div className="p-0 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col md:col-span-2 lg:col-span-1 overflow-hidden">
              <div className="relative w-full h-64 mb-0 rounded-t-2xl overflow-hidden">
                <Image 
                  src="/schaerfkursbild.png" 
                  alt="Schärfkurse, professionelle Schulung" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <AiBadge className="top-3 right-3" align="right" />
                <div className="absolute bottom-0 left-0 right-0 px-8 pb-4">
                  <h3 ref={h3Ref} className="text-2xl leading-8 font-semibold text-white sm:text-[28px] sm:leading-9">
                    Schärfkurs in Ihrer Praxis
                  </h3>
                </div>
              </div>
              <div className="px-8 pb-8 pt-6 flex flex-col flex-grow">
              <p className="text-base text-gray-600 leading-relaxed mb-6 sm:text-lg">
                Erlernen Sie die richtige Schärftechnik. 
                Professionelle Schulungen für das Praxisteam und Einzelpersonen mit zertifizierter Expertise.
              </p>
              <div className="mt-auto space-y-6">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                  <p className="text-sm text-blue-600 font-medium">2h | 1-4 Teilnehmer</p>
                </div>
                <Link href="/schaerfkurs" title="Schärfkurse für Dentalinstrumente, professionelle Schulung">
                  <InteractiveHoverButton className="w-full" text="Kurse entdecken" />
                </Link>
              </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Instrument sharpness journey */}
      <HowItWorks09 />

      {/* Blog Section */}
      <section id="expertentipps" className="py-20 scroll-mt-28 md:scroll-mt-32">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">
              Expertentipps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wissenswertes rund um die Pflege und Schärfung Ihrer Instrumente
            </p>
          </div>

          <div
            ref={blogCarouselRef}
            onScroll={updateActiveBlog}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-8 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:pb-0 lg:grid-cols-4"
          >
            {blogPosts.map((post, index) => (
              <Card
                key={index}
                imageUrl={post.imageUrl}
                imageAlt={post.imageAlt}
                className="w-[88%] shrink-0 snap-start sm:w-[72%] md:w-auto md:shrink"
              >
                <div className="text-sm text-blue-600 font-medium mb-2">{post.date}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{post.title}</h3>
                <div className="relative mb-4">
                  <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer hover:underline transition-all duration-200"
                  >
                    Mehr lesen
                  </Link>
                  
                  <button
                    onClick={() => shareArticle(post.id)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium cursor-pointer hover:underline transition-all duration-200 group"
                    title="Artikel teilen"
                  >
                    {copiedArticleId === post.id ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-green-600">Kopiert!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                        <span>Teilen</span>
                      </>
                    )}
                  </button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-2 flex items-center justify-center gap-2 md:hidden" aria-label="Blogbeiträge auswählen">
            {blogPosts.map((post, index) => (
              <button
                key={post.id}
                type="button"
                onClick={() => scrollToBlog(index)}
                aria-label={`Blogbeitrag ${index + 1} anzeigen`}
                aria-current={activeBlogIndex === index ? "true" : undefined}
                className={`size-2.5 rounded-full transition-all duration-200 ${
                  activeBlogIndex === index ? "scale-110 bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">
              Häufige Fragen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Antworten auf die wichtigsten Fragen zu unserem Schärfservice
            </p>
          </div>
          <FAQ items={faqItems} className="mx-auto max-w-4xl" />
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">
              Bereit für perfekte Schärfe?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Starten Sie jetzt Ihren Schärfauftrag oder kontaktieren Sie uns für eine persönliche Beratung.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="/schaerfauftrag" 
                className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-medium"
                hover="lift"
              >
                Schärfauftrag starten
              </Button>
              <Button 
                variant="outline" 
                href="/kontakt" 
                className="px-8 py-4 text-lg font-medium"
              >
                Kontakt aufnehmen
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
    </>
  );
}
