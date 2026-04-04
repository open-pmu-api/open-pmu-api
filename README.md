# open-pmu-api
Une API REST open source pour consulter les arrivées de courses PMU par date, hippodrome ou prix.

Une API REST gratuite et open source pour consulter les **arrivées des courses PMU**, filtrables par **date**, **hippodrome** ou **prix**.

Période des données : du ```22/01/2004``` au ```04/04/2026```  
Dernière mise à jour : ```04/04/2026```

## Fonctionnalités

- Rechercher les arrivées d'une course PMU :
  - par **date**
  - par **nom d'hippodrome**
  - par **nom de prix**

## Utilisation
```http
GET https://open-pmu-api.vercel.app/api/arrivee
```
```
date=DAY/MONTH/YEAR
prix=PRIX
hippo=HIPPODROME
```
### Exemples d'appel

```http
GET https://open-pmu-api.vercel.app/api/arrivees?date=04/04/2026
```

```http
GET https://open-pmu-api.vercel.app/api/arrivees?prix=Prix kerjacques
```

```http
GET https://open-pmu-api.vercel.app/api/arrivees?hippo=Vincennes
```


Réponse
```JSON
{
  "error": false,
  "message": [
    {
      "date": "04/04/2026",
      "type": "Attelé",
      "montant": 120000,
      "distance": 2700,
      "prix": "Prix kerjacques",
      "lieu": "Vincennes",
      "r/c": "R1C4",
      "partants": 13,
      "non_partants": null,
      "arrivee": [10, 8, 7, 3, 12],
      "details": "Pour 6 à 11 ans inclus, ayant gagné au moins 130.000. Sont seules admises à driver les personnes ayant gagné au moins trente-cinq courses dont dix au trot attelé (en étant titulaire d'une autorisation de monter à titre professionnel)."
    }
  ]
}
```
