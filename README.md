# Lalatoto-web

Shopify-temaet til webshoppen **lalatoto.dk** (`lalatoto.myshopify.com`),
drevet af LALATOTO of Denmark ApS.

## `main`: live tema

Filerne på `main` er hentet med `shopify theme pull --live` den 23. september
2026, uden ændringer:

- **Tema i Shopify:** «Opdateret kopi af Update Prestige Live ny»
  (tema-id 151024959625), som var live på det tidspunkt.
- **Grundtema:** Prestige af Maestrooo, version **10.11.1**
  (fra `config/settings_schema.json`).

## `dev`: ren Prestige 11.4.1

`dev` er et **rent Prestige 11.4.1**, hentet fra temaet «Backup live 23 sep»
(tema-id 157405773961) med Maestrooos standardindhold. Det eneste, der er lagt
til, er **Google Tag Manager** (GTM-5S8XWNV7) og **Meta Pixel** i
`layout/theme.liquid`. Det gamle polyfill-script til `es-module-shims.min.js`
er ikke med.

Butikkens egne sektioner, skabeloner, indstillinger og tekster fra live temaet
er **ikke** flyttet med. De ligger stadig på `main` som reference.

## Facit for design

`docs/mockup.html` er det godkendte mockup og facit for design og
opbygning. Åbn den i en browser: den har faner for forside, shop,
produktside, Materialer, Filosofi, Om os, kurv og mobil. Mappen `docs/`
er ikke en del af temaet, og Shopify synkroniserer den ikke.

## Lalatotos tilpasninger oven på Prestige

For at gøre fremtidige Prestige-opdateringer lette er ændringerne samlet få steder:

- **Egne filer:** `assets/lalatoto.css` (bredde, luft, farver på dæmpet tekst og
  streger, skrifter i menu og etiketter, forsidens produktrække),
  `sections/lalatoto-hero.liquid`, `sections/lalatoto-full-image.liquid`,
  `snippets/lalatoto-product-info-modal.liquid` og
  `assets/lalatoto-info-modal.js` (modalen «Fortæl mere»).
  `sections/lalatoto-collection.liquid` (kollektionssiden) og
  `sections/lalatoto-content-page.liquid` (indholdssiderne, skabelonen
  `page.indhold`).
  `sections/lalatoto-app.liquid` (Club No Sleep nederst på forsiden) med
  standardbillederne `assets/lalatoto-app-phone-1.jpg` og `-2.jpg`.
- **Rettet i Prestiges egne filer:**
  - `layout/theme.liquid`: Google Tag Manager, Meta Pixel og indlæsning af
    `lalatoto.css`.
  - `sections/header.liquid`: konto- og login-ikonet er fjernet.
  - `snippets/header-sidebar.liquid`: login er fjernet fra mobilskuffen og
    erstattet af et søgelink.
  - `sections/main-product.liquid` og `snippets/product-info.liquid`: tre
    ekstra blokke (kort beskrivelse, leveringstid, Fortæl mere) og modalen
    uden for Prestiges genindlæsning ved variantskift.
  - `sections/cart-drawer.liquid`: overskriften «Kurv», sum-linje, tekst om
    fragt og knapteksten «Gå til betaling».
  - `locales/da.json`, `en.default.json`, `de.json`: tekster under
    `lalatoto` og «Læg i kurv» på dansk.
- **Indstillinger:** farver, skrifter, header og forside ligger i
  `config/settings_data.json`, `sections/header-group.json` og
  `templates/index.json`.
- **I butikken (ikke i repoet):** menuen «Hovedmenu (dev)» (`hovedmenu-dev`),
  de skjulte sider Materialer, Filosofi og Om os samt tysk som sprog (ikke
  udgivet endnu). Metafelterne på produkter i navnerummet `lalatoto`:
  `kort_beskrivelse`, `leveringstid` og til «Fortæl mere» `materials`,
  `dimensions`, `care`, `safety` og `shipping` (flerlinjet tekst). Et tomt
  felt skjuler afsnittet. «Tyngdedyne baby» har eksempeltekst i dem.

## Hvor rettes hvad

**Temaeditoren** (Onlinebutik → Temaer → Tilpas):

- Forsiden: hero, billede i fuld bredde, Shop-rækken og Club No Sleep.
- Materialer, Filosofi og Om os: hver side har sin egen skabelon
  (`page.materialer`, `page.filosofi`, `page.om-os`) med etiket,
  overskrift, indledning, billede og et afsnit pr. blok.
- Vaskevejledningen (`page.brugervejledning`): ét punkt pr. blok.
- Footeren: nyhedsbrevets tekster, menuer, kontaktoplysninger og
  åbningstider.
- Kollektionssiden: etiketten over overskriften.

**Andre steder i Shopify admin:**

- Handelsbetingelser og privatlivspolitik: Onlinebutik → Sider (skabelonen
  `page.legal`, se `docs/juridisk/README.md`).
- Produkttekster (kort beskrivelse, «Fortæl mere», leveringstid): metafelter
  på produktet.
- Kollektionens overskrift og linje: metafelterne «Overskrift»
  (`lalatoto.heading`) og «Kort linje» (`lalatoto.intro`) på kollektionen.
- Faste småtekster (knapper, ventelisten osv.): sprogfilerne, rettes under
  Temaer → ⋯ → Rediger standardtemaindhold.

