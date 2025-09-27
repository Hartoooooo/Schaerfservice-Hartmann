'use client';

import { useState, useEffect } from 'react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieManager() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Cookie-Präferenzen aus localStorage laden
    const savedPreferences = localStorage.getItem('cookie-consent');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(parsed);
      } catch (error) {
        console.error('Fehler beim Laden der Cookie-Präferenzen:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Notwendige Cookies können nicht deaktiviert werden
    
    const newPreferences = {
      ...preferences,
      [key]: !preferences[key],
    };
    
    setPreferences(newPreferences);
    savePreferences(newPreferences);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    
    // Google Analytics basierend auf Präferenzen aktivieren/deaktivieren
    if (typeof window !== 'undefined' && window.gtag) {
      if (prefs.analytics) {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: prefs.marketing ? 'granted' : 'denied',
        });
      } else {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
        });
      }
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    savePreferences(allAccepted);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(necessaryOnly);
    savePreferences(necessaryOnly);
  };

  if (!isLoaded) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Cookie-Einstellungen verwalten
        </h3>
        <p className="text-sm text-gray-600">
          Hier können Sie Ihre Cookie-Präferenzen jederzeit anpassen.
        </p>
      </div>

      {/* Cookie-Kategorien */}
      <div className="space-y-4">
        {/* Notwendige Cookies */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">Notwendige Cookies</h4>
              <p className="text-sm text-gray-600">
                Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.
              </p>
            </div>
            <div className="w-12 h-6 bg-blue-500 rounded-full flex items-center justify-end px-1">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Analyse-Cookies */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">Analyse-Cookies</h4>
              <p className="text-sm text-gray-600">
                Helfen uns zu verstehen, wie Sie unsere Website nutzen (Google Analytics).
              </p>
            </div>
            <button
              onClick={() => togglePreference('analytics')}
              className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                preferences.analytics ? 'bg-blue-500 justify-end' : 'bg-gray-300 justify-start'
              }`}
            >
              <div className="w-4 h-4 bg-white rounded-full mx-1"></div>
            </button>
          </div>
        </div>

        {/* Marketing-Cookies */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">Marketing-Cookies</h4>
              <p className="text-sm text-gray-600">
                Für personalisierte Werbung und Inhalte (derzeit nicht verwendet).
              </p>
            </div>
            <button
              onClick={() => togglePreference('marketing')}
              className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                preferences.marketing ? 'bg-blue-500 justify-end' : 'bg-gray-300 justify-start'
              }`}
            >
              <div className="w-4 h-4 bg-white rounded-full mx-1"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Aktions-Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          onClick={acceptNecessary}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
        >
          Nur notwendige akzeptieren
        </button>
        
        <button
          onClick={acceptAll}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
        >
          Alle akzeptieren
        </button>
      </div>

      {/* Status-Info */}
      <div className="text-center pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Ihre Einstellungen werden automatisch gespeichert und sofort angewendet.
        </p>
        {localStorage.getItem('cookie-consent-date') && (
          <p className="text-xs text-gray-400 mt-1">
            Letzte Änderung: {new Date(localStorage.getItem('cookie-consent-date')!).toLocaleDateString('de-DE')}
          </p>
        )}
      </div>
    </div>
  );
}
