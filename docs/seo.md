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

> **Bemærk:** produktet har mærket «Sidste chance». Skal sengeranden udgå, er
> det spildt arbejde at skubbe den op. Så bør «sengerand»-trafikken i stedet
> sendes videre til sengeslangen.

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

### Tyngdedyne baby

**Tyngdedyne til baby – støjsvag, uden polyester**

Vores tyngdedyne til baby er resultatet af mere end 7 års arbejde med
tyngdeprodukter og babysøvn. Mange forældre oplever, at et let, jævnt tryk
hjælper den lille krop til at falde til ro ved puttetid.

Dynen er fyldt med kapok og små glasperler. Kapokken gør den blød og
temperaturregulerende, så dynen giver tyngde uden at give varme. Glasperlerne
er syet ind i kvadrater, så vægten fordeler sig jævnt, og dynen er
forbavsende støjsvag. Det betyder noget for det sensitive barn.

**Fra hvilken alder?**
Anbefalet fra 6 måneder og op til ca. 2 år. **[TJEK]** Til større børn findes
[Tyngdedyne Junior](/products/tyngdedyne-junior).

**Hvor tung er den?**
70 × 100 cm og ca. 1,5 kg. **[TJEK: vægt]** Brug altid dynen under opsyn, og
læg den aldrig over barnets ansigt.

**Hvordan kommer vi i gang?**
Start roligt. Lad barnet ligge med dynen over benene i sofaen eller ved
puttetid i 20–30 minutter, og øg derefter. Mange bruger dynen som overgang fra
svøb: lidt mindre svøb og lidt mere dyne over nogle dage.

**Kan den bruges i barnevognen?**
Ja. Fordi den ikke varmer, er den god til lurene ude, også om sommeren.
Er der brug for mere varme, lægges en almindelig dyne ovenpå.

**Hvad er forskellen på tyngdedyne, kugledyne og kædedyne?**
Se vores [guide til de forskellige tyngdedyner](/blogs/bloggen/hvad-er-forskellen-pa-kugledyner-tyngdedyner-granulatdyner-og-kaededyner),
eller læs [søvnjordemoderens tanker om tyngdedyner](/blogs/bloggen/sovnjordemoderens-tanker-om-tyngdedyner-til-smaborn).

**Vask:** **[TJEK: vaskeanvisning]**

### Tyngdedyne Junior

**Tyngdedyne til børn fra 1 år – kapok og glasperler**

Tyngdedyne Junior er lavet til de aktive år, hvor kroppen har svært ved at
slappe af efter en lang dag. Mange forældre oplever, at tyngden hjælper barnet
til at ligge stille, og så kommer søvnen lettere.

Dynen er fyldt med kapok og små glasperler, der er syet ind i kvadrater. Den er
blød, støjsvag og temperaturregulerende, så barnet får tyngden uden at blive
for varmt. Den er 100 % fri for polyester.

**Fra hvilken alder?**
Fra ca. 12 måneder og op til 5 år. **[TJEK]** Til de helt små findes
[Tyngdedyne baby](/products/tyngdedyne-baby), og til større børn og voksne
[Tyngdedyne voksen](/products/tyngdedyne-voksen).

**Størrelse og vægt**
100 × 140 cm, ca. **[TJEK: vægt]** kg. Passer til en juniorseng og kan
kombineres med [juniorsengetøj](/products/sengetoj-junior).

**Hvornår gør den en forskel?**
Fx ved overtræthed, i perioder med udviklingsspring eller når barnet skal
vænne sig til at sove i eget værelse. Læs [7 situationer, hvor tyngdedynen
kan gøre en forskel](/blogs/bloggen/7-situationer-hvor-tyngdedynen-kan-gore-en-forskel).

**Vask:** **[TJEK: vaskeanvisning]**

## Udkast: links fra populære artikler til produkter

Hver artikel får én naturlig sætning med et link til det produkt, der passer.

| Artikel (søgeord med mange visninger) | Link til |
|---|---|
| Guide til night terror (night terror børn, 2.154) | Tyngdedyne Junior |
| Overtræt baby (overtræt nyfødt, baby overtræt) | Tyngdedyne baby |
| Hvornår lærer jeg mit barn at sove på eget værelse | Tyngdedyne Junior og Sengeslange |
| Må baby sove på siden? | Sengerand |
| Kapok – alt du skal vide (hvad er kapok, 612) | Tyngdedyne baby og Sengerand |
| Pakkeliste til sommerferie (pakkeliste baby ferie) | Sengeslange og Tyngdedyne baby |

## Det, temaet ikke kan klare

- **Indhold:** Google belønner sider, der svarer bedst på det, folk søger. Journalen er det stærkeste værktøj — én grundig artikel pr. søgeord og links til produktet.
- **Links udefra:** omtale fra bloggere, sundhedsplejersker og medier, der linker til lalatoto.dk.
- **Google Search Console:** send sitemap (`https://www.lalatoto.dk/sitemap.xml`) og hold øje med, hvilke søgninger siderne vises på.
- **Anmeldelser:** stjerner i Googles resultater kræver en anmeldelses-app, der skriver `aggregateRating` til produktet.
