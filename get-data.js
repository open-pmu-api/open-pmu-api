import db from './connections/index.js';

function formatDate(date) {
    const [jour, mois, annee] = date.split("/");

    const fullYear = annee.length === 2 ? `20${annee}` : annee;

    return `${fullYear}-${mois}-${jour}`;
}

export default async function getData({ prix, hippo, date }) {
	try {
		let key = null, value = null, operator = 'LIKE';
		if (prix) {
			key = 'races.prix';
			value = prix;
		} else if (hippo) {
			key = 'races.lieu';
			value = hippo;
		} else if (date) {
			key = 'races.date';
			const formattedDate = formatDate(date);
			value = formattedDate;
			operator = '=';
		}

		if (key && value) {
			const result = await db.query(`
				SELECT 
					races.id,
					races.type,
					races.date,
					races.montant,
					races.distance,
					races.prix,
					races.lieu,
					races.heure_depart,
					races.details,
					races.partants,
					races.non_partants,
					races.arrivee,
					races.r_c,
		
					race_results.nom_cheval,
					race_results.sexe,
					race_results.annee_de_naissance,
					race_results.nom_jockey,
					race_results.nom_entraineur,
					race_results.musique,
					race_results.cotes,
					race_results.gains,
					race_results.corde,
					race_results.discipline,
					race_results.distance AS horse_distance,
					race_results.numero
		
				FROM races
				LEFT JOIN race_results 
					ON race_results.race_id = races.id
		
				WHERE ${key} ${operator} $1
			`, [operator == 'LIKE' ? `%${value}%` : date]
			);
			const races = {};
	
			for (const row of result.rows) {
	
				if (!races[row.id]) {
					races[row.id] = {
						type: row.type,
						montant: row.montant,
						distance: row.distance,
						prix: row.prix,
						lieu: row.lieu,
						heure_depart: row.heure_depart,
						details: row.details,
						partants: row.partants,
						non_partants: row.non_partants,
						arrivee: row.arrivee,
						"r/c": row.r_c,
						arrivee_details: {},
						date: row.date
					};
				}
	
				if (row.numero !== null) {
					races[row.id].arrivee_details[row.numero] = {
						nom_cheval: row.nom_cheval,
						sexe: row.sexe,
						annee_de_naissance: row.annee_de_naissance,
						nom_jockey: row.nom_jockey,
						nom_entraineur: row.nom_entraineur,
						musique: row.musique,
						cotes: row.cotes,
						gains: row.gains,
						corde: row.corde,
						discipline: row.discipline,
						distance: row.horse_distance
					};
				}
			}
	
			const response = Object.values(races);
			if (response.length > 0) {
				return [true, response];
			} else {
				return [false, "Pas de correspondance"];
			}
		} else {
			return [false, "Pas de correspondance"];
		}
	} catch (err) {
		console.log(err);
		return [false, []]
	}
}

