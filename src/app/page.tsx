"use client";

import { Button } from "@/components/Button";
import { WhiteButton } from "@/components/WhiteButton";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { FAQ } from "@/components/FAQ";
import { analytics } from "@/components/GoogleAnalytics";
import Image from "next/image";
import React, { useState, useRef } from "react";

export default function Home() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const h3Ref = useRef<HTMLHeadingElement>(null);

  // FAQ Daten für Schema
  const faqItems = [
    {
      question: "Wie lange dauert die Schärfung meiner Instrumente?",
      answer: "Die Bearbeitungszeit beträgt in der Regel 3-5 Werktage. Bei dringenden Fällen können wir auch Express-Service anbieten. Sie erhalten eine detaillierte Zeitangabe bei der Auftragserteilung."
    },
    {
      question: "Welche Instrumente können Sie schärfen?",
      answer: "Wir schärfen alle gängigen Dentalinstrumente wie Scaler, Kürretten, Raspatorien, Exkavatoren und chirurgische Instrumente. Bei speziellen Instrumenten beraten wir Sie gerne vorab über die Schärfbarkeit."
    },
    {
      question: "Wie werden die Instrumente verpackt und versendet?",
      answer: "Alle Instrumente werden einzeln in speziellen Schutzhüllen verpackt und in stabilen Versandboxen aus recyceltem Karton versendet. Der Versand erfolgt versichert und nachverfolgbar."
    },
    {
      question: "Was kostet die Schärfung?",
      answer: "Die Preise richten sich nach der Art und Anzahl der Instrumente. Scaler und Exkavatoren ab 6,04 €, Raspatorien ab 11,06 €. Bei größeren Mengen gewähren wir Mengenrabatte. Fordern Sie gerne ein individuelles Angebot an."
    },
    {
      question: "Wie kann ich einen Schärfauftrag starten?",
      answer: "Besuchen Sie einfach unsere Schärfauftrag-Seite, füllen Sie das Formular aus und senden Sie Ihre Instrumente an uns. Wir kontaktieren Sie bei Rückfragen und informieren Sie über den Bearbeitungsstand."
    }
  ];



  const blogPosts = [
    {
      title: "Richtige Reinigung von Dentalinstrumenten",
      excerpt: "Erfahren Sie, wie Sie Ihre Instrumente nach der Behandlung optimal reinigen und vor Korrosion schützen. Wichtige Schritte für die",
      fullText: "Die Reinigung von Dentalinstrumenten ist der erste und wichtigste Schritt in der Aufbereitung. Nach jeder Behandlung sollten die Instrumente sofort unter fließendem Wasser abgespült werden, um Blut und Speichel zu entfernen. Anschließend ist eine gründliche Reinigung mit speziellen Reinigungsmitteln erforderlich, die für medizinische Instrumente geeignet sind. Verwenden Sie milde, pH-neutrale Reiniger. Achten Sie darauf, dass alle Oberflächen erreicht werden, besonders bei komplexen Instrumenten wie Scaler und Kürretten. Nach der Reinigung sollten die Instrumente vollständig getrocknet werden, um Korrosion zu vermeiden. Eine ordnungsgemäße Reinigung verlängert nicht nur die Lebensdauer Ihrer Instrumente, sondern gewährleistet auch die Patientensicherheit.",
      date: "15. März 2024",
      imageUrl: "/dentalinstrumente-kassette-schaerfung.jpg",
      imageAlt: "Professionelle Reinigung von Dentalinstrumenten in Kassette - Schärfservice Hartmann Berlin"
    },
    {
      title: "Schärfwinkel bei Scaler und Kürretten",
      excerpt: "Warum der korrekte Schärfwinkel entscheidend für die Effektivität Ihrer Instrumente ist. Optimale Winkel zwischen",
      fullText: "Der Schärfwinkel ist bei Dentalinstrumenten von entscheidender Bedeutung für deren Funktionalität. Bei Scaler und Kürretten liegt der optimale Winkel zwischen 70 und 80 Grad. Ein zu flacher Winkel reduziert die Schärfe, während ein zu steiler Winkel die Schneide zu dünn macht und Bruchgefahr besteht. Die richtige Schärfung erfolgt in mehreren Schritten: Zuerst wird die Schneide mit einem groben Schleifstein vorbereitet, dann mit einem feineren Stein nachgeschärft. Wichtig ist dabei, den ursprünglichen Winkel beizubehalten und gleichmäßig zu arbeiten. Regelmäßige Kontrolle mit einer Lupe hilft dabei, Unebenheiten zu erkennen und zu korrigieren. Professionell geschärfte Instrumente sorgen für präzise und effiziente Behandlungen.",
      date: "8. März 2024",
      imageUrl: "/dental-schere-schaerfwinkel-berlin.jpg",
      imageAlt: "Optimaler Schärfwinkel bei Dentalscheren - Professionelle Schärfung Berlin Schärfservice Hartmann"
    },
    {
      title: "Lagerung und Pflege von Raspatorien",
      excerpt: "Tipps zur ordnungsgemäßen Aufbewahrung und regelmäßigen Wartung Ihrer Raspatorien. Schützen Sie die feinen",
      fullText: "Raspatorien benötigen besondere Aufmerksamkeit bei der Lagerung und Pflege. Nach der Reinigung sollten sie einzeln in speziellen Halterungen oder Schaumstoffeinlagen aufbewahrt werden, um Beschädigungen der feinen Zähne zu vermeiden. Die Lagerung sollte an einem trockenen, staubfreien Ort erfolgen. Regelmäßige Inspektion der Zähne ist wichtig - beschädigte oder abgenutzte Bereiche sollten umgehend repariert oder ersetzt werden. Bei der Reinigung ist Vorsicht geboten: Aggressive Reinigungsmittel können die Oberfläche angreifen. Verwenden Sie milde, pH-neutrale Reiniger und trocknen Sie die Instrumente sorgfältig ab. Eine ordnungsgemäße Pflege verlängert die Lebensdauer erheblich und gewährleistet optimale Arbeitsergebnisse.",
      date: "1. März 2024",
      imageUrl: "/raspatorien-lagerung-pflege-dental.png",
      imageAlt: "Fachgerechte Lagerung und Pflege von Raspatorien - Schärfservice Hartmann Expertenberatung"
    },
    {
      title: "Wann sollte geschärft werden?",
      excerpt: "Anzeichen erkennen und den optimalen Zeitpunkt für eine professionelle Schärfung bestimmen. Faustregel: Nach 20-30",
      fullText: "Die rechtzeitige Schärfung Ihrer Dentalinstrumente ist entscheidend für deren Effektivität. Erste Anzeichen für eine notwendige Schärfung sind: verminderte Schneidleistung, erhöhter Kraftaufwand bei der Anwendung und sichtbare Abnutzungsspuren. Bei Scaler und Kürretten sollten Sie auf eine glatte, scharfe Schneide achten - stumpfe Instrumente können das Gewebe traumatisieren. Als Faustregel gilt: Instrumente sollten nach 20-30 Behandlungen geschärft werden, abhängig von der Intensität der Nutzung. Regelmäßige Kontrolle mit einer Lupe hilft dabei, den optimalen Zeitpunkt zu bestimmen. Eine professionelle Schärfung durch Experten gewährleistet nicht nur die richtige Schärfe, sondern auch die Beibehaltung der korrekten Winkel und Formen. Investieren Sie in regelmäßige Wartung - es lohnt sich für Ihre Praxis und Ihre Patienten.",
      date: "22. Februar 2024",
      imageUrl: "/schaerfservice-werkstatt-berlin.jpg",
      imageAlt: "Wann sollten Dentalinstrumente geschärft werden - Schärfservice Hartmann Berlin Expertentipps"
    }
  ];

  return (
    <>
      {/* Modal Overlay für erweiterte Artikel */}
      {expandedCard !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setExpandedCard(null)}
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
                  onClick={() => setExpandedCard(null)}
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
                "text": item.answer
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
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.dentalschleifen.de/schaerfservice-hartmann-logo.png",
              "width": 600,
              "height": 600
            },
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
            "telephone": "+49-174-9342576",
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
            "telephone": "+49-174-9342576",
            "email": "hartmann-schaerfservice@web.de",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.dentalschleifen.de/schaerfservice-hartmann-logo.png"
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
                    "name": "Scaler & Kürretten Schärfung"
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
            "blogPost": blogPosts.map((post, index) => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
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
                  "url": "https://www.dentalschleifen.de/schaerfservice-hartmann-logo.png"
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
                "@id": "https://www.dentalschleifen.de/#blog"
              }
            }))
          })
        }}
      />
    
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/schaerfservice-werkstatt-berlin.jpg" 
            alt="Schärfservice Hartmann Werkstatt in Berlin - Professionelle Instrumentenschärfung für dentale und chirurgische Instrumente" 
            fill
            className="object-cover scale-x-[-1]"
            priority
            quality={90}
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" style={{background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 30%, transparent 60%)'}}></div>
        </div>
        
        <Container className="relative z-10 pt-20 w-full">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-8">
              Über <span className="font-bold">20</span> Jahre Erfahrung
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight mb-8 text-white">
              <span className="text-blue-600">Instrumente schärfen</span><br />
              & <span className="text-blue-600">schleifen Berlin</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/90 leading-relaxed mb-12 max-w-4xl">
              <strong>Dental schärfen & schleifen</strong> mit höchster Präzision.<br />
              Professionelle <strong>Instrumente aufbereiten</strong> für dentale und chirurgische Anwendungen
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                href="/schaerfauftrag" 
                className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-medium"
                hover="lift"
                onClick={() => analytics.buttonClick('schaerfauftrag_hero', 'homepage')}
              >
                Schärfauftrag starten
              </Button>
              <WhiteButton 
                href="/schaerfkurse" 
                hover="lift"
                onClick={() => analytics.buttonClick('schaerfkurse_hero', 'homepage')}
              >
                Schärfkurse ansehen
              </WhiteButton>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 mt-20">
        <Container>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              {title:"450+",subtitle:"Zufriedene Kunden"},
              {title:"10.000+",subtitle:"Instrumente geschärft"},
              {title:"20 Jahre",subtitle:"Erfahrung"}
            ].map((item) => (
              <div key={item.title} className="space-y-2">
                <div className="text-4xl sm:text-5xl font-bold text-blue-600">{item.title}</div>
                <div className="text-lg text-gray-600">{item.subtitle}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">
              Unsere Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professionelle Schärfdienstleistungen für alle Ihre Bedürfnisse
            </p>
          </div>

          <div className="space-y-24">
            {/* 1. Instrumenten schärfen - Links */}
            <div className="flex items-center">
              <div className="w-1/2 pr-16">
                <div className="group text-left">
                  <h3 ref={h1Ref} className="text-2xl font-medium mb-4 text-gray-900">Instrumente schärfen & schleifen</h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-4">
                    Professionelles <strong>Dental schärfen</strong> und <strong>Instrumente aufbereiten</strong> aller dentalen und chirurgischen Instrumente. 
                    Höchste Qualität für optimale Behandlungsergebnisse durch präzise Handarbeit.
                  </p>
                  <div className="flex items-center gap-2 mb-6">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                    </svg>
                    <p className="text-sm text-blue-600 font-medium">Herstellerunabhängig</p>
                  </div>
                  <Button href="/schaerfauftrag" className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3" hover="lift" title="Dentalinstrumente schärfen lassen - Online Auftrag">
                    Jetzt schärfen lassen
                  </Button>
                </div>
              </div>
              <div className="w-1/2"></div>
            </div>

            {/* 2. Express-Service Berlin - Rechts */}
            <div className="flex items-center">
              <div className="w-1/2"></div>
              <div className="w-1/2 pl-16">
                <div className="group text-right">
                  <h3 ref={h2Ref} className="text-2xl font-medium mb-4 text-gray-900">Express-Schärfen in Berlin</h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-4">
                    Wir kommen zu Ihnen in die Praxis und gehen erst, wenn alle Instrumente
                    ihre ursprüngliche Schärfe wiedererlangt haben.
                  </p>
                  <div className="flex items-center justify-end gap-2 mb-6">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <p className="text-sm text-blue-600 font-medium">Nur in Berlin & Umgebung</p>
                  </div>
                  <Button href="/express-schaerfen" className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3" hover="lift" title="Express Schärfung Berlin - Vor Ort Service">
                    Express-Service anfragen
                  </Button>
                </div>
              </div>
            </div>

            {/* 3. Schärfkurse - Links */}
            <div className="flex items-center">
              <div className="w-1/2 pr-16">
                <div className="group text-left">
                  <h3 ref={h3Ref} className="text-2xl font-medium mb-4 text-gray-900">Schärfkurse</h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-4">
                    Lernen Sie die richtige Schärftechnik. 
                    Professionelle Schulungen für Praxisteams und Einzelpersonen mit zertifizierter Expertise.
                  </p>
                  <div className="flex items-center gap-2 mb-6">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                    <p className="text-sm text-blue-600 font-medium">2h | 1-4 Teilnehmer</p>
                  </div>
                  <Button href="/schaerfkurse" className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3" hover="lift" title="Schärfkurse für Dentalinstrumente - Professionelle Schulung">
                    Kurse entdecken
                  </Button>
                </div>
              </div>
              <div className="w-1/2"></div>
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
              Qualität, Langlebigkeit und Nachhaltigkeit stehen im Mittelpunkt unserer Arbeit
            </p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                h:"Qualifiziert", 
                p:"Neben über 20-jähriger Erfahrung wurden wir als eine der wenigen Firmen im deutschsprachigen Raum direkt bei Hu-Friedy in Chicago in Instrumentenkunde und der Technik des Schärfens von Instrumenten ausgebildet. Diese Expertise garantiert höchste Qualitätsstandards.", 
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                )
              },
              {
                h:"Langlebig", 
                p:"Durch präzise Schärfung und fachgerechte Pflege verlängern wir die Nutzungsdauer hochwertiger Dentalinstrumente – nachhaltig und wirtschaftlich sinnvoll. Unsere Arbeit sorgt für langanhaltende Schärfe und reduziert den Bedarf an Neuanschaffungen erheblich.",
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )
              },
              {
                h:"Nachhaltig", 
                p:"Wir setzen auf umweltfreundliche Verpackungen und nachhaltige Arbeitsweisen. Durch die Verlängerung der Lebensdauer Ihrer Instrumente tragen wir aktiv zum Umweltschutz bei und reduzieren Abfall.",
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <Card key={index} className="text-center p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{item.h}</h3>
                <p className="text-gray-600 leading-relaxed">{item.p}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Blog Section */}
      <section className="py-20">
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
                <button
                  onClick={() => setExpandedCard(index)}
                  className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer hover:underline transition-all duration-200"
                >
                  Mehr lesen
                </button>
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
              Bereit für professionelle Schärfung?
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