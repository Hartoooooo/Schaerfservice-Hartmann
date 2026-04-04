"use client";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import Image from "next/image";
import { useState } from "react";

export default function ExpressSchaerfenContent() {
  const [activeService, setActiveService] = useState<'mobile' | '24h'>('mobile');

  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 pb-14 lg:pb-20 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center text-gray-900 mb-8 lg:mb-10 max-w-4xl mx-auto">
              Express-Schärfservice Berlin
            </h1>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 lg:items-center">
              <div className="text-center lg:text-left lg:min-h-0">
                <p className="text-xl text-gray-600 leading-relaxed mb-4 max-w-2xl mx-auto lg:mx-0">
                  Manchmal ist keine Zeit für tagelange Wartezeit. Volle Terminkalender, ein kurzfristiger Ausfall, eine Lieferung, die nicht kam, und plötzlich fehlen die einsatzbereiten Instrumente. Genau für diese Situationen gibt es unseren Express-Schärfservice.
                </p>
                <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                  In Berlin und einem Umkreis von 75&nbsp;km schärfen wir Ihre Instrumente direkt vor Ort, oder wir holen sie ab und bringen sie innerhalb von 24&nbsp;Stunden frisch geschärft zurück. Kein Versandrisiko, keine Wartezeit.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    href="/kontakt"
                    className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 text-lg"
                    hover="lift"
                  >
                    Express-Service anfragen
                  </Button>
                  <Button
                    variant="outline"
                    href="tel:+493092376694"
                    className="px-8 py-3 text-lg"
                  >
                    Jetzt anrufen
                  </Button>
                </div>
              </div>
              <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[min(420px,52vh)] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <Image
                  src="/dentalinstrumente-kassette-schaerfung.jpg"
                  alt="Lagerung und Pflege von Präzisionsinstrumenten, Schärfservice Hartmann Berlin"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-gray-900">
              Warum Express-Schärfen?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Die Vorteile unseres Express Schärfservices
            </p>
          </div>
          
          {/* Switch Buttons */}
          <div className="flex justify-center mb-12">
            <div className="relative inline-flex bg-white rounded-full p-1 shadow-sm border border-gray-200">
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
                Mobiles Schärfen (ab 75 Instr.)
              </button>
              <button
                onClick={() => setActiveService('24h')}
                className={`relative z-10 px-8 py-3 rounded-full text-sm font-medium transition-colors duration-300 ${
                  activeService === '24h'
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                24h Schärfservice (ab 75 Instr.)
              </button>
            </div>
          </div>

          <div key={activeService} className="grid md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out">
            {activeService === 'mobile' ? (
              <>
                <Card className="text-center p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Vor-Ort-Schärfung in Ihrer Praxis</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Unser Techniker kommt mit dem nötigen Equipment zu Ihnen. Die Instrumente werden direkt bei Ihnen geschärft, ohne Verlustrisiko und ohne Unterbrechung Ihrer Versorgung.
                  </p>
                </Card>

                <Card className="text-center p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Sofort wieder einsatzbereit</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Ihre Instrumente werden direkt in Ihrer Praxis geschärft und sind anschließend sofort nutzbar. Kein Hin- und Herschicken, keine Wartezeit.
                  </p>
                </Card>

                <Card className="text-center p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Flexible Terminplanung</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Kein starres Zeitfenster, wir richten uns nach Ihrem Praxisablauf. Morgens vor der Sprechstunde, mittags in der Pause oder nachmittags nach dem letzten Patienten.
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

      {/* Service Area Section */}
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <h2 className="text-3xl font-semibold mb-4 text-gray-900">
                Service-Gebiet
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Unser 24h &amp; vor Ort Schärfservice
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Berlin & Umgebung</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Unser Express 24h & vor Ort Schärfservice ist verfügbar in Berlin und im Umkreis von 75 km, nur vor Ort Service. 
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
                      <span className="text-gray-700">Brandenburg (bis 75 km)</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-700">
                      <strong>Bis 40 km keine Pauschale</strong>
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-100 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">75 km</div>
                  <div className="text-gray-600">Service-Radius</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4 text-gray-900">
              So funktioniert&apos;s
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Einfacher Ablauf für Ihren Express-Service
            </p>
          </div>
          
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
                Wir kommen in Ihre Praxis: Schärfen vor Ort oder 24h Abhol-/Bringservice
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Fertig</h3>
              <p className="text-gray-600 text-sm">
                Ihre Instrumente sind sofort einsatzbereit, scharf und präzise.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Zielgruppen Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-gray-900">
              Für wen ist der Express-Service geeignet?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Der Express-Schärfservice richtet sich an Praxen, die keine langen Wartezeiten in Kauf nehmen können
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Praxen mit hohem Volumen", text: "Praxen mit vielen Instrumenten und wenig Ausfalltoleranz, bei denen stumpfe Instrumente direkt spürbar werden." },
              { title: "Praxisgemeinschaften", text: "Mehrere Behandler, viele Instrumente: gebündelt aufarbeiten lassen spart Zeit und Fahrtwege." },
              { title: "Chirurgische Praxen & OP-Zentren", text: "Ambulante OP-Zentren mit täglichem Instrumentenbedarf, bei denen jede Stunde zählt." },
              { title: "Kurzfristiger Bedarf", text: "Plötzlich aufgefallen, dass Instrumente stumpf sind? Wir kommen schnell, ohne aufwändige Vorlaufzeit." },
              { title: "Persönliche Übergabe", text: "Für alle, die den Versandweg lieber vermeiden und Instrumente lieber direkt in gute Hände geben." },
              { title: "Express 24h Abhol-Service", text: "Wir holen ab, schärfen über Nacht und liefern am nächsten Werktag zurück, ab 75 Instrumenten." },
            ].map(({ title, text }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4 text-gray-900">
              Express-Termin anfragen
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-3">
              Rufen Sie uns an oder nutzen Sie das Kontaktformular, wir melden uns innerhalb kürzester Zeit und koordinieren alles Weitere direkt mit Ihnen.
            </p>
            <p className="text-gray-500 mb-8 font-medium">
              030&nbsp;92376694 &middot; Montag bis Freitag, Praxiszeiten
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
                href="tel:+493092376694"
                className="px-8 py-3 text-lg"
              >
                030 92376694
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
