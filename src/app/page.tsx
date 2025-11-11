"use client";

import { Button } from "@/components/Button";
import { WhiteButton } from "@/components/WhiteButton";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { FAQ } from "@/components/FAQ";
import { analytics } from "@/components/GoogleAnalytics";
import Image from "next/image";
import React, { useState, useRef, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { blogPosts as blogPostsData } from "@/lib/blogPosts";
import { useRouter, useSearchParams } from "next/navigation";

function HomeContent() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [copiedArticleId, setCopiedArticleId] = useState<string | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [philosophyActiveIndex, setPhilosophyActiveIndex] = useState(0);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const h3Ref = useRef<HTMLHeadingElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const philosophyScrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const philosophyItems = useMemo(() => [
    {
      h:"Qualifiziert", 
      points:[
        "20+ Jahre Schärferfahrung",
        "Hu-Friedy Schulung in Chicago",
        "Höchste Qualitätsstandards"
      ],
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      )
    },
    {
      h:"Langlebig", 
      points:[
        "exakte Präzisonsschärfe",
        "Fachgerechte Instrumentenpflege",
        "Längere Nutzungsdauer"
      ],
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      h:"Nachhaltig", 
      points:[
        "Emissionsfreie Bearbeitung",
        "Nachhaltige Arbeitsweise",
        "Umweltfreundliche Verpackung"
      ],
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ], []);

  const blogPosts = useMemo(() => blogPostsData, []);

  // Prüfe URL-Parameter beim Laden der Seite und aktualisiere Meta-Tags
  useEffect(() => {
    const articleId = searchParams.get('article');
    if (articleId) {
      const article = blogPosts.find(post => post.id === articleId);
      if (article) {
        const articleIndex = blogPosts.findIndex(post => post.id === articleId);
        setExpandedCard(articleIndex);
        
        // Dynamische Meta-Tags für den Artikel
        document.title = `${article.title} | Schärfservice Hartmann`;
        
        // Meta Description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.setAttribute('name', 'description');
          document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', article.excerpt);
        
        // Open Graph Tags
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (!ogTitle) {
          ogTitle = document.createElement('meta');
          ogTitle.setAttribute('property', 'og:title');
          document.head.appendChild(ogTitle);
        }
        ogTitle.setAttribute('content', article.title);
        
        let ogDescription = document.querySelector('meta[property="og:description"]');
        if (!ogDescription) {
          ogDescription = document.createElement('meta');
          ogDescription.setAttribute('property', 'og:description');
          document.head.appendChild(ogDescription);
        }
        ogDescription.setAttribute('content', article.excerpt);
        
        let ogUrl = document.querySelector('meta[property="og:url"]');
        if (!ogUrl) {
          ogUrl = document.createElement('meta');
          ogUrl.setAttribute('property', 'og:url');
          document.head.appendChild(ogUrl);
        }
        ogUrl.setAttribute('content', `${window.location.origin}/blog/${articleId}`);
        
        // Scroll zur Expertentipps-Sektion
        setTimeout(() => {
          const expertentippsSection = document.getElementById('expertentipps');
          if (expertentippsSection) {
            expertentippsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      // Zurücksetzen auf Standard-Titel wenn kein Artikel geöffnet
      document.title = "Schärfservice Hartmann - Dentalinstrumente schärfen & schleifen Berlin | Dentalinstrumente schärfen ab 6,04€";
    }
  }, [searchParams, blogPosts]);

  // Philosophy Cards Scroll Handler
  useEffect(() => {
    const scrollContainer = philosophyScrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollLeft = scrollContainer.scrollLeft;
      const cardWidth = window.innerWidth - 48 + 24; // calc(100vw - 3rem) + gap (1.5rem = 24px)
      const index = Math.round(scrollLeft / cardWidth);
      setPhilosophyActiveIndex(Math.min(index, philosophyItems.length - 1));
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [philosophyItems.length]);

  // Funktionen für Artikel-Navigation
  const closeArticle = () => {
    setExpandedCard(null);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('article');
    router.push(newUrl.pathname + newUrl.search, { scroll: false });
  };

  const shareArticle = async (articleId: string) => {
    const shareUrl = `${window.location.origin}/?article=${articleId}`;
    const article = blogPosts.find(post => post.id === articleId);
    const shareData = {
      title: article?.title || 'Expertentipp',
      text: article?.excerpt || 'Interessanter Artikel über Dentalinstrumente',
      url: shareUrl
    };

    // Prüfe ob Native Share API verfügbar ist
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return; // Erfolgreich geteilt, keine weitere Aktion nötig
      } catch (err: unknown) {
        // User hat das Teilen abgebrochen oder Fehler aufgetreten
        if (err && typeof err === 'object' && 'name' in err && err.name !== 'AbortError') {
          console.log('Native Share fehlgeschlagen, fallback zu Copy:', err);
        } else {
          return; // User hat abgebrochen, keine weitere Aktion
        }
      }
    }

    // Fallback: Copy to Clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedArticleId(articleId);
      setTimeout(() => setCopiedArticleId(null), 2000);
    } catch (err) {
      console.error('Fehler beim Kopieren:', err);
      // Fallback für ältere Browser
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


  // Intersection Observer für Stats Animation
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

  // Counter Animation für Stats
  useEffect(() => {
    if (!statsVisible) return;

    const duration = 2000; // 2 Sekunden
    const target1 = 450;
    const target2 = 10000;
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

  // FAQ Daten für Schema und Anzeige
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
      answer: "Wir schärfen herstellerunabhängig alle gängigen Dentalinstrumente wie Scaler, Küretten, Raspatorien, Exkavatoren, scharfe Löffel, Knochenküretten, Meißel, Gingivalrandschräger, Schnitzinstrumente, Wurzelheber, Luxatoren, Scheren,  Microscheren, Periotome und Tunnelierungsinstrumente. Bei speziellen Instrumenten beraten wir Sie gerne vorab über die Schärfbarkeit."
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
      {/* Modal Overlay für erweiterte Artikel */}
      {expandedCard !== null && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeArticle}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-sm text-blue-600 font-medium mb-2">
                    {blogPosts[expandedCard].date}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {blogPosts[expandedCard].title}
                  </h3>
                </div>
                <button
                  onClick={closeArticle}
                  className="text-gray-400 hover:text-gray-600 ml-4 cursor-pointer hover:bg-gray-100 rounded-full p-1 transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={blogPosts[expandedCard].imageUrl}
                  alt={blogPosts[expandedCard].imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
              
              <p className="text-gray-600 leading-relaxed text-lg">
                {blogPosts[expandedCard].fullText}
              </p>
            </div>
          </div>
        </div>
      )}

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
            "logo": "https://www.dentalschleifen.de/dentalschleifen-logo-512.png",
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
              "streetAddress": "Petershagener Straße 29",
              "addressLocality": "Schöneiche bei Berlin",
              "postalCode": "15566",
              "addressRegion": "Brandenburg",
              "addressCountry": "DE"
            },
            "telephone": "+49-30-92371278",
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
            "telephone": "+49-30-92371278",
            "email": "hartmann-schaerfservice@web.de",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.dentalschleifen.de/dentalschleifen-logo-512.png"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Petershagener Straße 29",
              "addressLocality": "Schöneiche bei Berlin",
              "postalCode": "15566",
              "addressRegion": "Brandenburg",
              "addressCountry": "DE"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "52.4667",
              "longitude": "13.7833"
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
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127"
            },
            "review": [
              {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5"
                },
                "author": {
                  "@type": "Person",
                  "name": "Verifizierter Auftraggeber"
                },
                "reviewBody": "Hervorragende Qualität und schnelle Bearbeitung. Unsere Instrumente sind wie neu."
              },
              {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5"
                },
                "author": {
                  "@type": "Person",
                  "name": "Verifizierter Auftraggeber"
                },
                "reviewBody": "Professioneller Service mit überzeugender Expertise. Sehr empfehlenswert!"
              }
            ]
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
              "price": "215",
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
                  "url": "https://www.dentalschleifen.de/dentalschleifen-logo-512.png"
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
      <section className="relative h-[75vh] lg:h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/schaerfservice-werkstatt-berlin.jpg" 
            alt="Schärfservice Hartmann Werkstatt in Berlin - Professionelle Instrumentenschärfung für dentale und chirurgische Instrumente" 
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
        
        <Container className="relative z-10 pt-20 w-full">
          <div className="text-left">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight mb-8 text-white">
              <span className="text-blue-600">Schärfe</span> in Perfektion
            </h1>
            
            <p className="hidden lg:block text-xl sm:text-2xl text-white/90 leading-relaxed mb-12 max-w-4xl">
              <strong>Dentale/Chirurgische Instrumente schärfen & schleifen</strong><br />
              <strong>Präzisionsinstrumente aufarbeiten</strong><br />
              <strong>Schärfkurse</strong> in ihrer Praxis.
            </p>
            
            <div className="flex flex-row gap-4 w-full lg:w-auto">
              <Button 
                href="/schaerfauftrag" 
                className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-base lg:text-lg font-medium flex-1 lg:flex-none"
                hover="lift"
                onClick={() => analytics.buttonClick('schaerfauftrag_hero', 'homepage')}
              >
                <span className="lg:hidden">Jetzt schärfen</span>
                <span className="hidden lg:inline">Schärfauftrag starten</span>
              </Button>
              <WhiteButton 
                href="/schaerfkurse" 
                className="text-base lg:text-lg flex-1 lg:flex-none"
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

      {/* Stats Section */}
      <section ref={statsRef} className="py-8 lg:py-20 bg-gray-50">
        <Container>
          <div className="grid grid-cols-3 gap-2 sm:gap-8 text-center">
            {[
              {title:"450+",subtitle:"Zufriedene Kunden", value: count1, suffix: "+"},
              {title:"10.000+",subtitle:"Instrumente geschärft", value: count2, suffix: "+"},
              {title:"20 Jahre",subtitle:"Erfahrung", value: count3, suffix: " Jahre"}
            ].map((item) => (
              <div key={item.title} className="space-y-1 lg:space-y-2">
                <div className="flex items-center justify-center gap-1 lg:gap-2">
                  <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-blue-600">
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
              Professionelle Schärfdienstleistungen für alle Ihre Bedürfnisse
            </p>
          </div>

          {/* Modern Card Layout - 3 Cards nebeneinander auf Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. Instrumenten schärfen */}
            <div className="p-0 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden">
              <div className="relative w-full h-64 mb-0 rounded-t-2xl overflow-hidden">
                <Image 
                  src="/schleifen bild.JPG" 
                  alt="Instrumente schärfen - Professionelle Schärfung" 
                  fill
                  className="object-cover"
                />
                {/* Gradient für bessere Lesbarkeit */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Überschrift als Overlay - gleiche Breite wie Card-Inhalt */}
                <div className="absolute bottom-0 left-0 right-0 px-8 pb-4">
                  <h3 ref={h1Ref} className="text-2xl font-semibold text-white">
                    Instrumente schärfen
                  </h3>
                </div>
              </div>
              <div className="px-8 pb-8 pt-6 flex flex-col flex-grow">
              <p className="text-gray-600 leading-relaxed mb-6">
                Professionelles <strong>Schärfen und Instrumente aufarbeiten</strong> aller dentalen und chirurgischen Instrumente. 
                Höchste Qualität für optimale Behandlungsergebnisse durch präzise Handarbeit.
              </p>
              <div className="mt-auto space-y-6">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                  </svg>
                  <p className="text-sm text-blue-600 font-medium">Herstellerunabhängig</p>
                </div>
                <Button href="/schaerfauftrag" className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 w-full" hover="lift" title="Dentalinstrumente schärfen lassen - Online Auftrag">
                  Jetzt schärfen lassen
                </Button>
              </div>
              </div>
            </div>

            {/* 2. Express-Service Berlin */}
            <div className="p-0 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden">
              <div className="relative w-full h-64 mb-0 rounded-t-2xl overflow-hidden">
                <Image 
                  src="/3 spitzen.JPG" 
                  alt="Express-Service Berlin - Vor Ort Schärfung" 
                  fill
                  className="object-cover"
                />
                {/* Gradient für bessere Lesbarkeit */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Überschrift als Overlay - gleiche Breite wie Card-Inhalt */}
                <div className="absolute bottom-0 left-0 right-0 px-8 pb-4">
                  <h3 ref={h2Ref} className="text-2xl font-semibold text-white">
                    Express-Schärfen in Berlin
                  </h3>
                </div>
              </div>
              <div className="px-8 pb-8 pt-6 flex flex-col flex-grow">
              <p className="text-gray-600 leading-relaxed mb-6">
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
                <Button href="/express-schaerfen" className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 w-full" hover="lift" title="Express Schärfung Berlin - Vor Ort Service">
                  Express-Service anfragen
                </Button>
              </div>
              </div>
            </div>

            {/* 3. Schärfkurse */}
            <div className="p-0 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col md:col-span-2 lg:col-span-1 overflow-hidden">
              <div className="relative w-full h-64 mb-0 rounded-t-2xl overflow-hidden">
                <Image 
                  src="/schaerfkursbild.png" 
                  alt="Schärfkurse - Professionelle Schulung" 
                  fill
                  className="object-cover"
                />
                {/* Gradient für bessere Lesbarkeit */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Überschrift als Overlay - gleiche Breite wie Card-Inhalt */}
                <div className="absolute bottom-0 left-0 right-0 px-8 pb-4">
                  <h3 ref={h3Ref} className="text-2xl font-semibold text-white">
                    Schärfkurs in Ihrer Praxis
                  </h3>
                </div>
              </div>
              <div className="px-8 pb-8 pt-6 flex flex-col flex-grow">
              <p className="text-gray-600 leading-relaxed mb-6">
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
                <Button href="/schaerfkurse" className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 w-full" hover="lift" title="Schärfkurse für Dentalinstrumente - Professionelle Schulung">
                  Kurse entdecken
                </Button>
              </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">
              Unsere Philosophie
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Qualität, Zuverlässigkeit, Präzision, Langlebigkeit und Nachhaltigkeit stehen im Mittelpunkt unserer Arbeit
            </p>
          </div>
          
          <div 
            ref={philosophyScrollRef}
            className="flex sm:grid sm:grid-cols-3 gap-6 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory sm:snap-none pb-4 sm:pb-0 -mx-6 sm:mx-0 px-6 sm:px-0"
          >
            {philosophyItems.map((item, index) => (
              <Card key={index} className="p-6 flex-shrink-0 w-[calc(100vw-3rem)] sm:w-auto snap-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 text-center">{item.h}</h3>
                <ul className="text-gray-600 text-left space-y-1">
                  {item.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-center gap-2 whitespace-nowrap">
                      <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="truncate">{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          
          {/* Navigation Dots (nur auf Mobile sichtbar) */}
          <div className="flex sm:hidden justify-center gap-2 mt-6">
            {philosophyItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const scrollContainer = philosophyScrollRef.current;
                  if (scrollContainer) {
                    const cardWidth = window.innerWidth - 48 + 24; // calc(100vw - 3rem) + gap
                    scrollContainer.scrollTo({
                      left: index * cardWidth,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  philosophyActiveIndex === index 
                    ? 'w-8 bg-blue-600' 
                    : 'w-2 bg-gray-300'
                }`}
                aria-label={`Zu ${philosophyItems[index].h} springen`}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Blog Section */}
      <section id="expertentipps" className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">
              Expertentipps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wissenswertes rund um die Pflege und Schärfung Ihrer Instrumente
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} imageUrl={post.imageUrl} imageAlt={post.imageAlt}>
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
          <FAQ items={faqItems} />
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-gray-900">
              Bereit für professionelle Schärfdienstleistungen?
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

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}