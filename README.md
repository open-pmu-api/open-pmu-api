# open-pmu-api
Une API REST open source pour consulter les arrivées de courses PMU par date, hippodrome ou prix.

Une API REST gratuite et open source pour consulter les **arrivées des courses PMU**, filtrables par **date**, **hippodrome** ou **prix**.

Période des données : du ```22/01/2004``` au ```29/09/2026```  
Dernière mise à jour : ```02/10/2026```

## Fonctionnalités

- Rechercher les arrivées d'une course PMU :
  - par **date**
  - par **nom d'hippodrome**
  - par **nom de prix**

## Utilisation
```http
GET https://open-pmu-api.vercel.app/api/arrivees
```
```
date=MM/JJ/AA
prix=PRIX
hippo=HIPPODROME
```
### Exemples d'appel

```http
GET https://open-pmu-api.vercel.app/api/arrivees?date=09/29/2026
```

```http
GET https://open-pmu-api.vercel.app/api/arrivees?prix=PRIX DE LA CHAMBRE DU DUC
```

```http
GET https://open-pmu-api.vercel.app/api/arrivees?hippo=Chantilly
```

Réponse
```JSON
{
    "error": false,
    "message": [
        {
            "type": "Plat",
            "montant": 50900,
            "distance": 1900,
            "prix": "PRIX DE LA CHAMBRE DU DUC",
            "lieu": "Chantilly",
            "heure_depart": "13:55:00",
            "details": "PLAT, 1900 metres , PSF , Corde a DROITE 50.900- HANDICAP DIVISE Pour chevaux entiers, hongres et juments de 4 ans et au-dessus",
            "partants": 16,
            "non_partants": [0],
            "arrivee": [1, 9, 15, 2, 4],
            "r/c": "R1/C1",
            "arrivee_details": {
                "1": {
                    "nom_cheval": "ANSSIO",
                    "sexe": "H",
                    "annee_de_naissance": 2022,
                    "nom_jockey": "LECOEUVRE C.",
                    "nom_entraineur": "BELLANGER (S) N.",
                    "musique": "2p 2p 3p 5p (25) 1p 2p 1p 5p 11p 1p 1p 4p ",
                    "cotes": [ "9.8", "8.5", "6.1" ],
                    "gains": 78504,
                    "corde": 15,
                    "discipline": "Plat",
                    "distance": 1900
                },
                "2": {
                    "nom_cheval": "ZELORO",
                    "sexe": "H",
                    "annee_de_naissance": 2021,
                    "nom_jockey": "GUYON M.",
                    "nom_entraineur": "BRANDT (S) P&J.",
                    "musique": "2p 6p 1p 4p 4p (25) 2p 1p 7p 5p 8p 16p 14p ",
                    "cotes": [ "4.0", "3.7", "3.3" ],
                    "gains": 91461,
                    "corde": 8,
                    "discipline": "Plat",
                    "distance": 1900
                },
                "4": {
                    "nom_cheval": "CENTRAL PARK WEST",
                    "sexe": "H",
                    "annee_de_naissance": 2018,
                    "nom_jockey": "TRULLIER T.",
                    "nom_entraineur": "PHELIPPON J.",
                    "musique": "3p 1p 12p 10p 5p 15p 2p 4p 1p 1p (25) 9p 3p ",
                    "cotes": [ "17.0", "16.0", "17.0" ],
                    "gains": 383037,
                    "corde": 5,
                    "discipline": "Plat",
                    "distance": 1900
                },
                "9": {
                    "nom_cheval": "PRESA DIRETTA",
                    "sexe": "F",
                    "annee_de_naissance": 2019,
                    "nom_jockey": "LEMAITRE A.",
                    "nom_entraineur": "CARRASCO SANCHEZ A.",
                    "musique": "3p 3p 4p 3p (25) 12p 15p 8p 1p 1p 1p 4p (24) 2p ",
                    "cotes": [ "7.6", "7.7", "8.6" ],
                    "gains": 144978,
                    "corde": 2,
                    "discipline": "Plat",
                    "distance": 1900
                },
                "15": {
                    "nom_cheval": "SPEEDY GREEN",
                    "sexe": "H",
                    "annee_de_naissance": 2022,
                    "nom_jockey": "GROSBOIS CHR.",
                    "nom_entraineur": "BONILLA (S) D.",
                    "musique": "1p 9p 1p 6p 12p 15p 4p 6p 1p 7p (25) 7p 8p ",
                    "cotes": [ "53.0", "50.0", "58.0" ],
                    "gains": 37705,
                    "corde": 16,
                    "discipline": "Plat",
                    "distance": 1900
                }
            },
            "date": "2026-09-29T00:00:00.000Z"
        }
    ]
}
```
