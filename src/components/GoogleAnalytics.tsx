"use client";

import Script from 'next/script';
import { useEffect, useState } from 'react';

interface GoogleAnalyticsProps {
  measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const [hasConsent, setHasConsent] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Consent Mode Standard initialisieren (DSGVO-konform)
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      }
      
      // Default: Alle Tracking-Features verweigert
      gtag('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'wait_for_update': 500
      });
      
      setIsInitialized(true);
    }

    // Cookie-Präferenzen prüfen
    const checkConsent = () => {
      const cookieConsent = localStorage.getItem('cookie-consent');
      if (cookieConsent) {
        try {
          const preferences = JSON.parse(cookieConsent);
          setHasConsent(preferences.analytics === true);
          
          // Consent aktualisieren wenn Präferenzen vorhanden
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('consent', 'update', {
              'analytics_storage': preferences.analytics ? 'granted' : 'denied',
              'ad_storage': preferences.marketing ? 'granted' : 'denied',
              'ad_user_data': preferences.marketing ? 'granted' : 'denied',
              'ad_personalization': preferences.marketing ? 'granted' : 'denied',
            });
          }
        } catch (error) {
          console.error('Fehler beim Lesen der Cookie-Präferenzen:', error);
        }
      }
    };

    checkConsent();

    // Event-Listener für Änderungen der Cookie-Präferenzen
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cookie-consent') {
        checkConsent();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom Event für Cookie-Änderungen innerhalb des gleichen Tabs
    const handleCookieChange = () => {
      checkConsent();
    };
    window.addEventListener('cookie-consent-changed', handleCookieChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cookie-consent-changed', handleCookieChange);
    };
  }, []);

  if (!measurementId || measurementId === 'YOUR_GA_MEASUREMENT_ID') {
    return null;
  }

  return (
    <>
      {/* Google Consent Mode Initialisierung */}
      <Script id="google-consent-mode" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          
          // Default Consent (alle verweigert - DSGVO-konform)
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'wait_for_update': 500
          });
        `}
      </Script>

      {/* Google Analytics wird nur geladen wenn initialisiert */}
      {isInitialized && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              // Google Analytics wird mit Consent Mode konfiguriert
              gtag('config', '${measurementId}', {
                'anonymize_ip': true,
                'cookie_flags': 'SameSite=None;Secure',
                ${hasConsent ? `
                'page_title': document.title,
                'page_location': window.location.href,
                ` : `
                'client_storage': 'none',
                'send_page_view': false
                `}
              });
            `}
          </Script>
        </>
      )}
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

// TypeScript-Deklaration für gtag mit Consent Mode
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'consent' | 'js',
      targetIdOrAction: string | 'default' | 'update' | Date,
      parameters?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}
