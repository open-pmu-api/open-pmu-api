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
GET https://open-pmu-api.vercel.app/api/arrivees?date=12/02/2026
```

```http
GET https://open-pmu-api.vercel.app/api/arrivees?prix=Prix jules roucayrol
```

```http
GET https://open-pmu-api.vercel.app/api/arrivees?hippo=Cagnes Sur Me
```


Réponse
```JSON
{
  "error": false,
  "message": [
    {
      "date": "12/02/2026",
      "type": "Attelé",
      "montant": 49000,
      "distance": 2925,
      "pix": "Prix jules roucayrol",
      "lieu": "Cagnes Sur Mer",
      "r/c": "R1C1",
      "partants": 15,
      "non_partants": [5],
      "arrivee": [14, 11, 12, 15, 10],
      "details": "Pour 8 à 11 ans inclus (F à I), n'ayant pas gagné 380.000."
    }
  ]
}
```
