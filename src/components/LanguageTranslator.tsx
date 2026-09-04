"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { englishReplacements, englishTranslations } from "@/lib/englishTranslations";

const TRANSLATABLE_ATTRIBUTES = ["placeholder", "title", "aria-label", "alt"] as const;

function translateValue(value: string): string {
  const leading = value.match(/^\s*/)?.[0] ?? "";
  const trailing = value.match(/\s*$/)?.[0] ?? "";
  const content = value.trim();
  if (!content) return value;

  const exact = englishTranslations[content] ?? content;
  const translated = englishReplacements.reduce(
    (text, [source, target]) => text.split(source).join(target),
    exact,
  );
  const branded = translated
    .replaceAll("Hartmann sharpening service", "Schärfservice Hartmann")
    .replaceAll("Sharpening service Hartmann", "Schärfservice Hartmann");

  return `${leading}${branded}${trailing}`;
}

export function LanguageTranslator() {
  const pathname = usePathname();

  useEffect(() => {
    const isEnglish =
      window.location.pathname === "/en" ||
      window.location.pathname.startsWith("/en/") ||
      document.cookie.includes("site-language=en");
    if (!isEnglish) return;

    document.documentElement.lang = "en";
    document.title = translateValue(document.title);
    let translating = false;

    const translateElement = (element: Element) => {
      for (const attribute of TRANSLATABLE_ATTRIBUTES) {
        const value = element.getAttribute(attribute);
        if (!value) continue;
        const translated = translateValue(value);
        if (translated !== value) element.setAttribute(attribute, translated);
      }

      if (element.matches("a[href]") && !element.hasAttribute("data-no-localize")) {
        const href = element.getAttribute("href");
        if (
          href?.startsWith("/") &&
          !href.startsWith("/en") &&
          !href.startsWith("/_next") &&
          !href.startsWith("/api")
        ) {
          element.setAttribute("href", href === "/" ? "/en" : `/en${href}`);
        }
      }
    };

    const apply = (root: Node) => {
      if (translating) return;
      translating = true;
      document.title = translateValue(document.title);

      if (root.nodeType === Node.TEXT_NODE) {
        const text = root as Text;
        if (!text.parentElement?.closest("script, style")) {
          const translated = translateValue(text.data);
          if (translated !== text.data) text.data = translated;
        }
      } else if (root.nodeType === Node.ELEMENT_NODE) {
        translateElement(root as Element);
      }

      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        if (node.nodeType === Node.TEXT_NODE && !node.parentElement?.closest("script, style")) {
          const text = node as Text;
          const translated = translateValue(text.data);
          if (translated !== text.data) text.data = translated;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          translateElement(node as Element);
        }
      }

      translating = false;
    };

    apply(document.body);
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") apply(mutation.target);
        if (mutation.type === "attributes") apply(mutation.target);
        mutation.addedNodes.forEach(apply);
      }
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: [...TRANSLATABLE_ATTRIBUTES],
      childList: true,
      characterData: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
