"use client";

import { useEffect } from "react";

export function HeroImagePreload() {
  useEffect(() => {
    // Preload Hero-Bild für schnelles Laden beim ersten Besuch
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = "/schaerfservice-werkstatt-berlin.jpg";
    link.setAttribute("fetchpriority", "high");
    document.head.appendChild(link);

    return () => {
      // Cleanup beim Unmount (normalerweise nicht notwendig, aber guter Praxis)
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return null;
}

