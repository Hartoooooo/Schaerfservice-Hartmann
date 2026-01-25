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
};

export const blogPosts: BlogPost[] = [
  {
    id: "reinigung-dentalinstrumente",
    title: "Richtige Reinigung von Dentalinstrumenten",
    excerpt: "Erfahren Sie, wie Sie Ihre Instrumente nach der Behandlung optimal reinigen und vor Korrosion schützen. Wichtige Schritte für die",
    fullText: "Die Reinigung von Dentalinstrumenten ist der erste und wichtigste Schritt in der Aufbereitung. Nach jeder Behandlung sollten die Instrumente sofort unter fließendem Wasser abgespült werden, um Blut und Speichel zu entfernen. Anschließend ist eine gründliche Reinigung mittels Ultraschallbad, mit speziellen Reinigungsmitteln und Benutzung des Thermodesinfektors erforderlich. Verwenden Sie milde, pH-neutrale Reiniger. Achten Sie darauf, dass alle Oberflächen erreicht werden, besonders bei komplexen Instrumenten wie Scharnierinstrumenten. Nach der Reinigung sollten die Instrumente vollständig getrocknet werden, um Korrosion zu vermeiden. Eine ordnungsgemäße Reinigung verlängert nicht nur die Lebensdauer Ihrer Instrumente, sondern gewährleistet auch die Patientensicherheit.",
    date: "15. März 2024",
    imageUrl: "/dental-schere-schaerfwinkel-berlin.jpg",
    imageAlt: "Optimaler Schärfwinkel bei Dentalscheren - Professionelle Schärfung Berlin Schärfservice Hartmann",
    previewImages: ["/20260115_101012.jpg"],
  },
  {
    id: "schaerfwinkel-scaler-kueretten",
    title: "Schärfwinkel bei Scalern und Küretten",
    excerpt: "Warum der korrekte Schärfwinkel entscheidend für die Effektivität Ihrer Instrumente ist. Optimale Winkel zwischen",
    fullText: "Der Schärfwinkel ist bei Dentalinstrumenten von entscheidender Bedeutung für deren Funktionalität. Bei Scalern und Küretten liegt der optimale Winkel zwischen 70 und 80 Grad. Ein zu flacher Winkel reduziert die Schärfe, während ein zu steiler Winkel die Schneide zu dünn macht und Bruchgefahr besteht. Die richtige Schärfung erfolgt in mehreren Schritten: Zuerst wird die Schneide mit einem groben Schleifstein vorbereitet, dann mit einem feineren Stein nachgeschärft. Wichtig ist dabei, den ursprünglichen Winkel beizubehalten und gleichmäßig zu arbeiten. Regelmäßige Kontrolle mit einer Lupe hilft dabei, Unebenheiten zu erkennen und zu korrigieren. Professionell geschärfte Instrumente sorgen für präzise und effiziente Behandlungen.",
    date: "8. März 2024",
    imageUrl: "/kueretten.webp",
    imageAlt: "Schärfwinkel bei Scalern und Küretten - Professionelle Instrumentenschärfung Schärfservice Hartmann",
    downloadImages: [
      { url: "/Scalerplatte.jpeg", name: "Scaler" },
      { url: "/Kuerettenplatte.jpeg", name: "Küretten" }
    ],
  },
  {
    id: "lagerung-pflege-raspatorien",
    title: "Lagerung & Pflege von Präzisionsinstrumenten",
    excerpt: "Tipps zur ordnungsgemäßen Aufbewahrung und regelmäßigen Wartung Ihrer Präzisionsinstrumente. Schützen Sie die feinen",
    fullText: "Präzisionsinstrumente benötigen besondere Aufmerksamkeit bei der Lagerung und Pflege. Nach der Reinigung sollten sie einzeln in speziellen Halterungen oder Trays aufbewahrt werden. Die Lagerung sollte an einem trockenen, staubfreien Ort erfolgen. Bei der Reinigung ist Vorsicht geboten: Aggressive Reinigungsmittel können die Oberfläche angreifen. Verwenden Sie milde, pH-neutrale Reiniger und trocknen Sie die Instrumente sorgfältig ab. Eine ordnungsgemäße Pflege verlängert die Lebensdauer erheblich und gewährleistet optimale Arbeitsergebnisse.",
    date: "1. März 2024",
    imageUrl: "/dentalinstrumente-kassette-schaerfung.jpg",
    imageAlt: "Lagerung und Pflege von Präzisionsinstrumenten - Schärfservice Hartmann Berlin",
  },
  {
    id: "wann-geschaerft-werden",
    title: "Wann sollte geschärft werden?",
    excerpt: "Anzeichen erkennen und den optimalen Zeitpunkt für eine professionelle Schärfung bestimmen. Faustregel: Abhängig von",
    fullText: "Die rechtzeitige Schärfung Ihrer Dentalinstrumente ist entscheidend für deren Effektivität. Erste Anzeichen für eine notwendige Schärfung sind: verminderte Schneidleistung, erhöhter Kraftaufwand bei der Anwendung und sichtbare Abnutzungsspuren. Bei Scalern und Küretten sollten Sie auf eine glatte, scharfe Schneide achten - stumpfe Instrumente können das Gewebe traumatisieren. Als Faustregel gilt: Instrumente sollten abhängig von der Intensität der Nutzung geschärft werden, regelmäßige Kontrolle mit einer Lupe hilft dabei, den optimalen Zeitpunkt zu bestimmen. Eine professionelle Schärfung durch Experten gewährleistet nicht nur die richtige Schärfe, sondern auch die Beibehaltung der korrekten Winkel und Formen. Investieren Sie in regelmäßige Wartung - es lohnt sich für Ihre Praxis und Ihre Patienten.",
    date: "22. Februar 2024",
    imageUrl: "/3 spitzen.JPG",
    imageAlt: "Wann sollten Dentalinstrumente geschärft werden - Schärfservice Hartmann Berlin Expertentipps",
  },
];


