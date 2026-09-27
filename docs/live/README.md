# Ændringer i live temaet

Live temaet («Opdateret kopi af Update Prestige Live ny», Prestige 10.11.1) er
ikke koblet til GitHub. Her ligger kopier af det, der er lagt ind i live temaet,
så det kan spores.

## `templates/product.venteliste.json` (27. september 2026)

Ny produktskabelon, som kun LALA Hvalen bruger. Den bygger på Månepudens
skabelon (pris, lagerstatus, størrelsesvalg, Læg i kurv, ønskeskyen og
beskrivelse samt sektionerne «Nej tak til polyester», anmeldelser og relaterede
produkter). Månepudens egne foldeafsnit og tilbud er udeladt.

Lige efter Læg i kurv ligger en Liquid-blok med ventelisten. Den vises i stedet
for Læg i kurv, når den valgte størrelse ikke er på lager, og Prestige
genindlæser selv Liquid-blokke ved variantskift. Tilmeldinger oprettes som
kunder med mærkerne `venteliste`, `venteliste-lala-hvalen` og
`venteliste-lala-hvalen-<størrelse>`. Flueben ved nyhedsbrevet giver
`nyhedsbrev-samtykke`. Teksterne står på dansk direkte i blokken.

Ingen eksisterende filer i live temaet er ændret. Fortrydes ved at sætte hvalens
skabelon tilbage og slette filen i live temaet.
