"""Bilder in /public umbenennen, verkleinern und mit Urheber-Metadaten versehen.

Schreibt EXIF (Artist, Copyright, ImageDescription) und XMP (IPTC-Felder für
Creator, Credit Line, Copyright Notice, Web Statement), die Google Bilder als
„Credit/Copyright“ anzeigt. Für neue Bilder einfach einen Eintrag in IMAGES
ergänzen und `python3 scripts/brand-images.py` ausführen.
"""

from pathlib import Path
from xml.sax.saxutils import escape

from PIL import Image

PUBLIC = Path(__file__).resolve().parent.parent / "public"

CREATOR = "Schärfservice Hartmann"
CREDIT = "Schärfservice Hartmann · dentalschleifen.de"
COPYRIGHT = "© 2026 Schärfservice Hartmann, dentalschleifen.de. Alle Rechte vorbehalten."
SITE = "https://www.dentalschleifen.de"
EMAIL = "hartmann-schaerfservice@web.de"
MAX_EDGE = 2000

# (alte Datei, neue Datei, Beschreibung, verkleinern?, KI-generiert?)
IMAGES = [
    ("schleifen bild.JPG", "kuerette-schleifplatte-handschliff-schaerfservice-hartmann.jpg",
     "Kürette wird im Handschliff auf einer Schleifplatte geschärft", True, False),
    ("schleifenblau.png", "scaler-schleifplatte-handschliff-schaerfservice-hartmann.jpg",
     "Scaler wird im Handschliff auf einer Schleifplatte geschärft", True, False),
    ("3 spitzen.JPG", "dentalinstrumente-geschaerft-schaerfservice-hartmann.jpg",
     "Frisch geschärfte Dentalinstrumente in Nahaufnahme", True, False),
    ("schaerfservice-werkstatt-berlin.jpg", "kueretten-scaler-geschaerft-schaerfservice-hartmann.jpg",
     "Geschärfte Küretten und Scaler in Nahaufnahme", True, False),
    ("dental-schere-schaerfwinkel-berlin.jpg", "dentale-chirurgische-schere-schaerfen-schaerfservice-hartmann.jpg",
     "Chirurgische Dental-Schere mit Goldgriff nach dem Schärfen", True, False),
    ("dentalinstrumente-kassette-schaerfung.jpg", "dentalinstrumente-sterilkassette-schaerfservice-hartmann.jpg",
     "Geschärfte Dentalinstrumente in einer Sterilkassette", True, False),
    ("schaerfkursbild.png", "schaerfkurs-zahnarztpraxis-schaerfservice-hartmann.jpg",
     "Schärfkurs in der Zahnarztpraxis: Instrumente selbst schärfen lernen", True, True),
    ("20260115_101012.jpg", "instrumentenpflege-produkte-schaerfservice-hartmann.jpg",
     "Pflegeprodukte für die Reinigung von Dentalinstrumenten", True, False),
    ("Scalerplatte.jpeg", "schleifschablone-scaler-schaerfservice-hartmann.jpg",
     "Schleifschablone für Scaler zum Ausdrucken", False, False),
    ("Kuerettenplatte.jpeg", "schleifschablone-kueretten-schaerfservice-hartmann.jpg",
     "Schleifschablone für Küretten zum Ausdrucken", False, False),
    ("scaler.webp", "scaler-schaerfen-lassen-schaerfservice-hartmann.webp",
     "Dental-Scaler mit geriffeltem Griff in Nahaufnahme", False, False),
    ("kueretten.webp", "kueretten-schaerfen-lassen-schaerfservice-hartmann.webp",
     "Dental-Küretten mit farbigen Kennringen in Nahaufnahme", False, False),
]


def build_xmp(description: str, ai_generated: bool) -> bytes:
    d, c, r, cr = (escape(s) for s in (description, CREATOR, COPYRIGHT, CREDIT))
    source = (
        '<Iptc4xmpExt:DigitalSourceType>http://cv.iptc.org/newscodes/digitalsourcetype/'
        'trainedAlgorithmicMedia</Iptc4xmpExt:DigitalSourceType>'
        if ai_generated else ""
    )
    return f"""<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
 <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about=""
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"
    xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/"
    xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/"
    xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/"
    xmlns:plus="http://ns.useplus.org/ldf/xmp/1.0/"
    photoshop:Credit="{cr}"
    xmpRights:Marked="True"
    xmpRights:WebStatement="{SITE}/impressum">
   <dc:creator><rdf:Seq><rdf:li>{c}</rdf:li></rdf:Seq></dc:creator>
   <dc:rights><rdf:Alt><rdf:li xml:lang="x-default">{r}</rdf:li></rdf:Alt></dc:rights>
   <dc:description><rdf:Alt><rdf:li xml:lang="x-default">{d}</rdf:li></rdf:Alt></dc:description>
   <Iptc4xmpCore:CreatorContactInfo rdf:parseType="Resource">
    <Iptc4xmpCore:CiUrlWork>{SITE}</Iptc4xmpCore:CiUrlWork>
    <Iptc4xmpCore:CiEmailWork>{EMAIL}</Iptc4xmpCore:CiEmailWork>
   </Iptc4xmpCore:CreatorContactInfo>
   <plus:Licensor><rdf:Seq><rdf:li rdf:parseType="Resource">
    <plus:LicensorName>{c}</plus:LicensorName>
    <plus:LicensorURL>{SITE}/kontakt</plus:LicensorURL>
   </rdf:li></rdf:Seq></plus:Licensor>
   {source}
  </rdf:Description>
 </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>""".encode("utf-8")


def ascii_only(text: str) -> str:
    for umlaut, repl in (("ä", "ae"), ("ö", "oe"), ("ü", "ue"), ("Ä", "Ae"), ("Ö", "Oe"), ("Ü", "Ue"), ("ß", "ss"), ("©", "(c)"), ("·", "-")):
        text = text.replace(umlaut, repl)
    return text.encode("ascii", "ignore").decode()


def process(old: str, new: str, description: str, shrink: bool, ai_generated: bool) -> None:
    src = PUBLIC / old
    if not src.exists():
        print(f"übersprungen (fehlt): {old}")
        return
    with Image.open(src) as im:
        im.load()
        img = im.convert("RGB")
    if shrink and max(img.size) > MAX_EDGE:
        img.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)

    # EXIF-Textfelder sind nur ASCII, Umlaute stehen vollständig im XMP
    exif = Image.Exif()
    exif[0x013B] = ascii_only(CREATOR)      # Artist
    exif[0x8298] = ascii_only(COPYRIGHT)    # Copyright
    exif[0x010E] = ascii_only(description)  # ImageDescription
    xmp = build_xmp(description, ai_generated)

    dst = PUBLIC / new
    if dst.suffix == ".webp":
        img.save(dst, "WEBP", quality=85, exif=exif, xmp=xmp)
    else:
        img.save(dst, "JPEG", quality=85, optimize=True, progressive=True, exif=exif, xmp=xmp)
    if src != dst:
        src.unlink()
    print(f"{old} -> {new} {img.size}")


if __name__ == "__main__":
    for entry in IMAGES:
        process(*entry)
