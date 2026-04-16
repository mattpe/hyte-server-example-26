# Opettajan Node/express palvelinesimerkki + demo client

monorepo-haara demonstroi clientin ja serverin kehitystä ja käyttöönottoa yhden yhteisen repositorion taktiikalla.

Muut esimerkit löytyvät tämän repon eri haaroista (branch).

Kansiorakenne tässä esimerkissä on seuraavan kaltainen:

```dir
.
├── client
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

Pääkansion package.json:ssa määritellään skripti jolla voidaan käynnistää kehityspalvelimet yhdellä komennolla concurrently-kirjaston avulla. Build-skripti tekee clientin dist-kansion ja siirtää sen palvelimen public-kansioon, josta se voidaan tarjoilla backend-palvelimen kautta suoraan käyttöönotossa oikealla palvelimella.

Deploymentissä pitää ennen buildiä muistaa varmistaa, että myös clientin .env-tiedostossa oleva api url on oikein (ei localhost).
