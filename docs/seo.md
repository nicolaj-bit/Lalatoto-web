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
| uld dyne baby | kommende uld dyne baby (tyngdedyner udgår) |
| uld dyne junior | kommende uld dyne junior |
| uld dyne voksen | kommende uld dyne voksen |
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

## Udkast: produkttekster (ikke lagt ind endnu)

Fra Search Console (sidste 3 måneder) ligger de vigtigste produkt-søgeord på side 2:

| Søgeord | Visninger | Placering | Side |
|---|---|---|---|
| sengerand | 1.577 | 18,1 | /products/sengerand |
| tyngdedyne baby | 999 | 17,2 | /products/tyngdedyne-baby |
| tyngdedyne junior | 914 | 19,1 | /products/tyngdedyne-junior |
| sengerand tremmeseng | 493 | 13,2 | /products/sengerand |
| bedste sengerand | 143 | 9,3 | /products/sengerand |

Teksterne erstatter produktbeskrivelsen og gælder også den nuværende side.
Fakta er hentet fra jeres egne artikler og produktdata. Alt markeret
**[TJEK]** skal bekræftes, før det går live. Der er bevidst ingen løfter om
behandling eller helbred. Den slags må man ikke skrive om produkter, og Google
straffer det også.

### Sengerand

> **På pause:** sengeranden fortsætter, men den nuværende farve udgår og er
> udsolgt. Teksten lægges ind, når det nye design er klar. Mærket «Sidste
> chance» fjernes samtidig.

**Sengerand til tremmeseng med fyld af kapok**

Vi har perfektioneret den klassiske sengerand. Den er fyldt med økologisk
kapok i stedet for skum eller polyester og giver en blød kant hele vejen rundt
i tremmesengen, så dit barn ikke slår sig på tremmerne.

Under sengeranden sidder et ekstra panel af stof, der foldes ind under
madrassen. Det lukker åbningen mellem tremmerne, så små arme og ben ikke
kommer i klemme. Det er den detalje, der adskiller vores sengerand fra de
fleste andre.

**Passer den til min tremmeseng?**
Sengeranden er 360 cm lang og 27 cm høj. Den passer til alle gængse
tremmesenge, fx den klassiske 120 × 60 cm. Er den for lang til jeres seng, kan
enderne blot overlappe.

**Hvordan monteres den?**
Tag madrassen op, bind sengeranden fast på tremmerne, så den sidder stramt,
og læg madrassen tilbage oven på stofpanelet.

**Hvor længe kan den bruges?**
Fra barnet begynder at sove i tremmeseng eller bedside crib. Begynder barnet
at klatre på den, er det tid til at tage den ud. Mange skifter til en
[sengeslange](/products/luksus-sengeslange), når barnet flytter i større seng.

**Hvordan vaskes den?**
Sengeranden tåler ikke maskinvask. Pletter fjernes med mild sæbe og vand.

**Hvorfor kapok?**
Kapok er en let, luftig plantefiber, der lader luften passere og ikke bliver
varm. [Læs mere om kapok](/blogs/bloggen/kapok-alt-du-skal-vide-om-fiberens-egenskaber-og-fordele).

Fås i støvet blå, kakao, sart rosa, karry og fløjl.

### Tyngdedyner udgår

Tyngdedynerne tages ud af sortimentet og afløses af almindelige uld dyner til
baby, junior og voksne. Derfor er der ingen udkast til tyngdedynerne.

**Når uld dynerne er oprettet:**
1. Lav 301-omdirigeringer (Onlinebutik → Navigation → URL-omdirigeringer), så
   Google og gamle links føres videre i stedet for at ramme en 404-side:

   | Gammel adresse | Ny adresse |
   |---|---|
   | /products/tyngdedyne-baby | uld dyne baby |
   | /products/tyngdedyne-junior | uld dyne junior |
   | /products/tyngdedyne-voksen | uld dyne voksen |
   | /products/tyngdedyne-voksen-ekstra-laengde | uld dyne voksen |
   | /collections/tyngdedyner | kollektionen med uld dyner |

2. Nye søgeord at skrive produkttekster til: «uld dyne baby», «babydyne uld»,
   «junior dyne uld», «uld dyne», «uldyne voksen».
3. Meta-teksterne på Gavekort, Produkter til Baby, Produkter til Junior,
   Journal og Om os nævner tyngdedyner. De skiftes til «uld dyner» samme dag,
   som tyngdedynerne tages af.
4. Journalens artikler om tyngdedyner opdateres, så de linker til uld dynerne
   eller til sengeslangen.

## Udkast: links fra populære artikler til produkter

Hver artikel får én naturlig sætning med et link til det produkt, der passer.

| Artikel (søgeord med mange visninger) | Link til |
|---|---|
| Guide til night terror (night terror børn, 2.154) | Uld dyne junior (når den findes) |
| Overtræt baby (overtræt nyfødt, baby overtræt) | Uld dyne baby (når den findes) |
| Hvornår lærer jeg mit barn at sove på eget værelse | Sengeslange |
| Må baby sove på siden? | Sengerand |
| Kapok – alt du skal vide (hvad er kapok, 612) | Sengerand |
| Pakkeliste til sommerferie (pakkeliste baby ferie) | Sengeslange |

## Det, temaet ikke kan klare

- **Indhold:** Google belønner sider, der svarer bedst på det, folk søger. Journalen er det stærkeste værktøj — én grundig artikel pr. søgeord og links til produktet.
- **Links udefra:** omtale fra bloggere, sundhedsplejersker og medier, der linker til lalatoto.dk.
- **Google Search Console:** send sitemap (`https://www.lalatoto.dk/sitemap.xml`) og hold øje med, hvilke søgninger siderne vises på.
- **Anmeldelser:** stjerner i Googles resultater kræver en anmeldelses-app, der skriver `aggregateRating` til produktet.
