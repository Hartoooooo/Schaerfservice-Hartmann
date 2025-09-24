"use client";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { FAQ } from "@/components/FAQ";
import { GradientText } from "@/components/GradientText";
import { analytics } from "@/components/GoogleAnalytics";
import { InnovationHeading } from "@/components/SectionHeading";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
export default function Home() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
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
      question: "Gibt es eine Garantie auf die Schärfung?",
      answer: "Ja, wir gewähren eine 6-monatige Garantie auf unsere Schärfarbeiten. Sollten Sie mit dem Ergebnis nicht zufrieden sein, schärfen wir die Instrumente kostenlos nach."
    },
    {
      question: "Wie kann ich einen Schärfauftrag starten?",
      answer: "Besuchen Sie einfach unsere Schärfauftrag-Seite, füllen Sie das Formular aus und senden Sie Ihre Instrumente an uns. Wir kontaktieren Sie bei Rückfragen und informieren Sie über den Bearbeitungsstand."
    }
  ];

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const blogPosts = [
    {
      title: "Die richtige Reinigung von Dentalinstrumenten",
      excerpt: "Erfahren Sie, wie Sie Ihre Instrumente nach der Behandlung optimal reinigen und vor Korrosion schützen. Wichtige Schritte für die Langlebigkeit Ihrer Dentalinstrumente.",
      fullText: "Die Reinigung von Dentalinstrumenten ist der erste und wichtigste Schritt in der Aufbereitung. Nach jeder Behandlung sollten die Instrumente sofort unter fließendem Wasser abgespült werden, um Blut und Speichel zu entfernen. Anschließend ist eine gründliche Reinigung mit speziellen Reinigungsmitteln erforderlich, die für medizinische Instrumente geeignet sind. Verwenden Sie milde, pH-neutrale Reiniger. Achten Sie darauf, dass alle Oberflächen erreicht werden, besonders bei komplexen Instrumenten wie Scaler und Kürretten. Nach der Reinigung sollten die Instrumente vollständig getrocknet werden, um Korrosion zu vermeiden. Eine ordnungsgemäße Reinigung verlängert nicht nur die Lebensdauer Ihrer Instrumente, sondern gewährleistet auch die Patientensicherheit.",
      date: "15. März 2024",
      imageUrl: "/dentalinstrumente-kassette-schaerfung.jpg",
      imageAlt: "Professionelle Reinigung von Dentalinstrumenten in Kassette - Schärfservice Hartmann Berlin"
    },
    {
      title: "Schärfwinkel bei Scaler und Kürretten",
      excerpt: "Warum der korrekte Schärfwinkel entscheidend für die Effektivität Ihrer Instrumente ist. Optimale Winkel zwischen 70-80 Grad für maximale Schärfe und Langlebigkeit.",
      fullText: "Der Schärfwinkel ist bei Dentalinstrumenten von entscheidender Bedeutung für deren Funktionalität. Bei Scaler und Kürretten liegt der optimale Winkel zwischen 70 und 80 Grad. Ein zu flacher Winkel reduziert die Schärfe, während ein zu steiler Winkel die Schneide zu dünn macht und Bruchgefahr besteht. Die richtige Schärfung erfolgt in mehreren Schritten: Zuerst wird die Schneide mit einem groben Schleifstein vorbereitet, dann mit einem feineren Stein nachgeschärft. Wichtig ist dabei, den ursprünglichen Winkel beizubehalten und gleichmäßig zu arbeiten. Regelmäßige Kontrolle mit einer Lupe hilft dabei, Unebenheiten zu erkennen und zu korrigieren. Professionell geschärfte Instrumente sorgen für präzise und effiziente Behandlungen.",
      date: "8. März 2024",
      imageUrl: "/dental-schere-schaerfwinkel-berlin.jpg",
      imageAlt: "Optimaler Schärfwinkel bei Dentalscheren - Professionelle Schärfung Berlin Schärfservice Hartmann"
    },
    {
      title: "Lagerung und Pflege von Raspatorien",
      excerpt: "Tipps zur ordnungsgemäßen Aufbewahrung und regelmäßigen Wartung Ihrer Raspatorien. Schützen Sie die feinen Zähne vor Beschädigungen durch richtige Lagerung.",
      fullText: "Raspatorien benötigen besondere Aufmerksamkeit bei der Lagerung und Pflege. Nach der Reinigung sollten sie einzeln in speziellen Halterungen oder Schaumstoffeinlagen aufbewahrt werden, um Beschädigungen der feinen Zähne zu vermeiden. Die Lagerung sollte an einem trockenen, staubfreien Ort erfolgen. Regelmäßige Inspektion der Zähne ist wichtig - beschädigte oder abgenutzte Bereiche sollten umgehend repariert oder ersetzt werden. Bei der Reinigung ist Vorsicht geboten: Aggressive Reinigungsmittel können die Oberfläche angreifen. Verwenden Sie milde, pH-neutrale Reiniger und trocknen Sie die Instrumente sorgfältig ab. Eine ordnungsgemäße Pflege verlängert die Lebensdauer erheblich und gewährleistet optimale Arbeitsergebnisse.",
      date: "1. März 2024",
      imageUrl: "/raspatorien-lagerung-pflege-dental.png",
      imageAlt: "Fachgerechte Lagerung und Pflege von Raspatorien - Schärfservice Hartmann Expertenberatung"
    },
    {
      title: "Wann sollte geschärft werden?",
      excerpt: "Anzeichen erkennen und den optimalen Zeitpunkt für eine professionelle Schärfung bestimmen. Faustregel: Nach 20-30 Behandlungen professionell schärfen lassen.",
      fullText: "Die rechtzeitige Schärfung Ihrer Dentalinstrumente ist entscheidend für deren Effektivität. Erste Anzeichen für eine notwendige Schärfung sind: verminderte Schneidleistung, erhöhter Kraftaufwand bei der Anwendung und sichtbare Abnutzungsspuren. Bei Scaler und Kürretten sollten Sie auf eine glatte, scharfe Schneide achten - stumpfe Instrumente können das Gewebe traumatisieren. Als Faustregel gilt: Instrumente sollten nach 20-30 Behandlungen geschärft werden, abhängig von der Intensität der Nutzung. Regelmäßige Kontrolle mit einer Lupe hilft dabei, den optimalen Zeitpunkt zu bestimmen. Eine professionelle Schärfung durch Experten gewährleistet nicht nur die richtige Schärfe, sondern auch die Beibehaltung der korrekten Winkel und Formen. Investieren Sie in regelmäßige Wartung - es lohnt sich für Ihre Praxis und Ihre Patienten.",
      date: "22. Februar 2024",
      imageUrl: "/schaerfservice-werkstatt-berlin.jpg",
      imageAlt: "Wann sollten Dentalinstrumente geschärft werden - Schärfservice Hartmann Berlin Expertentipps"
    }
  ];

  return (
    <>
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
      
      {/* Bewertungen Schema für SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Schärfservice Hartmann",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "450",
              "bestRating": "5",
              "worstRating": "1"
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
                "reviewBody": "Seit Jahren zufriedener Kunde. Professionelle Beratung und beste Ergebnisse."
              }
            ]
          })
        }}
      />
      
      {/* Blog-Posts Schema für SEO */}
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
              "datePublished": "2024-03-15", // Beispieldatum
              "author": {
                "@type": "Person",
                "name": "Carina Hartmann"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Schärfservice Hartmann"
              },
              "image": post.imageUrl,
              "articleBody": post.fullText
            }))
          })
        }}
      />
    
    <div className="container-page space-y-16">
      <section className="surface p-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/schaerfservice-werkstatt-berlin.jpg" 
            alt="Schärfservice Hartmann Werkstatt in Berlin - Professionelle Instrumentenschärfung für dentale und chirurgische Instrumente" 
            fill
            className="object-cover opacity-100 scale-x-[-1]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/35 to-transparent" />
        </div>
        <div className="relative z-10 text-left">
          <Badge className="mb-6">Über<span className="text-[var(--color-blue-600)]">20</span>Jahre Erfahrung</Badge>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4 text-white">
            Langlebige <span className="text-[var(--color-blue-500)] drop-shadow-sm">Schärfe</span><br />durch <span className="text-[var(--color-blue-500)] drop-shadow-sm">Expertise</span>
          </h1>
            <p className="text-white text-lg max-w-2xl">
              Handgeschärft mit höchster Präzision.<br />
              Wir schärfen dentale & chirurgische 
              Instrumente
            </p>
          <div className="mt-8 flex items-center gap-3">
            <Button 
              href="/schaerfauftrag" 
              hover="lift"
              onClick={() => analytics.buttonClick('schaerfauftrag_hero', 'homepage')}
            >
              Schärfauftrag starten
            </Button>
            <a 
              href="/schaerfkurse" 
              onClick={() => analytics.buttonClick('schaerfkurse_hero', 'homepage')}
              className="inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 bg-white text-[var(--color-blue-600)] hover:bg-gray-100 hover:-translate-y-0.5 px-4 py-2"
            >
              Schärfkurse ansehen
            </a>
          </div>
        </div>
      </section>

      <section>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {title:"450+",subtitle:"Zufriedene Kunden"},
            {title:"10.000+",subtitle:"Instrumente geschärft"},
            {title:"20 Jahre",subtitle:"Erfahrung"}
          ].map((item) => (
            <div key={item.title} className="text-center">
              <GradientText className="text-3xl sm:text-4xl">
                {item.title}
              </GradientText>
              <div className="mt-1 text-lg text-gray-600 leading-relaxed">{item.subtitle}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Präzision trifft auf Innovation - Neue Sektion */}
      <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <InnovationHeading 
            subtitle="Mit modernster Technologie und handwerklicher Expertise schaffen wir die perfekte Balance zwischen Tradition und Innovation."
          />

          {/* Content mit vertikaler Linie */}
          <div className="relative">
            {/* Animierte Linienfüllung - Ende immer mittig zum Viewport */}
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-[var(--color-blue-600)] to-[var(--color-blue-600)] transition-all duration-300 ease-out"
              style={{
                height: (() => {
                  if (typeof window !== 'undefined' && sectionRef.current) {
                    const sectionTop = sectionRef.current.offsetTop;
                    const sectionHeight = sectionRef.current.offsetHeight;
                    const viewportAnchor = scrollY + window.innerHeight * 0.4; // etwas höher als Mitte
                    const progress = Math.max(0, Math.min(1, (viewportAnchor - sectionTop) / sectionHeight));
                    // Maximal bis zum Ende des 3. Textes füllen
                    const lastTextPercent = (() => {
                      if (h3Ref.current) {
                        const h3Container = h3Ref.current.closest('.group');
                        if (h3Container) {
                          const containerRect = h3Container.getBoundingClientRect();
                          const containerAbsBottom = containerRect.bottom + window.scrollY;
                          // Zusätzlicher Abstand für bessere visuelle Trennung
                          const extraMargin = 20;
                          return Math.max(0, Math.min(1, (containerAbsBottom + extraMargin - sectionTop) / sectionHeight));
                        }
                        // Fallback: Ende der Überschrift
                        const lastHeaderRect = h3Ref.current.getBoundingClientRect();
                        const lastHeaderAbsTop = lastHeaderRect.top + window.scrollY;
                        return Math.max(0, Math.min(1, (lastHeaderAbsTop - sectionTop) / sectionHeight));
                      }
                      return 0.85; // Fallback
                    })();
                    const clamped = Math.min(progress, lastTextPercent);
                    return `${clamped * 100}%`;
                  }
                  return '0%';
                })(),
                top: (() => {
                  if (typeof window !== 'undefined' && sectionRef.current) {
                    const sectionTop = sectionRef.current.offsetTop;
                    const sectionHeight = sectionRef.current.offsetHeight;
                    const viewportAnchor = scrollY + window.innerHeight * 0.4; // etwas höher als Mitte
                    const progress = Math.max(0, Math.min(1, (viewportAnchor - sectionTop) / sectionHeight));

                    // Höhe der Füllung (bereits begrenzt über lastTextPercent in height)
                    const fillHeight = progress * sectionHeight;

                    // End-Position: auf Viewport-Anker, jedoch nicht unterhalb des Kurs-Buttons
                    const lastTextPercent = (() => {
                      if (h3Ref.current) {
                        const h3Container = h3Ref.current.closest('.group');
                        if (h3Container) {
                          const containerRect = h3Container.getBoundingClientRect();
                          const containerAbsBottom = containerRect.bottom + window.scrollY;
                          const extraMargin = 20;
                          return Math.max(0, Math.min(1, (containerAbsBottom + extraMargin - sectionTop) / sectionHeight));
                        }
                        const lastHeaderRect = h3Ref.current.getBoundingClientRect();
                        const lastHeaderAbsTop = lastHeaderRect.top + window.scrollY;
                        return Math.max(0, Math.min(1, (lastHeaderAbsTop - sectionTop) / sectionHeight));
                      }
                      return 0.85;
                    })();

                    const endPositionViewport = viewportAnchor - sectionTop;
                    const endPositionMax = lastTextPercent * sectionHeight;
                    const endPosition = Math.min(endPositionViewport, endPositionMax);

                    const topPosition = Math.max(0, endPosition - fillHeight);
                    return `${topPosition}px`;
                  }
                  return '0px';
                })()
              }}
            ></div>
            
            {/* Icons entfernt */}

            {/* Content Items - Links-Rechts-Links Layout */}
            <div className="space-y-24">
              {/* 1. Instrumenten schärfen - Links */}
              <div className="flex items-center">
                <div className="w-1/2 pr-16">
                  <div className="group text-left">
                    <h3 ref={h1Ref} className="text-2xl font-medium mb-4 text-gray-900">Instrumenten schärfen</h3>
                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                      Professionelle Schärfung aller dentalen und chirurgischen Instrumente. 
                      Höchste Qualität für optimale Behandlungsergebnisse durch präzise Handarbeit.
                    </p>
                    <Button href="/schaerfauftrag" className="bg-[var(--color-blue-600)] text-white hover:bg-[var(--color-blue-700)]" hover="lift">
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
                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                      Wir kommen zu Ihnen in die Praxis und gehen erst, wenn alle Instrumente
                      ihre ursprüngliche Schärfe wiedererlangt haben.
                    </p>
                    <Button href="/kontakt" className="bg-[var(--color-blue-600)] text-white hover:bg-[var(--color-blue-700)]" hover="lift">
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
                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                      Lernen Sie die richtige Schärftechnik. 
                      Professionelle Schulungen für Praxisteams und Einzelpersonen mit zertifizierter Expertise.
                    </p>
                    <Button href="/schaerfkurse" className="bg-[var(--color-blue-600)] text-white hover:bg-[var(--color-blue-700)]" hover="lift">
                      Kurse entdecken
                    </Button>
                  </div>
                </div>
                <div className="w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Unsere Philosophie</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              h:"Qualifiziert", 
              p:"Neben über 20-jähriger Erfahrung wurden wir als eine der wenigen Firmen im deutschsprachigen Raum direkt bei Hu-Friedy in Chicago in Instrumentenkunde und der Technik des Schärfens von Instrumenten ausgebildet. Diese Expertise garantiert höchste Qualitätsstandards.", 
              icon: (
                <svg className="w-8 h-8 text-[var(--color-blue-600)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              )
            },
            {
              h:"Langlebig", 
              p:"Durch präzise Schärfung und fachgerechte Pflege verlängern wir die Nutzungsdauer hochwertiger Dentalinstrumente – nachhaltig und wirtschaftlich sinnvoll. Unsere Arbeit sorgt für langanhaltende Schärfe und reduziert den Bedarf an Neuanschaffungen erheblich.", 
              icon: (
                <svg className="w-8 h-8 text-[var(--color-blue-600)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )
            },
            {
              h:"Umweltbewusst", 
              p:"Alle Bearbeitungsprozesse abseits des Versands laufen emissionsfrei und ausschließlich mit Strom aus erneuerbaren Energien. Zusätzlich werden alle Aufträge nur mit recycelten Kartons verpackt. Nachhaltigkeit steht im Mittelpunkt unserer Arbeitsweise.", 
              icon: (
                <svg className="w-8 h-8 text-[var(--color-blue-600)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )
            },
          ].map((f) => (
            <Card 
              key={f.h} 
              className="hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.2),0_10px_10px_-5px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition-all duration-200"
              title={
                <div className="flex items-center gap-3">
                  {f.icon}
                  <span>{f.h}</span>
                </div>
              }
            >
              <p className="text-neutral-600">{f.p}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--color-blue-600)] to-[var(--color-blue-400)] flex items-center justify-center">
              <span className="text-4xl text-white font-semibold">CH</span>
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-semibold mb-2">Carina Hartmann</h2>
            <p className="text-lg text-[var(--color-blue-600)] mb-4">Ihre Ansprechpartnerin</p>
            <p className="text-neutral-600 leading-relaxed">
              Als zertifizierte Schärftechnikerin mit über 20 Jahren Erfahrung in der Dentalbranche 
              stehe ich Ihnen mit meinem Fachwissen zur Seite. Meine Ausbildung bei Hu-Friedy in 
              Chicago und die jahrelange Praxis garantieren Ihnen höchste Qualität und 
              Langlebigkeit Ihrer Instrumente.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
              <Button href="/kontakt" hover="lift">Kontakt aufnehmen</Button>
              <Button variant="outline" href="/schaerfauftrag" hover="lift">Auftrag starten</Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-left flex items-center gap-2">
          <span>Was unsere Kunden sagen 4,8/5</span>
          <svg className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545L10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0z"/>
          </svg>
          <span></span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              text: "Hervorragende Qualität und schnelle Bearbeitung. Unsere Instrumente sind wie neu.",
              author: "Verifizierter Auftraggeber",
              practice: "Zahnarztpraxis München"
            },
            {
              text: "Seit Jahren zufriedener Kunde. Professionelle Beratung und beste Ergebnisse.",
              author: "Verifizierter Auftraggeber",
              practice: "Zahnklinik Hamburg"
            },
            {
              text: "Zuverlässig, präzise und fair im Preis. Kann ich nur weiterempfehlen.",
              author: "Verifizierter Auftraggeber",
              practice: "Praxis für Oralchirurgie"
            },
            {
              text: "Die Schärfung verlängert die Lebensdauer unserer Instrumente erheblich.",
              author: "Verifizierter Auftraggeber",
              practice: "Zahnarztpraxis Berlin"
            }
          ].map((review, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">
                "{review.text}"
              </p>
              <div className="border-t border-gray-100 pt-4">
                <p className="font-semibold text-gray-900 text-sm">{review.author}</p>
                <p className="text-gray-500 text-xs">{review.practice}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative">
        <h2 className="text-2xl font-semibold mb-6">Blog & Tipps</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post, index) => (
            <Card 
              key={index} 
              className={`hover:shadow-lg transition-all duration-300 ${
                expandedCard === index ? 'opacity-30' : ''
              }`}
              imageUrl={post.imageUrl}
              imageAlt={post.imageAlt}
            >
              <div className="text-sm text-[var(--color-blue-600)] mb-2">{post.date}</div>
              <h3 className="font-semibold mb-2 text-lg">{post.title}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <div className="flex gap-2 mt-4">
                <Button 
                  className="flex-1 bg-[var(--color-blue-600)] text-white hover:bg-[var(--color-blue-700)]"
                  hover="lift-sm"
                  onClick={() => toggleCard(index)}
                >
                  {expandedCard === index ? "Weniger anzeigen" : "Weiterlesen"}
                </Button>
                <Button 
                  className="px-3 bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  hover="lift-sm"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: post.title,
                        text: post.excerpt,
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link wurde in die Zwischenablage kopiert!');
                    }
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Overlay für erweiterte Karte */}
        {expandedCard !== null && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              {/* X Button im Apple-Stil */}
              <button
                onClick={() => setExpandedCard(null)}
                className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 z-10"
                aria-label="Schließen"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-600"
                >
                  <path
                    d="M9 3L3 9M3 3L9 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              
              <Card className="border-0 shadow-none">
                <div className="text-sm text-[var(--color-blue-600)] mb-2">
                  {blogPosts[expandedCard].date}
                </div>
                <h3 className="font-semibold mb-2 text-lg">
                  {blogPosts[expandedCard].title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                  {blogPosts[expandedCard].excerpt}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {blogPosts[expandedCard].fullText}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400">Schärfservice Hartmann</p>
                </div>
              </Card>
            </div>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Häufig gestellte Fragen</h2>
        <div className="max-w-4xl mx-auto">
          <FAQ
            items={faqItems}
          />
        </div>
      </section>
    </div>
    </>
  );
}
