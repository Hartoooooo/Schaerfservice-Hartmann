'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Prüfen ob Cookie-Banner bereits akzeptiert wurde
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    saveCookiePreferences(allAccepted);
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(necessaryOnly);
    saveCookiePreferences(necessaryOnly);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    saveCookiePreferences(preferences);
    setIsVisible(false);
  };

  const saveCookiePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    
    // Google Analytics Consent Mode aktualisieren (DSGVO-konform)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': prefs.analytics ? 'granted' : 'denied',
        'ad_storage': prefs.marketing ? 'granted' : 'denied',
        'ad_user_data': prefs.marketing ? 'granted' : 'denied',
        'ad_personalization': prefs.marketing ? 'granted' : 'denied',
      });
    }
    
    // Custom Event auslösen für andere Komponenten
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookie-consent-changed', { 
        detail: prefs 
      }));
    }
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Notwendige Cookies können nicht deaktiviert werden
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
      <div className="w-full max-w-2xl pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🍪 Cookie-Einstellungen
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Wir verwenden Cookies, um Ihnen die beste Erfahrung auf unserer Website zu bieten. 
                Einige sind notwendig, andere helfen uns, die Website zu verbessern.
              </p>
            </div>
          </div>

          {/* Cookie-Details */}
          {showDetails && (
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Notwendige Cookies</h4>
                  <p className="text-xs text-gray-500">Für die Grundfunktionen der Website erforderlich</p>
                </div>
                <div className="w-10 h-6 bg-blue-500 rounded-full flex items-center justify-end px-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Analyse-Cookies</h4>
                  <p className="text-xs text-gray-500">Helfen uns zu verstehen, wie Sie unsere Website nutzen</p>
                </div>
                <button
                  onClick={() => togglePreference('analytics')}
                  className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                    preferences.analytics ? 'bg-blue-500 justify-end' : 'bg-gray-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full mx-1"></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Marketing-Cookies</h4>
                  <p className="text-xs text-gray-500">Für personalisierte Werbung und Inhalte</p>
                </div>
                <button
                  onClick={() => togglePreference('marketing')}
                  className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                    preferences.marketing ? 'bg-blue-500 justify-end' : 'bg-gray-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full mx-1"></div>
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleAcceptNecessary}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Nur notwendige
            </button>
            
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
            >
              {showDetails ? 'Weniger anzeigen' : 'Einstellungen'}
            </button>
            
            <button
              onClick={showDetails ? handleSavePreferences : handleAcceptAll}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
            >
              {showDetails ? 'Speichern' : 'Alle akzeptieren'}
            </button>
          </div>

          {/* Datenschutz Link */}
          <div className="text-center pt-2">
            <Link 
              href="/datenschutz" 
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Datenschutzerklärung
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
