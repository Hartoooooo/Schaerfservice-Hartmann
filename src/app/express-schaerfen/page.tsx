"use client";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ExpressSchaerfenPage() {
  const [activeService, setActiveService] = useState<'mobile' | '24h'>('mobile');

  useEffect(() => {
    document.title = "Express Instrumente schärfen Berlin - Vor Ort Service | Schärfservice Hartmann";
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/schaerfservice-werkstatt-berlin.jpg" 
            alt="Express-Schärfservice in Berlin - Mobile Instrumentenschärfung vor Ort"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white" />
        </div>
        
        <Container className="relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Nur in Berlin & Umgebung
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6 text-gray-900">
              Express-Schärfen
              <span className="block text-blue-600">vor Ort</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
              Wir kommen zu Ihnen in die Praxis und schärfen Ihre Instrumente direkt vor Ort. 
              Keine Wartezeiten, keine Versandkosten – nur höchste Qualität und schnelle Bearbeitung.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="/kontakt" 
                className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 text-lg"
                hover="lift"
              >
                Express-Service anfragen
              </Button>
              <Button 
                variant="outline" 
                href="tel:+4903092371278"
                className="px-8 py-3 text-lg"
              >
                Jetzt anrufen
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <SectionHeading 
            subtitle="Die Vorteile unseres Express Schärfservices"
            className="text-center mb-12"
          >
            Warum Express-Schärfen?
          </SectionHeading>
          
          {/* Switch Buttons */}
          <div className="flex justify-center mb-12">
            <div className="relative inline-flex bg-white rounded-full p-1 shadow-sm border border-gray-200">
              {/* Animierter Hintergrund */}
              <div
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-blue-600 rounded-full shadow-md transition-all duration-300 ease-in-out ${
                  activeService === 'mobile' ? 'left-1' : 'left-[calc(50%+2px)]'
                }`}
              />
              
              <button
                onClick={() => setActiveService('mobile')}
                className={`relative z-10 px-8 py-3 rounded-full text-sm font-medium transition-colors duration-300 ${
                  activeService === 'mobile'
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Mobiles Schärfen
              </button>
              <button
                onClick={() => setActiveService('24h')}
                className={`relative z-10 px-8 py-3 rounded-full text-sm font-medium transition-colors duration-300 ${
                  activeService === '24h'
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                24h Schärfservice
              </button>
            </div>
          </div>

          {/* Content basierend auf aktiver Auswahl */}
          <div key={activeService} className="grid md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out">
            {activeService === 'mobile' ? (
              <>
                <Card className="text-center p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Vor Ort Service</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Wir kommen zu Ihnen – keine Wartezeit, keine Versandkosten, kein Verlustrisiko für Ihre wertvollen Instrumente.
                  </p>
                </Card>

                <Card className="text-center p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Sofort einsatzbereit</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Ihre Instrumente werden direkt in Ihrer Praxis geschärft und sind sofort wieder einsatzbereit.
                  </p>
                </Card>

                <Card className="text-center p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Flexible Termine</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Wir richten uns nach Ihrem Zeitplan und kommen zu einem für Sie passenden Termin.
                  </p>
                </Card>
              </>
            ) : (
              <>
                <Card className="text-center p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">24 Stunden Service</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Express-Bearbeitung innerhalb von 24 Stunden. Ihre Instrumente sind schnell wieder einsatzbereit.
                  </p>
                </Card>

                <Card className="text-center p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Express Abholung</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Wir holen die Instrumente ab und kommen am Folgetag vorbei. Berlin & Umkreis. Nur an Werktagen verfügbar.
                  </p>
                </Card>

                <Card className="text-center p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Prioritäts Bearbeitung</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Ihre Instrumente werden mit höchster Priorität bearbeitet und nach 24h zurückgebracht.
                  </p>
                </Card>
              </>
            )}
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <Container>
          <SectionHeading 
            subtitle="Einfacher Ablauf für Ihren Express-Service"
            className="text-center mb-16"
          >
            So funktioniert&apos;s
          </SectionHeading>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Anfrage</h3>
              <p className="text-gray-600 text-sm">
                Kontaktieren Sie uns per Telefon oder E-Mail für einen Termin.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Termin</h3>
              <p className="text-gray-600 text-sm">
                Wir vereinbaren einen passenden Termin für unseren Praxisbesuch.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Schärfung</h3>
              <p className="text-gray-600 text-sm">
                Wir kommen zu Ihnen und schärfen Ihre Instrumente vor Ort.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Fertig</h3>
              <p className="text-gray-600 text-sm">
                Ihre Instrumente sind sofort einsatzbereit – scharf und präzise.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Service Area Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeading 
              subtitle="Unser 24h & vor Ort Schärfservice"
              className="mb-12"
            >
              Service-Gebiet
            </SectionHeading>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Berlin & Umgebung</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    <strong className="text-gray-900">Nur vor Ort Service:</strong> Unser Express-Schärfservice ist verfügbar in Berlin und im Umkreis von 100 km. 
                    Bei größeren Entfernungen beraten wir Sie gerne über alternative Lösungen.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span className="text-gray-700">Berlin (alle Bezirke)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span className="text-gray-700">Potsdam & Umgebung</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span className="text-gray-700">Brandenburg (bis 100 km)</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-100 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">100 km</div>
                  <div className="text-gray-600">Service-Radius</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-6 text-gray-900">
              Bereit für Express-Schärfen?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Kontaktieren Sie uns jetzt für einen Termin. Wir kommen zu Ihnen und 
              sorgen für präzise geschärfte Instrumente in Ihrer Praxis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="/kontakt" 
                className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 text-lg"
                hover="lift"
              >
                Termin vereinbaren
              </Button>
              <Button 
                variant="outline" 
                href="tel:+4903092371278"
                className="px-8 py-3 text-lg"
              >
                +49 30 92371278
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
