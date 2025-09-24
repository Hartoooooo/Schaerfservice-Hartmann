// EmailJS-Konfiguration für Schärfservice
// Diese Werte müssen in der EmailJS-Konsole (https://www.emailjs.com/) konfiguriert werden

export const EMAILJS_CONFIG = {
  // EmailJS-Konfiguration mit echten IDs
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_8k57qha',
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_k23y2x9', 
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '-CNrMDj1ODX0p1fZH',
};

// HTML E-Mail-Template für EmailJS:
/*
TEMPLATE NAME: schaerfauftrag_template

SUBJECT: Neuer Schärfauftrag von {{praxisname}}

BODY: (HTML)
Kopieren Sie den Inhalt aus src/templates/email-template.html
Das Template enthält alle {{variablen}} und ist vollständig responsive.

WICHTIGE VARIABLEN:
- {{praxisname}} - Name der Praxis
- {{ansprechpartner}} - Kontaktperson
- {{email}} - E-Mail-Adresse
- {{telefon}} - Telefonnummer
- {{full_address}} - Vollständige Adresse
- {{instruments_list}} - Formatierte Liste aller Instrumente
- {{total_quantity}} - Gesamtanzahl Instrumente
- {{subtotal}} - Zwischensumme
- {{shipping}} - Versandkosten
- {{total_net}} - Nettobetrag
- {{vat}} - Mehrwertsteuer
- {{total_gross}} - Gesamtbetrag brutto
- {{discount_info}} - Rabattinformation
- {{nachricht}} - Kundennotiz/Besondere Wünsche
- {{widerrufsrecht_accepted}} - Widerrufsrecht bestätigt
- {{agb_accepted}} - AGB akzeptiert
- {{order_date}} - Bestelldatum
- {{order_time}} - Bestellzeit
*/

// Anleitung zur Einrichtung:
/*
1. Gehen Sie zu https://www.emailjs.com/
2. Erstellen Sie einen Account
3. Fügen Sie einen E-Mail-Service hinzu (z.B. Gmail, Outlook)
4. Erstellen Sie ein E-Mail-Template mit dem obigen Inhalt
5. Kopieren Sie Service ID, Template ID und Public Key
6. Ersetzen Sie die Platzhalter in EMAILJS_CONFIG
7. Testen Sie die Integration
*/
