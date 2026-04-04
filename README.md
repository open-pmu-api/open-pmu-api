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
GET https://open-pmu-api.vercel.app/api/arrivees?date=05/05/2021
```

```http
GET https://open-pmu-api.vercel.app/api/arrivees?prix=Prix de la foret de fontainebleau
```

```http
GET https://open-pmu-api.vercel.app/api/arrivees?hippo=Fontainebleau
```


Réponse
```JSON
{
  "error": false,
  "message": [
    {
      "date": "05/05/2021",
      "type": "Plat",
      "montant": 50000,
      "distance": 1100,
      "prix": "Prix de la foret de fontainebleau",
      "lieu": "Fontainebleau",
      "r/c": "R1C1",
      "partants": 16,
      "non partants": 7,
      "arrivee": "1 - 2 - 8 - 9 - 5",
      "details": "PLAT, 1100 mètres , Ligne DROITE- HANDICAP DIVISE Pour chevaux entiers, hongres et juments de 4 ans et au-dessus , ayant couru depuis le 1er novembre 2020 inclus. Un souvenir sera offert au propriétaire du cheval gagnant. Les nouvelles conditions deversement des allocations à compter du 1er mars 2021 publiées dans l'additif aux conditions générales 2021 du 26 février 2021 sont applicables dans ce prix."
    }
  ]
}
```