**Oversættelser:** tekst skrevet i temaeditoren oversættes i Shopify-appen
Translate & Adapt. Den 28. september 2026 blev alle udfyldte felter oversat
til engelsk og tysk. Retter man den danske tekst, markerer Shopify
oversættelsen som forældet, og den skal opdateres i Translate & Adapt.

Er overskriften på en indholdsside tom, og er der ingen afsnit, hentes
indholdet i stedet fra siden i Shopify (den oprindelige opsætning med `<h2>`
som overskrift og `<h3>` for hvert afsnit).

## Billedstørrelser

Anbefalingerne står også ved hvert billedfelt i temaeditoren. Upload i den
anbefalede størrelse, ikke større: Shopify laver selv mindre udgaver og WebP,
men et for stort originalbillede gør siden langsommere (PageSpeed).

| Hvor | Anbefalet størrelse | Forhold | Højst ca. |
|---|---|---|---|
| Forside, hero | 1600 × 2000 px | 4:5 stående | 400 KB |
| Forside, hero på telefon (valgfrit) | 1200 × 1500 px | 4:5 | 250 KB |
| Billede i fuld bredde | 2400 × 1050 px | 16:7 liggende | 500 KB |
| Billede i fuld bredde på telefon (valgfrit) | 1200 × 1500 px | 4:5 | 250 KB |
| Om os, Filosofi, Materialer | 2800 × 1200 px (beskæres til 4:3 på telefon) | 21:9 | 500 KB |
| Club No Sleep-telefonerne | 720 × 1560 px | 9:19,5 | 200 KB |
| Produktbilleder (på produktet) | 1600 × 2000 px | 4:5 stående | 300 KB |

Brug JPG i sRGB, ikke PNG. Fritlagte produktbilleder bør gemmes som JPG med
baggrund i sidens farve. Videoer i produktgalleriet: stående 4:5 eller
kvadratiske.

## Produkter og varianter

Hver vare er ét produkt med varianter (fx Sengetøj med Størrelse × Farve).
Temaet genkender farven på navnet på valgmuligheden: **Farve** (også Color,
Colour, Farbe). Størrelser vises som tekstknapper og farver som prikker.

**Skabeloner** (vælges under «Skabelon» på produktet):

- `product.standard`: de fleste varer. `product.json` er den samme.
- `product.tyngdedyne`: som standard, men «Fortæl mere» har også Vægt og
  Valg af rigtig vægt.
- `product.betraek`: som standard plus et link til den vare, betrækket passer
  til.

**Metafelter på produkter** (navnerum `lalatoto`, alle oprettet):

| Nøgle | Navn | Type | Bruges af |
|---|---|---|---|
| `kort_beskrivelse` | Kort beskrivelse | flerlinjet tekst | alle |
| `leveringstid` | Leveringstid | enkeltlinjet tekst | alle |
| `materials` | Materialer | flerlinjet tekst | alle |
| `dimensions` | Mål | flerlinjet tekst | alle |
| `care` | Vask og pleje | flerlinjet tekst | alle |
| `safety` | Sikkerhed | flerlinjet tekst | alle |
| `shipping` | Levering og retur | flerlinjet tekst | alle |
| `weight` | Vægt | flerlinjet tekst | tyngdedyne |
| `weight_guide` | Valg af rigtig vægt | flerlinjet tekst | tyngdedyne |
| `fits` | Passer til | produktreference | betraek |

**Venteliste:** er den valgte variant ikke på lager, erstattes Læg i kurv af en
venteliste. Tilmeldinger oprettes som kunder med mærkerne `venteliste`,
`venteliste-<produkt>` og `venteliste-<produkt>-<variant>`. Sætter kunden
flueben ved nyhedsbrevet, får kunden også mærket `nyhedsbrev-samtykke`. Kun
de kunder må få nyhedsbrevet.

**Kollektionssiden** viser ét kort per farve i den første tilgængelige
størrelse. Kortets billede er variantens billede. Har varianten intet, bruges
det første billede, hvis alt-tekst indeholder `#Farve_<farve>` (fx
`Sengetøj i sand #Farve_Sand`). Samme alt-tekst får produktsiden til kun at
vise den valgte farves billeder.

## Sådan hænger det sammen

- **Live temaet er ikke koblet til GitHub.** Det, kunderne ser, ændres ikke af
  noget, der sker i dette repo.
- **`main`** er et øjebliksbillede af live temaet, hentet med
  `shopify theme pull` uden ændringer. Der skrives ikke direkte til `main`.
- **`dev`** er koblet til et **udkasttema** i Shopify via GitHub-integrationen.
  Alt arbejde foregår på `dev` eller på grene lavet ud fra `dev`. Det, der
  lander på `dev`, dukker op i udkasttemaet og kan forhåndsvises der.
- Et tema udgives kun i Shopify-admin, af en person, bevidst.

## Kør temaet lokalt

Kræver Node.js og [Shopify CLI](https://shopify.dev/docs/api/shopify-cli):

```sh
npm install -g @shopify/cli
git checkout dev
shopify theme dev --store lalatoto.myshopify.com
```

CLI'en beder dig logge ind i browseren første gang. Den giver en lokal
forhåndsvisning på http://127.0.0.1:9292, der opdateres, mens du retter i
filerne. Den rører ikke live temaet.

Adgangskoder, tokens og Theme Access-nøgler må aldrig committes. De hører til
i `.env` eller CLI'ens login, som begge er holdt ude af repoet i `.gitignore`.
