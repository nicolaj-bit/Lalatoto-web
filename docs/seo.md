# SEO — Lalatoto

## Hvad temaet selv klarer (dev)

- Én h1 pr. side. Logoet er ikke h1 på forsiden, så heroens overskrift er sidens emne.
- Titler uden «Lalatoto» får « – Lalatoto» bagpå.
- Strukturerede data (JSON-LD, den kode Google læser for at forstå siden):
  - Produkt med pris, lager og varianter (Shopifys eget filter).
  - Artikel.
  - Brødkrummer.
  - På forsiden: butikken med navn, CVR, adresse, telefon, e-mail, åbningstider og sociale profiler.
- Canonical og hreflang (da/en) sættes af Shopify.
- Billeder uden alt-tekst får produktets navn. Hero og fuldbreddebillede har et felt til alt-tekst i temaeditoren.

Lighthouse SEO på dev: forside 100 (efter alt-tekst), produkt 100, journal 92 (mangler beskrivelse, se nedenfor).

## Søgeord pr. side

Én side bør eje ét hovedsøgeord. Så konkurrerer siderne ikke med hinanden.

| Søgeord | Side |
|---|---|
| tyngdedyne baby | /products/tyngdedyne-baby |
| tyngdedyne børn | /products/tyngdedyne-junior |
| tyngdedyne voksen | /products/tyngdedyne-voksen |
| tyngdedyne (bredt) | /collections/tyngdedyner |
| sengeslange | /products/luksus-sengeslange |
| sengerand | /products/sengerand |
| økologisk babysengetøj | /products/sengetoj-baby |
| juniorsengetøj | /products/sengetoj-junior |
| tyngdevest børn | /products/tyngdevest |
| uldbamse / bamse i uld | /products/lala-hvalen |
| kapok | journal: «Kapok – alt du skal vide» |
| baby vil ikke sove | journal: «Hvordan får man baby til at sove?» |

## Meta-tekster (lagt ind 30.9.2026)

Titel højst ca. 60 tegn, beskrivelse 120–155 tegn. Teksterne gælder også den nuværende live side.

**Faldgrube:** `productUpdate` og `collectionUpdate` med `seo` overskriver både titel og beskrivelse. Send altid begge felter, ellers bliver det udeladte felt tømt.

### Produkter

| Produkt | Titel | Beskrivelse |
|---|---|---|
| Hvalen LALA | Uldbamse til baby – Hvalen LALA i uld og bomuld \| LALATOTO | Hvalen LALA er fyldt med 100 % uld og syet i OEKO-TEX-certificeret bomuld. Uden polyester og plastik – en blød og tryg ven i børneværelset. |
| Månepuden | Månepude til børneværelset – blød og uden polyester \| LALATOTO | Månepuden er en blød pude til børneværelset, i sengen eller i legehjørnet. Syet i OEKO-TEX-certificeret bomuld og fri for polyester. |
| Betræk til Sengeslange | Betræk til sengeslange i økologisk bomuld \| LALATOTO | Giv sengeslangen et nyt udtryk med et ekstra betræk i OEKO-TEX-certificeret bomuld. Kan tages af og vaskes. Passer til LALATOTO Luksus sengeslange. |
| Betræk til Månepude | Betræk til månepude i bomuld \| LALATOTO | Et ekstra betræk til Månepuden i OEKO-TEX-certificeret bomuld. Nemt at skifte og vaske, så puden altid er frisk. |
| Sengelomme | (behold titel) | Sengelommen hænger på tremmesengen og holder styr på sut, nusseklud og flaske. Blød bomuld uden polyester – dansk design fra LALATOTO. |
| E-bog | (behold titel) | En kærlig guide til et sundt sovemiljø for baby og småbørn. Skrevet af forældre, der selv har stået op om natten. Råd og tjeklister til en tryg soveplads. |
| Gavekort | Gavekort til LALATOTO – giv mere søvn i gave | Står der «mere søvn» på ønskesedlen? Et gavekort til LALATOTO kan bruges på tyngdedyner, sengeslanger, sengetøj og meget mere. |
| Tyngdedyne Junior | Tyngdedyne til børn fra 12 mdr. – uden polyester \| LALATOTO | (behold) |
| Tyngdevest | Tyngdevest til børn – ro i kroppen i dagtimerne \| LALATOTO | (behold) |
| Sengetøj voksen | Sengetøj til voksne i OEKO-TEX bomuld \| LALATOTO | Sov godt i blødt sengetøj af OEKO-TEX-certificeret bomuld. Dansk design i rolige farver, der holder vask efter vask. |
| Sengetøj voksen ekstra længde | Sengetøj til voksne i ekstra længde \| LALATOTO | Sengetøj i ekstra længde til den lange dyne. OEKO-TEX-certificeret bomuld, dansk design og rolige farver. |

### Kollektioner

| Kollektion | Beskrivelse |
|---|---|
| Luksus sengeslange | Sengeslanger med tyngde, der skaber en tryg rede i tremmesengen og på legetæppet. Fyldt med naturmaterialer og helt uden polyester. |
| Produkter til Baby | Alt til babys søvn: tyngdedyne, sengerand, sengeslange og økologisk sengetøj. Dansk design uden polyester, udviklet til tryg og rolig søvn. |
| Produkter til Junior | Søvnprodukter til børn: tyngdedyne, juniorsengetøj og tyngdevest. Dansk design i naturmaterialer, der hjælper kroppen til ro. |
| Tilbehør | Betræk, sengelomme, månepude og andet tilbehør, der gør sovepladsen hyggelig og praktisk. Bomuld uden polyester. |

### Sider og journal

| Side | Beskrivelse |
|---|---|
| Journal (bloggen) | Søvn, hverdag og små råd fra os, der selv har stået op om natten. Læs om babys søvn, tyngdedyner, samsovning og trygge rutiner. |
| Om os | LALATOTO er en lille dansk familievirksomhed, der laver sengetøj, tyngdedyner og tekstiler til de mindste – uden polyester og uden kompromis. |
| Filosofi | Færre ting, valgt med omhu. Læs hvorfor LALATOTO kun bruger naturmaterialer og aldrig polyester i produkter til børns søvn. |
| Materialer | OEKO-TEX-certificeret bomuld, uld og kapok. Se hvilke materialer vi bruger, og hvorfor de er gode mod huden hele natten. |
| Søvnjordemoderens tanker om tyngdedyner | Hvad siger en søvnjordemoder om tyngdedyner til småbørn? Læs hendes erfaringer, råd og hvornår en tyngdedyne kan hjælpe. |

## Det, temaet ikke kan klare

- **Indhold:** Google belønner sider, der svarer bedst på det, folk søger. Journalen er det stærkeste værktøj — én grundig artikel pr. søgeord og links til produktet.
- **Links udefra:** omtale fra bloggere, sundhedsplejersker og medier, der linker til lalatoto.dk.
- **Google Search Console:** send sitemap (`https://www.lalatoto.dk/sitemap.xml`) og hold øje med, hvilke søgninger siderne vises på.
- **Anmeldelser:** stjerner i Googles resultater kræver en anmeldelses-app, der skriver `aggregateRating` til produktet.
