"use client";

import { motion } from "motion/react";

export default function DankePage() {
  return (
    <div className="container-page pt-20 pb-16">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="surface p-8 md:p-12"
          variants={{
            enter: {
              x: '-100%',
              opacity: 0
            },
            center: {
              x: '0%',
              opacity: 1
            }
          }}
          initial="enter"
          animate="center"
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-6">
            Auftrag erfolgreich übermittelt
          </h2>
          
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto relative overflow-visible">
              <svg 
                className="w-8 h-8 text-green-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Vielen Dank für Ihren Auftrag!</h3>
              <p className="text-gray-600 mb-4">
                Ihr Schärfauftrag wurde erfolgreich übermittelt und wird bearbeitet.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 text-left">
              <h4 className="font-medium text-gray-900 mb-3">Nächste Schritte:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-blue-600)] mt-0.5">1.</span>
                  Sie erhalten in Kürze eine Bestätigungs-E-Mail mit allen Details
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-blue-600)] mt-0.5">2.</span>
                  Senden Sie Ihre Instrumente an die angegebene Adresse
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-blue-600)] mt-0.5">3.</span>
                  Wir beginnen sofort nach Erhalt mit der Bearbeitung
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-blue-600)] mt-0.5">4.</span>
                  Ihre geschärften Instrumente werden schnellstmöglich zurückgesendet
                </li>
              </ul>
            </div>
            
            <div className="pt-4">
              <p className="text-sm text-gray-500">
                Bei Fragen erreichen Sie uns unter <a href="mailto:hartmann-schaerfservice@web.de" className="text-[var(--color-blue-600)] hover:underline">hartmann-schaerfservice@web.de</a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
