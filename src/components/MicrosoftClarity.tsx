"use client";

import Script from 'next/script';
import { useEffect, useState } from 'react';

interface MicrosoftClarityProps {
  projectId: string;
}

export function MicrosoftClarity({ projectId }: MicrosoftClarityProps) {
  const [hasConsent, setHasConsent] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Cookie-Präferenzen prüfen
    const checkConsent = () => {
      const cookieConsent = localStorage.getItem('cookie-consent');
      if (cookieConsent) {
        try {
          const preferences = JSON.parse(cookieConsent);
          setHasConsent(preferences.analytics === true);
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

    setIsInitialized(true);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cookie-consent-changed', handleCookieChange);
    };
  }, []);

  if (!projectId || projectId === 'YOUR_CLARITY_PROJECT_ID') {
    return null;
  }

  // Clarity wird nur geladen wenn Consent erteilt wurde
  if (!isInitialized || !hasConsent) {
    return null;
  }

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${projectId}");
      `}
    </Script>
  );
}
