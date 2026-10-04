export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  fullText: string;
  date: string;
  imageUrl: string;
  imageAlt: string;
  downloadImages?: Array<string | { url: string; name: string }>;
  previewImages?: string[];
  downloadPdfs?: Array<{ url: string; name: string }>;
};

export const blogPosts: BlogPost[] = [
  {
    id: "reinigung-dentalinstrumente",
    title: "Richtige Reinigung von Dentalinstrumenten",
    excerpt: "Dentalinstrumente richtig reinigen, Korrosion vermeiden und ihre Lebensdauer zuverlässig verlängern.",
    fullText: "Die Reinigung von Dentalinstrumenten ist der erste und wichtigste Schritt in der Aufbereitung. Nach jeder Behandlung sollten die Instrumente sofort unter fließendem Wasser abgespült werden, um Blut und Speichel zu entfernen. Anschließend ist eine gründliche Reinigung mittels Ultraschallbad, mit speziellen Reinigungsmitteln und Benutzung des Thermodesinfektors erforderlich. Verwenden Sie milde, pH-neutrale Reiniger. Achten Sie darauf, dass alle Oberflächen erreicht werden, besonders bei komplexen Instrumenten wie Scharnierinstrumenten. Nach der Reinigung sollten die Instrumente vollständig getrocknet werden, um Korrosion zu vermeiden. Eine ordnungsgemäße Reinigung verlängert nicht nur die Lebensdauer Ihrer Instrumente, sondern gewährleistet auch die Patientensicherheit.",
    date: "15. März 2024",
    imageUrl: "/dental-schere-schaerfwinkel-berlin.jpg",
    imageAlt: "Optimaler Schleifwinkel bei Dentalscheren - professioneller Schleifservice Hartmann",
    previewImages: ["/20260115_101012.jpg"],
    downloadPdfs: [
      { url: "/Scherenprobleme.pdf", name: "häufige Scherenprobleme" }
    ],
  },
  {
    id: "schaerfwinkel-scaler-kueretten",
    title: "Schleifwinkel bei Scalern und Küretten",
    excerpt: "Korrekter Schleifwinkel erhält Schärfe und Funktion von Scalern und Küretten. Darauf kommt es an.",
    fullText: "Der Schleifwinkel ist bei Dentalinstrumenten entscheidend für volle Schärfe und Funktion. Bei Scalern und Küretten liegt der optimale Winkel zwischen 70 und 80 Grad. Ein zu flacher Winkel reduziert die Schärfe, während ein zu steiler Winkel die Schneide zu dünn macht und Bruchgefahr besteht. Das fachgerechte Schleifen erfolgt in mehreren Schritten: Zuerst wird die Schneide mit einem groben Schleifstein vorbereitet, anschließend mit einem feineren Stein bearbeitet. Wichtig ist, den ursprünglichen Schleifwinkel beizubehalten und gleichmäßig zu arbeiten. Regelmäßige Kontrolle mit einer Lupe hilft, Unebenheiten zu erkennen und zu korrigieren. Professionell geschärfte Instrumente ermöglichen präzise und effiziente Behandlungen.",
    date: "8. März 2024",
    imageUrl: "/kueretten.webp",
    imageAlt: "Schleifwinkel bei Scalern und Küretten - professioneller Schleifservice Hartmann",
    downloadImages: [
      { url: "/Scalerplatte.jpeg", name: "Scaler" },
      { url: "/Kuerettenplatte.jpeg", name: "Küretten" }
    ],
  },
  {
    id: "lagerung-pflege-raspatorien",
    title: "Lagerung & Pflege von Präzisionsinstrumenten",
    excerpt: "Präzisionsinstrumente richtig lagern, schonend pflegen und dauerhaft funktionsfähig halten.",
    fullText: "Präzisionsinstrumente benötigen besondere Aufmerksamkeit bei der Lagerung und Pflege. Nach der Reinigung sollten sie einzeln in speziellen Halterungen oder Trays aufbewahrt werden. Die Lagerung sollte an einem trockenen, staubfreien Ort erfolgen. Bei der Reinigung ist Vorsicht geboten: Aggressive Reinigungsmittel können die Oberfläche angreifen. Verwenden Sie milde, pH-neutrale Reiniger und trocknen Sie die Instrumente sorgfältig ab. Eine ordnungsgemäße Pflege verlängert die Lebensdauer erheblich und gewährleistet optimale Arbeitsergebnisse.",
    date: "1. März 2024",
    imageUrl: "/dentalinstrumente-kassette-schaerfung.jpg",
    imageAlt: "Lagerung und Pflege von Präzisionsinstrumenten - Schärfservice Hartmann Berlin",
  },
  {
    id: "wann-geschaerft-werden",
    title: "Wann sollte geschärft werden?",
    excerpt: "Stumpfe Instrumente früh erkennen und zum richtigen Zeitpunkt professionell schärfen lassen.",
    fullText: "Dentalinstrumente rechtzeitig schärfen zu lassen ist entscheidend für deren Effektivität. Erste Anzeichen sind verminderte Schneidleistung, erhöhter Kraftaufwand und sichtbare Abnutzung. Bei Scalern und Küretten sollten Sie auf eine glatte, scharfe Schneide achten – stumpfe Instrumente können das Gewebe traumatisieren. Als Faustregel gilt: Instrumente sollten abhängig von der Nutzungsintensität geschärft werden. Regelmäßige Kontrolle mit einer Lupe hilft, den optimalen Zeitpunkt zu bestimmen. Professioneller Schleifservice stellt Schärfe wieder her und bewahrt korrekte Winkel und Formen. Regelmäßige Wartung lohnt sich für Praxis und Patienten.",
    date: "22. Februar 2024",
    imageUrl: "/3 spitzen.JPG",
    imageAlt: "Wann sollten Dentalinstrumente geschärft werden - Schärfservice Hartmann Berlin Expertentipps",
  },
];
