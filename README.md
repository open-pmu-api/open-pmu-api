# Open PMU API

Open PMU API est une API REST publique permettant d'interroger des résultats structurés de courses hippiques et les données associées.

**Site web :** https://open-pmu-api.vercel.app/

**Endpoint :** https://open-pmu-api.vercel.app/api/arrivees

## Données

* **Période des données :** 22/01/2004 au 29/09/2026
* **Dernière mise à jour :** 03/10/2026

Les données couvrent les résultats de courses disponibles dans la base associée à l'API.

## Utiliser l'API

L'API accepte des requêtes `GET` avec l'un des paramètres suivants :

| Paramètre | Description                              | Exemple                     |
| --------- | ---------------------------------------- | --------------------------- |
| `date`    | Date de la course au format `MM/DD/YYYY` | `09/29/2026`                |
| `hippo`   | Nom de l'hippodrome                      | `Chantilly`                 |
| `prix`    | Nom du prix                              | `PRIX DE LA CHAMBRE DU DUC` |

### Par date

```sh
GET https://open-pmu-api.vercel.app/api/arrivees?date=09%2F29%2F2026
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

L'exemple ci-dessous correspond à une réponse réelle renvoyée par l'API :

```json
{
  "error": false,
  "total": 1,
  "params": {
    "date": "09/29/2026"
  },
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
      "non_partants": [],
      "arrivee": [1, 9, 15, 2, 4],
      "r/c": "R1/C1",
      "date": "2026-09-29",
      "arrivee_details": {
        "1": {
          "nom_cheval": "ANSSIO",
          "sexe": "H",
          "annee_de_naissance": 2022,
          "nom_jockey": "LECOEUVRE C.",
          "nom_entraineur": "BELLANGER (S) N.",
          "poids_cheval": 600,
          "musique": "2p 2p 3p 5p (25) 1p 2p 1p 5p 11p 1p 1p 4p",
          "cotes": [9.8, 8.5, 6.1],
          "gains": 78504,
          "corde": 15,
          "discipline": "Plat",
          "distance": 1900,
          "position": 1,
          "statistiques": {
            "cote_min": 6.1,
            "cote_max": 9.8,
            "cote_moyenne": 8.13,
            "cote_mediane": 8.5,
            "cote_favorite": false,
            "rang_cote": 2,
            "ecart_cote_moyenne": -9.89,
            "position": 1,
            "est_gagnant": true,
            "est_place": true,
            "musique_analyse": {
              "courses": 12,
              "victoires": 4,
              "places": 8,
              "taux_victoire": 33.33,
              "taux_place": 66.67,
              "incidents": 0,
              "cinq_dernieres": {
                "courses": 5,
                "victoires": 1,
                "places": 4,
                "taux_victoire": 20,
                "taux_place": 80
              },
              "derniere_position": 2
            },
            "musique_forme": {
              "courses": 2,
              "victoires": 0,
              "places": 2,
              "taux_victoire": 0,
              "taux_place": 100
            }
          }
        },
        "2": {
          "nom_cheval": "ZELORO",
          "sexe": "H",
          "annee_de_naissance": 2021,
          "nom_jockey": "GUYON M.",
          "nom_entraineur": "BRANDT (S) P&J.",
          "poids_cheval": 600,
          "musique": "2p 6p 1p 4p 4p (25) 2p 1p 7p 5p 8p 16p 14p",
          "cotes": [4, 3.7, 3.3],
          "gains": 91461,
          "corde": 8,
          "discipline": "Plat",
          "distance": 1900,
          "position": 4,
          "statistiques": {
            "cote_min": 3.3,
            "cote_max": 4,
            "cote_moyenne": 3.67,
            "cote_mediane": 3.7,
            "cote_favorite": true,
            "rang_cote": 1,
            "ecart_cote_moyenne": -14.35,
            "position": 4,
            "est_gagnant": false,
            "est_place": false,
            "musique_analyse": {
              "courses": 12,
              "victoires": 2,
              "places": 4,
              "taux_victoire": 16.67,
              "taux_place": 33.33,
              "incidents": 0,
              "cinq_dernieres": {
                "courses": 5,
                "victoires": 1,
                "places": 2,
                "taux_victoire": 20,
                "taux_place": 40
              },
              "derniere_position": 2
            },
            "musique_forme": {
              "courses": 7,
              "victoires": 1,
              "places": 3,
              "taux_victoire": 14.29,
              "taux_place": 42.86
            }
          }
        },
        "4": {
          "nom_cheval": "CENTRAL PARK WEST",
          "sexe": "H",
          "annee_de_naissance": 2018,
          "nom_jockey": "TRULLIER T.",
          "nom_entraineur": "PHELIPPON J.",
          "poids_cheval": 580,
          "musique": "3p 1p 12p 10p 5p 15p 2p 4p 1p 1p (25) 9p 3p",
          "cotes": [17, 16, 17],
          "gains": 383037,
          "corde": 5,
          "discipline": "Plat",
          "distance": 1900,
          "position": 5,
          "statistiques": {
            "cote_min": 16,
            "cote_max": 17,
            "cote_moyenne": 16.67,
            "cote_mediane": 17,
            "cote_favorite": false,
            "rang_cote": 4,
            "ecart_cote_moyenne": -1.35,
            "position": 5,
            "est_gagnant": false,
            "est_place": false,
            "musique_analyse": {
              "courses": 12,
              "victoires": 3,
              "places": 6,
              "taux_victoire": 25,
              "taux_place": 50,
              "incidents": 0,
              "cinq_dernieres": {
                "courses": 5,
                "victoires": 1,
                "places": 2,
                "taux_victoire": 20,
                "taux_place": 40
              },
              "derniere_position": 3
            },
            "musique_forme": {
              "courses": 10,
              "victoires": 2,
              "places": 5,
              "taux_victoire": 20,
              "taux_place": 50
            }
          }
        },
        "9": {
          "nom_cheval": "PRESA DIRETTA",
          "sexe": "F",
          "annee_de_naissance": 2019,
          "nom_jockey": "LEMAITRE A.",
          "nom_entraineur": "CARRASCO SANCHEZ A.",
          "poids_cheval": 565,
          "musique": "3p 3p 4p 3p (25) 12p 15p 8p 1p 1p 1p 4p (24) 2p",
          "cotes": [7.6, 7.7, 8.6],
          "gains": 144978,
          "corde": 2,
          "discipline": "Plat",
          "distance": 1900,
          "position": 2,
          "statistiques": {
            "cote_min": 7.6,
            "cote_max": 8.6,
            "cote_moyenne": 7.97,
            "cote_mediane": 7.7,
            "cote_favorite": false,
            "rang_cote": 3,
            "ecart_cote_moyenne": -10.05,
            "position": 2,
            "est_gagnant": false,
            "est_place": true,
            "musique_analyse": {
              "courses": 12,
              "victoires": 3,
              "places": 7,
              "taux_victoire": 25,
              "taux_place": 58.33,
              "incidents": 0,
              "cinq_dernieres": {
                "courses": 5,
                "victoires": 0,
                "places": 3,
                "taux_victoire": 0,
                "taux_place": 60
              },
              "derniere_position": 3
            },
            "musique_forme": {
              "courses": 4,
              "victoires": 1,
              "places": 3,
              "taux_victoire": 25,
              "taux_place": 75
            }
          }
        },
        "15": {
          "nom_cheval": "SPEEDY GREEN",
          "sexe": "H",
          "annee_de_naissance": 2022,
          "nom_jockey": "GROSBOIS CHR.",
          "nom_entraineur": "BONILLA (S) D.",
          "poids_cheval": 530,
          "musique": "1p 9p 1p 6p 12p 15p 4p 6p 1p 7p (25) 7p 8p",
          "cotes": [53, 50, 58],
          "gains": 37705,
          "corde": 16,
          "discipline": "Plat",
          "distance": 1900,
          "position": 3,
          "statistiques": {
            "cote_min": 50,
            "cote_max": 58,
            "cote_moyenne": 53.67,
            "cote_mediane": 53,
            "cote_favorite": false,
            "rang_cote": 5,
            "ecart_cote_moyenne": 35.65,
            "position": 3,
            "est_gagnant": false,
            "est_place": true,
            "musique_analyse": {
              "courses": 12,
              "victoires": 3,
              "places": 3,
              "taux_victoire": 25,
              "taux_place": 25,
              "incidents": 0,
              "cinq_dernieres": {
                "courses": 5,
                "victoires": 2,
                "places": 2,
                "taux_victoire": 40,
                "taux_place": 40
              },
              "derniere_position": 1
            },
            "musique_forme": {
              "courses": 12,
              "victoires": 3,
              "places": 3,
              "taux_victoire": 25,
              "taux_place": 25
            }
          }
        }
      },
      "statistiques": {
        "nombre_partants": 16,
        "nombre_arrivants": 5,
        "nombre_non_partants": 0,
        "cote_min": 3.3,
        "cote_max": 58,
        "cote_moyenne": 18.02,
        "cote_mediane": 8.5,
        "favori": {
          "numero": 2,
          "nom_cheval": "ZELORO",
          "cote": 3.3,
          "position": 4
        },
        "gagnant": {
          "numero": 1,
          "nom_cheval": "ANSSIO",
          "cote": 6.1
        },
        "repartition_positions": {
          "1": 1,
          "2": 1,
          "3": 1,
          "4": 1,
          "5": 1
        },
        "taux_favori_gagnant": 0,
        "taux_favori_place": 0,
        "ecart_cote_gagnant": 2.8,
        "ecart_cote_favori": 14.72
      }
    }
  ]
}
```

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
