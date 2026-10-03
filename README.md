# Open PMU API

Open PMU API est une API publique permettant d’interroger des résultats structurés de courses hippiques et les données associées.

**Site web :** [open-pmu-api.vercel.app](https://open-pmu-api.vercel.app/)
**Endpoint :** `GET https://open-pmu-api.vercel.app/api/arrivees`

## Données

* **Période des données :** 22/01/2004 au 29/09/2026
* **Dernière mise à jour :** 03/10/2026

## Utiliser l’API

Utilisez une requête `GET` avec l’un des paramètres suivants :

| Paramètre | Description                                                | Exemple                     |
| --------- | ---------------------------------------------------------- | --------------------------- |
| `date`    | Date de la course au format mois/jour/année (`MM/DD/YYYY`) | `09/29/2026`                |
| `hippo`   | Nom de l’hippodrome                                        | `Chantilly`                 |
| `prix`    | Nom du prix                                                | `PRIX DE LA CHAMBRE DU DUC` |

### Exemples

**Par date**

```bash
GET https://open-pmu-api.vercel.app/api/arrivees?date=09%2F29%2F2026
```

**Par hippodrome**

```bash
GET https://open-pmu-api.vercel.app/api/arrivees?hippo=Chantilly
```

**Par prix**

```bash
GET https://open-pmu-api.vercel.app/api/arrivees?prix=PRIX%20DE%20LA%20CHAMBRE%20DU%20DUC
```

## Réponse

La réponse contient les champs suivants :

* `error` : `false` lorsqu’une ou plusieurs courses sont renvoyées, `true` lorsque la recherche n’aboutit pas.
* `total` : nombre de courses renvoyées.
* `message` : tableau contenant les courses lorsque la recherche aboutit, ou message décrivant le résultat de la recherche.

### Exemple de réponse

L’exemple ci-dessous correspond à la réponse réelle renvoyée par la requête documentée :

```bash
GET https://open-pmu-api.vercel.app/api/arrivees?prix=PRIX%20DE%20LA%20CHAMBRE%20DU%20DUC
```

```JSON
{
  "error": false,
  "total": 1,
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

Les champs disponibles dépendent des informations associées à chaque course. Ils peuvent notamment inclure l’hippodrome, la date, le prix, la distance, les partants et non-partants, l’arrivée officielle, ainsi que les informations détaillées sur les chevaux, jockeys, entraîneurs, cotes, gains, corde, discipline et musique.

## Limites et disponibilité

L’endpoint ne publie actuellement ni limite de débit, ni contrat de pagination, ni garantie de disponibilité.

Une recherche par hippodrome ou par prix peut renvoyer plusieurs courses et la taille de la réponse peut varier. Pour des analyses en volume, évitez les requêtes larges répétées.

Les requêtes simples sont accessibles sans clé API ; cela ne constitue pas une garantie d’utilisation illimitée ni un engagement de service.

## Installation et déploiement

L’API est déployée sous forme de fonction serverless Vercel et utilise PostgreSQL. Pour exécuter ou déployer votre propre instance :

1. Clonez le dépôt et installez les dépendances :

   ```sh
   git clone https://github.com/nanaelie/open-pmu-api.git
   cd open-pmu-api
   npm ci
   ```

2. Configurez `DB_URL` dans votre environnement local ou de déploiement avec une URL de connexion PostgreSQL.

   La connexion utilise TLS avec vérification du certificat. Votre serveur PostgreSQL doit donc fournir un certificat reconnu par l’environnement Node.js utilisé par votre instance.

   Ne commitez pas d’identifiants et ne les incluez pas dans le code client.

3. Lancez le projet localement avec la CLI Vercel :

   ```sh
   vercel dev
   ```

   ou déployez-le sur Vercel avec :

   ```sh
   vercel
   ```

Le dépôt public ne contient ni base de données ni identifiants. Votre instance PostgreSQL doit fournir le schéma et les données attendus par l’API.

## Licence

Le code de l’API publique est sous licence [MIT](./LICENSE).

Cette licence concerne le code du projet et ne confère aucun droit particulier sur les données de courses.
