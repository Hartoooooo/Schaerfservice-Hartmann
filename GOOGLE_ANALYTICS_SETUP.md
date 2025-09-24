# 🚀 Google Analytics 4 Setup-Anleitung

## ✅ Bereits vorbereitet:

- ✅ **GoogleAnalytics-Komponente** mit gtag.js Integration
- ✅ **Analytics Helper-Funktionen** für Event-Tracking
- ✅ **Layout-Integration** für automatisches Laden
- ✅ **Event-Tracking** in Formularen und Buttons
- ✅ **TypeScript-Unterstützung** für gtag

## 📋 Was Sie noch tun müssen:

### 1. **Google Analytics 4 Property erstellen**
1. Gehen Sie zu [Google Analytics](https://analytics.google.com/)
2. Erstellen Sie eine neue GA4 Property für `schaerfservice-hartmann.de`
3. Kopieren Sie die **Measurement ID** (Format: `G-XXXXXXXXXX`)

### 2. **Environment Variable setzen**
1. Erstellen Sie eine `.env.local` Datei im Projektordner:
   ```bash
   cp .env.local.example .env.local
   ```

2. Öffnen Sie `.env.local` und ersetzen Sie `YOUR_GA_MEASUREMENT_ID`:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

### 3. **Deployment**
- Fügen Sie die Environment Variable auch in Ihrer Hosting-Plattform hinzu
- Bei Vercel: Settings → Environment Variables
- Bei Netlify: Site Settings → Environment Variables

## 🎯 Was automatisch getrackt wird:

### **Standard-Events:**
- ✅ Seitenaufrufe (automatisch)
- ✅ Session-Dauer (automatisch)
- ✅ Bounce-Rate (automatisch)

### **Custom Events:**
- ✅ **Schärfauftrag-Formular**: Absendungen mit Preisdaten
- ✅ **Schärfkurs-Formular**: Anfragen mit Teilnehmerzahl
- ✅ **Button-Klicks**: Hero-Buttons mit Standort-Info
- ✅ **Navigation**: Wichtige Links und CTAs

### **Business-relevante Metriken:**
- 📊 **Konversions-Tracking**: Formular-Absendungen
- 📊 **Engagement**: Button-Klicks und Interaktionen  
- 📊 **User Journey**: Von Landingpage zu Conversion
- 📊 **ROI-Messung**: Welche Seiten generieren Anfragen

## 🔧 Erweiterte Konfiguration (optional):

### **Google Tag Manager Integration:**
Falls Sie später GTM verwenden möchten, ist die Basis bereits gelegt.

### **E-Commerce Tracking:**
Für zukünftige Online-Buchungen bereits vorbereitet.

### **Custom Dimensions:**
- Formular-Typ (Schärfauftrag vs. Schärfkurs)
- Teilnehmeranzahl bei Kursen
- Preis-Kategorien bei Aufträgen

## 🚀 Nach dem Setup:

1. **Testen**: Öffnen Sie die Website und prüfen Sie in GA4 "Realtime"
2. **Ziele einrichten**: Definieren Sie Conversions in GA4
3. **Dashboard erstellen**: Wichtige KPIs auf einen Blick
4. **Berichte automatisieren**: Wöchentliche/monatliche Reports

## 📞 Support:

Bei Fragen zur Analytics-Integration können Sie die vorbereiteten Helper-Funktionen in `src/components/GoogleAnalytics.tsx` erweitern oder anpassen.

---

**Status: ✅ Produktionsbereit** - Nur noch Measurement ID einfügen!
