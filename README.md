# Opettajan Node/express palvelinesimerkki + demo client

monorepo-haara demonstroi clientin ja serverin kehitystä ja käyttöönottoa yhden yhteisen repositorion taktiikalla.

Muut palvelinesimerkit löytyvät tämän repon eri haaroista (branch).

Kansiorakenne tässä esimerkissä on yksinkertaistettuna seuraavan kaltainen:

```dir
.
├── hyte-web-client
│   ├── package.json
│   └── src
├── server 
│   ├── package.json
│   ├── public # folder for built web client
│   └── src
├── test
│   ├── # e2e tests
├── package.json
└── README.md
``` 

Client ja server ovat erillisiä projekteja omissa kansioissaan, mutta samassa repositoriossa. Niitä voidaan siis kehittää ja edelleen myös erikseen.

Pääkansion `package.json`:ssa määritellään skriptit ja riippuvuudet, joilla voidaan hallita molempia projekteja yhdessä:

- `dev`-skripti käynnistää sekä clientin että serverin kehityspalvelimet samanaikaisesti concurrently-kirjaston avulla.
- `build-client`-skripti asentaa riippuvuudet, rakentaa clientin ja siirtää sen dist-kansion sisällön serverin (tyhjennttyyn) public-kansioon, josta se voidaan tarjoilla backend-palvelimen kautta.
- `deploy`-skripti ajaa `build-client`-skriptin, asentaa serverin riippuvuudet tuotantoversiona ja käynnistää serverin pm2:lla nimellä "hyte-server".

## Käyttöönotto palvelimella

1. Ota ssh-yhteys palvelimeen ja varmista, että palvelimella on asennettuna Node.js, npm, pm2, MariaDB ja Apache kurssin ohjeiden mukaisesti.
1. Kloonaa repository palvelimelle: `git clone <repository-url> && cd <repository-folder>` ja valitse oikea haara (branch) `git checkout monorepo`.
1. Luo tietokanta (tarvittavat skriptit `server/db/`-kansiossa).
1. Aseta ympäristömuuttujat:
    - kopioi server-kansion `.env.sample`-tiedosto ja nimeä se uudestaan `.env`:ksi `cp server/.env.example server/.env` ja muokkaa arvot vastaamaan palvelinympäristöä esim. nano-editorilla: `nano server/.env`
    - kopioi client-kansion `.env.sample`-tiedosto vastaavasti `.env.local`-tiedostoksi, ja päivitä apin osoite oikean palvelimen url-osoitteeksi
1. Buildaa ja käynnistä: `npm run deploy` 
