import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen",
  description: "AGB von Schärfservice Hartmann. Geltungsbereich, Vertragsschluss, Leistungen, Preise, Haftung und Gewährleistung für Instrumentenschärfung.",
  robots: {
    index: true,
    follow: false,
  },
};

export default function AgbPage() {
  const agbSections = [
    {
      number: "1",
      title: "Geltungsbereich",
      content: "Diese AGB gelten für alle Leistungen des Schärfservice Hartmann gegenüber Verbraucher:innen und Unternehmer:innen."
    },
    {
      number: "2", 
      title: "Vertragsschluss",
      content: "Der Vertrag kommt durch Auftragserteilung (z. B. Übergabe/Versand der Ware) und Auftragsbestätigung zustande."
    },
    {
      number: "3",
      title: "Leistungen", 
      content: "Wir erbringen Schärf- und Instandsetzungsarbeiten nach bestem Wissen und Stand der Technik."
    },
    {
      number: "4",
      title: "Preise und Zahlung",
      content: "Es gelten die zum Zeitpunkt der Auftragserteilung ausgewiesenen Preise. Zahlung bei Abholung oder nach Rechnungserhalt."
    },
    {
      number: "5",
      title: "Haftung",
      content: "Für Schäden haften wir nur bei Vorsatz und grober Fahrlässigkeit. Bei leichten Fahrlässigkeit hafteten wir nur für Kardinalpflichten."
    },
    {
      number: "6",
      title: "Gewährleistung",
      content: "Es gelten die gesetzlichen Gewährleistungsrechte. Beanstandungen sind unverzüglich mitzuteilen."
    },
    {
      number: "7",
      title: "Versand/Risiko",
      content: "Beim Versand trägt der/die Auftraggeber:in das Transportrisiko, sofern nicht anders vereinbart."
    },
    {
      number: "8",
      title: "Schlussbestimmungen",
      content: "Es gilt deutsches Recht. Gerichtsstand ist – soweit zulässig – der Sitz des Unternehmens."
    }
  ];

  return (
    <div className="container-page py-16">
      <div className="max-w-4xl mx-auto">
        <div className="surface p-8">
          <h1 className="text-3xl font-semibold mb-8 text-center">Allgemeine Geschäftsbedingungen</h1>
          
          <div className="space-y-6">
            {agbSections.map((section) => (
              <div key={section.number} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[var(--color-blue-600)] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {section.number}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold mb-2 text-[var(--color-blue-600)]">
                      {section.title}
                    </h2>
                    <p className="text-neutral-600 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


