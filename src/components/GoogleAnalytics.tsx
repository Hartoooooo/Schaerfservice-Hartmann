"use client";

import Script from 'next/script';

interface GoogleAnalyticsProps {
  measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  if (!measurementId || measurementId === 'YOUR_GA_MEASUREMENT_ID') {
    // Entwicklungsmodus - keine Analytics laden
    return null;
  }

  return (
    <>
      {/* Google Analytics gtag.js */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

// Analytics Helper-Funktionen für Event-Tracking
export const analytics = {
  // Seiten-Aufrufe tracken
  pageView: (url: string, title?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
        page_location: url,
        page_title: title,
      });
    }
  },

  // Events tracken
  event: (action: string, parameters?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, parameters);
    }
  },

  // Formular-Events
  formSubmit: (formName: string, formData?: Record<string, unknown>) => {
    analytics.event('form_submit', {
      form_name: formName,
      ...formData,
    });
  },

  // Button-Klicks
  buttonClick: (buttonName: string, location?: string) => {
    analytics.event('button_click', {
      button_name: buttonName,
      location: location || window.location.pathname,
    });
  },

  // Downloads
  download: (fileName: string, fileType?: string) => {
    analytics.event('file_download', {
      file_name: fileName,
      file_type: fileType,
    });
  },

  // Kontakt-Events
  contact: (method: 'phone' | 'email' | 'form', details?: string) => {
    analytics.event('contact', {
      method,
      details,
    });
  },

  // Google My Business Events
  gmb: {
    // Anruf-Button geklickt
    phoneClick: () => {
      analytics.event('gmb_phone_click', {
        source: 'website',
        business_name: 'Schärfservice Hartmann'
      });
    },
    // Wegbeschreibung angefordert
    directionsClick: () => {
      analytics.event('gmb_directions_click', {
        source: 'website',
        business_name: 'Schärfservice Hartmann'
      });
    },
    // Standort-Info angezeigt
    locationView: () => {
      analytics.event('gmb_location_view', {
        source: 'website',
        address: 'Petershagener Str. 27, 15566 Schöneiche bei Berlin'
      });
    }
  },

  // Schärfauftrag-Events
  schaerfauftrag: (step: string, data?: Record<string, unknown>) => {
    analytics.event('schaerfauftrag', {
      step,
      ...data,
    });
  },

  // Schärfkurs-Events
  schaerfkurs: (action: string, data?: Record<string, unknown>) => {
    analytics.event('schaerfkurs', {
      action,
      ...data,
    });
  },
};

// TypeScript-Deklaration für gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      parameters?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}
