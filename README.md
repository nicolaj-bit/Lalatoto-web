# Lalatoto-web

Shopify-temaet til webshoppen **lalatoto.dk** (`lalatoto.myshopify.com`),
drevet af LALATOTO of Denmark ApS.

## Udgangspunkt

Filerne på `main` er hentet med `shopify theme pull --live` den 23. september
2026, uden ændringer:

- **Tema i Shopify:** «Opdateret kopi af Update Prestige Live ny»
  (tema-id 151024959625), som var live på det tidspunkt.
- **Grundtema:** Prestige af Maestrooo, version **10.11.1**
  (fra `config/settings_schema.json`).

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
