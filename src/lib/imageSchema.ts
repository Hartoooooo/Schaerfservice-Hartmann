const SITE_URL = "https://www.dentalschleifen.de";

/** schema.org ImageObject mit Urheber- und Lizenzangaben (für Google Bilder „Credit/Copyright“) */
export function imageObject(path: string, caption: string) {
  const url = `${SITE_URL}${path}`;
  return {
    "@type": "ImageObject",
    url,
    contentUrl: url,
    caption,
    creator: { "@type": "Organization", name: "Schärfservice Hartmann", url: SITE_URL },
    copyrightHolder: { "@type": "Organization", name: "Schärfservice Hartmann", url: SITE_URL },
    creditText: "Schärfservice Hartmann · dentalschleifen.de",
    copyrightNotice: "© 2026 Schärfservice Hartmann",
    license: `${SITE_URL}/impressum`,
    acquireLicensePage: `${SITE_URL}/kontakt`,
  };
}
