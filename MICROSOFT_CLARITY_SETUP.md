# Microsoft Clarity Setup Anleitung

Diese Anleitung beschreibt, wie Microsoft Clarity für das Tracking von Nutzerinteraktionen auf der Website integriert wurde.

## ✅ Was wurde implementiert?

- **MicrosoftClarity Komponente** (`src/components/MicrosoftClarity.tsx`)
- Integration in das Haupt-Layout (`src/app/layout.tsx`)
- DSGVO-konforme Consent-Verwaltung
- Nur laden wenn Nutzer Analytics-Cookies akzeptiert hat

## 📋 Voraussetzungen

1. Microsoft Clarity Account erstellen
2. Project ID erhalten

## 🔧 Setup-Schritte

### 1. Microsoft Clarity Account erstellen

1. Gehen Sie zu [Microsoft Clarity](https://clarity.microsoft.com/)
2. Melden Sie sich mit Ihrem Microsoft-Konto an
3. Erstellen Sie ein neues Projekt für Ihre Website

### 2. Project ID finden

1. Im Clarity Dashboard, wählen Sie Ihr Projekt aus
2. Gehen Sie zu **Settings** (Einstellungen)
3. Kopieren Sie die **Project ID**

### 3. Umgebungsvariable hinzufügen

Fügen Sie die Project ID zu Ihrer `.env.local` Datei hinzu:

```bash
# Microsoft Clarity
NEXT_PUBLIC_CLARITY_PROJECT_ID=ihre_project_id_hier
```

**Wichtig:** Ersetzen Sie `ihre_project_id_hier` mit Ihrer tatsächlichen Project ID.

### 4. Build & Deployment

Die Anwendung wird automatisch mit Clarity funktionieren, sobald:
- Die Umgebungsvariable gesetzt ist
- Der Nutzer Analytics-Cookies akzeptiert hat

## 🔒 DSGVO & Datenschutz

### Consent-Management

Clarity wird **nur geladen**, wenn:
- Der Nutzer explizit Analytics-Cookies akzeptiert hat
- Die Cookie-Präferenzen als `analytics: true` gespeichert sind

### Was wird getrackt?

Microsoft Clarity trackt:
- Seitenaufrufe
- Klick-Events
- Scroll-Verhalten
- Heatmaps
- Session Recordings (kann in Clarity Settings deaktiviert werden)

### Datenverarbeitung

- Daten werden von Microsoft verarbeitet
- Serverstandort: Microsoft Azure (siehe Microsoft Datenschutzerklärung)
- Speicherdauer: Gemäß Microsoft Clarity Richtlinien
- IP-Anonymisierung: Wird von Microsoft durchgeführt

## 📊 Features

### Session Recordings
Visualisiert, wie Nutzer mit Ihrer Website interagieren.

### Heatmaps
Zeigt, wo Nutzer klicken und scrollen.

### Insights
Identifiziert frustrierende Nutzererfahrungen und Verbesserungspotenziale.

## 🛠️ Deaktivierung

### Temporär
Entfernen Sie die Umgebungsvariable oder setzen Sie sie auf einen leeren Wert:

```bash
NEXT_PUBLIC_CLARITY_PROJECT_ID=
```

### Permanently
Entfernen Sie in `src/app/layout.tsx`:
- Den Import: `import { MicrosoftClarity } from "@/components/MicrosoftClarity";`
- Die Komponente: `{clarityId && <MicrosoftClarity projectId={clarityId} />}`

## 📝 Hinweis für Datenschutzerklärung

Aktualisieren Sie Ihre Datenschutzerklärung (`src/app/datenschutz/page.tsx`) um:

- Microsoft Clarity als Tracking-Tool zu erwähnen
- Zweck der Datenerhebung zu erklären
- Hinweis auf opt-out Möglichkeit zu geben
- Link zu Microsoft Clarity Privacy Policy: https://clarity.microsoft.com/faq

## 🧪 Testing

### Lokales Testing

1. Starten Sie den Development Server:
```bash
npm run dev
```

2. Öffnen Sie die Browser DevTools (F12)
3. Navigieren Sie zu Console
4. Sie sollten sehen: "Microsoft Clarity script loaded" (wenn enabled)

### Production Testing

1. Besuchen Sie Ihre Live-Website
2. Akzeptieren Sie Analytics-Cookies
3. Öffnen Sie Clarity Dashboard nach ca. 5 Minuten
4. Es sollten erste Daten erscheinen

## 📚 Weitere Ressourcen

- [Microsoft Clarity Documentation](https://learn.microsoft.com/en-us/clarity/)
- [Clarity Privacy FAQ](https://clarity.microsoft.com/faq)
- [Clarity Best Practices](https://learn.microsoft.com/en-us/clarity/practice-guide/how-to-read-clarity-recordings)

## 🆘 Troubleshooting

### Clarity lädt nicht

**Problem:** Clarity wird nicht geladen
- **Lösung:** Prüfen Sie die Umgebungsvariable `NEXT_PUBLIC_CLARITY_PROJECT_ID`
- **Lösung:** Stellen Sie sicher, dass der Nutzer Analytics-Cookies akzeptiert hat

### Keine Daten im Dashboard

**Problem:** Keine Daten im Clarity Dashboard
- **Lösung:** Warten Sie 5-10 Minuten (Datenupdate)
- **Lösung:** Prüfen Sie ob Session Recordings in Settings aktiviert sind

### Performance-Issues

**Problem:** Website lädt langsam
- **Lösung:** Clarity lädt asynchron und blockiert nicht das Rendering
- **Lösung:** Wenn Probleme auftreten, Session Recordings in Settings deaktivieren

## ✅ Checkliste

- [ ] Microsoft Clarity Account erstellt
- [ ] Project ID erhalten
- [ ] `.env.local` mit Project ID konfiguriert
- [ ] Datenschutzerklärung aktualisiert
- [ ] Clarity funktioniert in Development
- [ ] Clarity funktioniert in Production
- [ ] First Dashboard Data erhalten
