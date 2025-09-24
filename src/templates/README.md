# EmailJS HTML-Template für Schärfauftrag

## 📧 Ultra-cleanes E-Mail-Template im Schaerfservice-Design

Dieses professionelle HTML-Template wurde speziell für den Schaerfservice-Schärfauftrag entwickelt und enthält alle erforderlichen Variablen für eine vollständige Auftragsübersicht.

## 🎨 Design-Features

### **Apple-inspiriertes Design:**
- Minimalistisches, cleanes Layout
- Schaerfservice-Farbschema (Blau-Töne)
- Moderne Typografie und Spacing
- Professionelle Gradients und Schatten

### **Responsive Design:**
- Optimiert für alle E-Mail-Clients
- Mobile-first Ansatz
- Flexible Grid-Layouts
- Skalierbare Schriftgrößen

### **Strukturierte Bereiche:**
1. **Header** - Blauer Gradient mit Auftragsinformationen
2. **Kontaktdaten** - Übersichtliches Grid-Layout
3. **Instrumentenliste** - Monospace-Darstellung mit Preisen
4. **Preisberechnung** - Detaillierte Kostenaufstellung
5. **Besondere Wünsche** - Hervorgehobene Kundennotizen
6. **Einverständniserklärungen** - Status-Badges
7. **Nächste Schritte** - Nummerierte Checkliste
8. **Footer** - Kontaktinformationen

## 🔧 Verwendung in EmailJS

### **1. Template erstellen:**
1. Gehen Sie zu [EmailJS](https://www.emailjs.com/)
2. Erstellen Sie ein neues HTML-Template
3. Kopieren Sie den kompletten Inhalt aus `email-template.html`
4. Fügen Sie ihn als HTML-Body ein

### **2. Template-Einstellungen:**
```
Template Name: schaerfauftrag_template
Subject: Neuer Schärfauftrag von {{praxisname}}
Body: [HTML-Inhalt aus email-template.html]
```

### **3. Alle verfügbaren Variablen:**

#### **Kontaktdaten:**
- `{{praxisname}}` - Name der Praxis
- `{{ansprechpartner}}` - Kontaktperson
- `{{email}}` - E-Mail-Adresse
- `{{telefon}}` - Telefonnummer
- `{{full_address}}` - Vollständige Adresse (Straße, PLZ, Ort)

#### **Auftragsdaten:**
- `{{order_date}}` - Bestelldatum (DD.MM.YYYY)
- `{{order_time}}` - Bestellzeit (HH:MM:SS)
- `{{total_quantity}}` - Gesamtanzahl Instrumente

#### **Instrumente & Preise:**
- `{{instruments_list}}` - Formatierte Liste aller Instrumente mit Preisen
- `{{subtotal}}` - Zwischensumme (formatiert als Währung)
- `{{shipping}}` - Versandkosten (5,90€)
- `{{total_net}}` - Nettobetrag
- `{{vat}}` - Mehrwertsteuer (19%)
- `{{total_gross}}` - Gesamtbetrag brutto
- `{{discount_info}}` - Rabattinformation (7% oder 15%)

#### **Zusätzliche Informationen:**
- `{{nachricht}}` - Kundennotiz/Besondere Wünsche
- `{{widerrufsrecht_accepted}}` - Widerrufsrecht bestätigt (Ja/Nein)
- `{{agb_accepted}}` - AGB akzeptiert (Ja/Nein)

## 🎯 Beispiel-Ausgabe

Die E-Mail wird automatisch generiert mit:
- **Professionellem Header** mit Schaerfservice-Branding
- **Strukturierter Kontaktübersicht** in Grid-Layout
- **Detaillierter Instrumentenliste** mit Einzelpreisen
- **Übersichtlicher Preiskalkulation** mit Rabatten
- **Hervorgehobenen Kundennotizen**
- **Status der Einverständniserklärungen**
- **Schritt-für-Schritt Bearbeitungsablauf**

## 📱 E-Mail-Client Kompatibilität

Getestet und optimiert für:
- ✅ Outlook (Desktop & Web)
- ✅ Gmail (Desktop & Mobile)
- ✅ Apple Mail (macOS & iOS)
- ✅ Thunderbird
- ✅ Yahoo Mail
- ✅ Mobile E-Mail-Apps

## 🚀 Integration

Das Template ist bereits vollständig in die Schaerfservice-Anwendung integriert:
- Alle Variablen werden automatisch aus dem Formular gefüllt
- E-Mail wird beim Abschluss des Auftrags (Step 4 → 5) versendet
- Fehlerbehandlung und Loading-States implementiert

## 🎨 Anpassungen

Das Template kann einfach angepasst werden:
- **Farben:** Ändern Sie die CSS-Variablen im `<style>`-Bereich
- **Logo:** Fügen Sie ein Logo-Image in den Header ein
- **Inhalte:** Passen Sie Texte und Struktur nach Bedarf an
- **Styling:** Modifizieren Sie CSS-Klassen für individuelle Gestaltung
