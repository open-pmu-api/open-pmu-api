# Open PMU API

Open PMU API est une API REST publique permettant d'interroger des résultats structurés de courses hippiques et les données associées.

**Site web :** https://open-pmu-api.vercel.app/

**Endpoint :** https://open-pmu-api.vercel.app/api/arrivees

## Données

* **Période des données :** 22/01/2004 au 31/10/2026
* **Dernière mise à jour :** 04/11/2026

Les données couvrent les résultats de courses disponibles dans la base associée à l'API.

## Dataset historique complet

L'API publique permet de consulter des résultats à l'aide de requêtes ciblées. Pour les analyses en volume, un dataset historique séparé est également disponible à l'achat.

**[Accéder au dataset PMU 2004–2026](https://naedev.gumroad.com/l/pmu-dataset)**

Le produit comprend des fichiers JSON organisés par année, type de course et hippodrome, ainsi qu'un fichier README décrivant la structure des données et un exemple de démarrage en Python.

Le dataset téléchargeable est un produit distinct : il n'est pas hébergé dans ce dépôt GitHub et n'est pas distribué directement par l'API publique. Consultez sa page de vente pour les détails, les conditions d'utilisation et les informations sur la couverture des données.

## Utiliser l'API

L'API accepte des requêtes `GET` avec l'un des paramètres suivants :

| Paramètre | Description                              | Exemple                     |
| --------- | ---------------------------------------- | --------------------------- |
| `date`    | Date de la course au format `MM/DD/YYYY` | `10/31/2026`                |
| `hippo`   | Nom de l'hippodrome                      | `Chantilly`                 |
| `prix`    | Nom du prix                              | `PRIX DE LA CHAMBRE DU DUC` |

### Par date

```sh
GET https://open-pmu-api.vercel.app/api/arrivees?date=10%2F31%2F2026
```

### Par hippodrome

```sh
GET https://open-pmu-api.vercel.app/api/arrivees?hippo=Chantilly
```

### Par prix

```sh
GET https://open-pmu-api.vercel.app/api/arrivees?prix=PRIX%20DE%20LA%20CHAMBRE%20DU%20DUC
```

## Réponse

La réponse JSON contient les champs suivants :

* `error` : `false` lorsque la recherche aboutit, `true` lorsqu'elle échoue.
* `total` : nombre de courses renvoyées.
* `params` : paramètres utilisés pour effectuer la recherche.
* `message` : tableau contenant les courses lorsque la recherche aboutit, ou message décrivant le résultat de la recherche.

### Exemple de réponse

L'exemple ci-dessous correspond à la réponse réelle de la requête du 31 octobre 2026 :

```json
{
  "error": false,
  "total": 1,
  "params": {
    "date": "10/31/2026"
  },
  "message": [
    {
      "type": "Plat",
      "montant": 52800,
      "distance": 1900,
      "prix": "PRIX DU PAYS DE BRAY",
      "lieu": "Deauville",
      "heure_depart": "15:15:00",
      "details": "PLAT, 1900 metres , PSF , Corde a DROITE 52.800- HANDICAP DIVISE Pour poulains entiers, hongres et pouliches de 3 ans",
      "partants": 16,
      "non_partants": [],
      "arrivee": [
        9,
        11,
        3,
        1,
        5,
        7,
        12
      ],
      "r/c": "R1/C3",
      "date": "2026-10-31",
      "arrivee_details": {
        "3": {
          "nom_cheval": "LOUIZA",
          "sexe": "F",
          "annee_de_naissance": 2023,
          "nom_jockey": "BOUDOT P. C.",
          "nom_entraineur": "DELZANGLES M.",
          "position": 3
        },
        "9": {
          "nom_cheval": "AMIE AMOUR",
          "sexe": "F",
          "annee_de_naissance": 2023,
          "nom_jockey": "GUYON M.",
          "nom_entraineur": "BRANDT (S) P&J.",
          "poids_cheval": 575,
          "musique": "2p 1p 2p 4p 3p 5p 2p (25) 13p",
          "cotes": [
            5.7,
            6.5,
            5.2
          ],
          "gains": 30243,
          "corde": 6,
          "discipline": "Plat",
          "distance": 1900,
          "position": 1
        },
        "11": {
          "nom_cheval": "MISTER BLACK",
          "sexe": "H",
          "annee_de_naissance": 2023,
          "nom_jockey": "LERNER M.",
          "nom_entraineur": "LERNER (S) C&Y.",
          "position": 2
        }
      },
      "statistiques": {
        "nombre_partants": 16,
        "nombre_arrivants": 7,
        "nombre_non_partants": 0,
        "cote_min": 5.2,
        "cote_max": 54,
        "cote_moyenne": 15.49,
        "cote_mediane": 13,
        "favori": {
          "numero": 9,
          "nom_cheval": "AMIE AMOUR",
          "cote": 5.2,
          "position": 1
        },
        "gagnant": {
          "numero": 9,
          "nom_cheval": "AMIE AMOUR",
          "cote": 5.2
        },
        "repartition_positions": {
          "1": 1,
          "2": 1,
          "3": 1,
          "4": 1,
          "5": 1,
          "6": 1,
          "7": 1
        },
        "taux_favori_gagnant": 100,
        "taux_favori_place": 100,
        "ecart_cote_gagnant": 0,
        "ecart_cote_favori": 10.29
      }
    }
  ]
}
```

*Extrait réel de la réponse : les détails des chevaux affichés sont limités aux trois premiers de l'arrivée.*

Les champs disponibles peuvent varier selon les informations associées à chaque course. Une réponse peut notamment contenir :

* les informations générales de la course ;
* l'hippodrome et la date ;
* le prix ;
* la distance et la discipline ;
* le nombre de partants et les non-partants ;
* l'arrivée officielle ;
* les informations détaillées sur les chevaux ;
* les jockeys et entraîneurs ;
* les cotes ;
* les gains ;
* la corde ;
* la musique du cheval ;
* les données historiques disponibles pour l'analyse.

## Limites et disponibilité

L'endpoint ne publie actuellement ni limite de débit, ni contrat de pagination, ni garantie de disponibilité.

Une recherche par hippodrome ou par prix peut renvoyer plusieurs courses et la taille de la réponse peut varier. Pour des analyses en volume, évitez les requêtes larges répétées.

Les requêtes simples sont accessibles sans clé API. Cela ne constitue toutefois pas une garantie d'utilisation illimitée ni un engagement de disponibilité.

## Installation

Clonez le dépôt et installez les dépendances :

```sh
git clone https://github.com/open-pmu-api/open-pmu-api.git
cd open-pmu-api
npm ci
```

Configurez ensuite `DB_URL` dans votre environnement local ou de déploiement avec une URL de connexion PostgreSQL.

La connexion à PostgreSQL utilise TLS avec vérification du certificat. Le serveur PostgreSQL utilisé doit donc fournir un certificat reconnu par l'environnement Node.js de l'instance.

Ne commitez jamais vos identifiants de connexion et ne les incluez pas dans le code client.

## Développement local

L'API est conçue pour être exécutée comme une fonction serverless Vercel.

Pour lancer le projet localement :

```sh
vercel dev
```

Pour déployer votre propre instance :

```sh
vercel
```

Les données et le schéma PostgreSQL ne sont pas inclus dans le dépôt public. Votre instance PostgreSQL doit fournir les tables et les données attendues par l'API.

## Tests

Le projet utilise les tests natifs de Node.js avec `tsx`.

Lancer la suite de tests :

```sh
npm test
```

La suite actuelle comprend 16 tests couvrant notamment :

* la récupération des courses ;
* l'analyse des chevaux ;
* les statistiques de course ;
* l'historique et la forme des chevaux ;
* les non-partants ;
* l'analyse de la musique ;
* les incidents ;
* les statistiques de performance.

## Licence

Le code de l'API publique est distribué sous licence [MIT](./LICENSE).

Cette licence concerne le code du projet et ne confère aucun droit particulier sur les données de courses.
