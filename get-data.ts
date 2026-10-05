import db from './connections/index.js';
import { GetDataParams, GetDataResult, HorseHistory, HorseResult, MusiqueForm, Race } from './types.js';

function formatDate(date: string): string | null {
	if (!date || typeof date !== 'string') return null;

	const parts = date.trim().split('/');
	if (parts.length !== 3) return null;

	const [mois, jour, annee] = parts;

	// L'année doit avoir 2 ou 4 chiffres (3 chiffres donnaient une année absurde)
	if (!/^\d{1,2}$/.test(mois) || !/^\d{1,2}$/.test(jour) || !/^(\d{2}|\d{4})$/.test(annee)) {
		return null;
	}

	const fullYear = annee.length === 2 ? `20${annee}` : annee;

	const month = mois.padStart(2, '0');
	const day = jour.padStart(2, '0');

	const monthNumber = Number(month);
	const dayNumber = Number(day);

	if (monthNumber < 1 || monthNumber > 12 || dayNumber < 1 || dayNumber > 31) {
		return null;
	}

	const parsed = new Date(Date.UTC(Number(fullYear), monthNumber - 1, dayNumber));

	if (
		parsed.getUTCFullYear() !== Number(fullYear) ||
		parsed.getUTCMonth() !== monthNumber - 1 ||
		parsed.getUTCDate() !== dayNumber
	) {
		return null;
	}

	return `${fullYear}-${month}-${day}`;
}

function cleanString(value: unknown): string | null {
	if (value == null) return null;

	const string = String(value).trim();

	return string === '' ? null : string;
}

function cleanNumber(value: unknown): number | null {
	if (value == null || value === '') return null;

	const number = Number(value);

	return Number.isFinite(number) ? number : null;
}

function cleanIntegerArray(value: unknown): number[] | null {
	if (value == null) return null;

	if (Array.isArray(value)) {
		const values = value
			.map(item => cleanNumber(item))
			.filter((item): item is number => item !== null);

		return values;
	}

	return null;
}

function parseCotes(value: unknown): (number | null)[] {
	if (value == null) return [];

	let values: unknown[] = [];

	if (Array.isArray(value)) {
		values = value;
	} else if (typeof value === 'string') {
		const trimmed = value.trim();

		if (!trimmed) return [];

		const content = trimmed.startsWith('{') && trimmed.endsWith('}')
			? trimmed.slice(1, -1)
			: trimmed;

		values = content.split(',');
	} else {
		return [];
	}

	return values.map(value => {
		if (value == null || value === '') return null;

		const number = Number(
			String(value)
				.trim()
				.replace(/"/g, '')
				.replace(',', '.')
		);

		return Number.isFinite(number) ? number : null;
	});
}

function getValidCotes(cotes: (number | null)[]): number[] {
	return cotes.filter((cote): cote is number => cote !== null && cote > 0);
}

function getMin(values: number[]): number | null {
	if (!values.length) return null;

	return Math.min(...values);
}

function getMax(values: number[]): number | null {
	if (!values.length) return null;

	return Math.max(...values);
}

function getAverage(values: number[]): number | null {
	if (!values.length) return null;

	return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function getMedian(values: number[]): number | null {
	if (!values.length) return null;

	const sorted = [...values].sort((a, b) => a - b);
	const middle = Math.floor(sorted.length / 2);

	if (sorted.length % 2 === 0) {
		return (sorted[middle - 1] + sorted[middle]) / 2;
	}

	return sorted[middle];
}

function round(value: number | null, decimals = 2): number | null {
	if (value === null) return null;

	const factor = 10 ** decimals;

	return Math.round(value * factor) / factor;
}

function getDateString(value: unknown): string | null {
	if (value == null) return null;

	if (value instanceof Date) {
		return value.toISOString().slice(0, 10);
	}

	const string = String(value).trim();

	return string ? string.slice(0, 10) : null;
}

// Cote effective d'un cheval = sa cote la plus basse (utilisée pour le favori et le rang)
function getEffectiveCote(horse: HorseResult): number | null {
	return getMin(getValidCotes(horse.cotes));
}

function getEffectiveCotes(horses: HorseResult[]): number[] {
	return horses
		.map(getEffectiveCote)
		.filter((cote): cote is number => cote !== null);
}

// Moyenne / médiane calculées PAR CHEVAL puis agrégées, pour que chaque cheval
// pèse pareil quel que soit son nombre de cotes
function getHorseAverages(horses: HorseResult[]): number[] {
	return horses
		.map(horse => getAverage(getValidCotes(horse.cotes)))
		.filter((value): value is number => value !== null);
}

function getHorseMedians(horses: HorseResult[]): number[] {
	return horses
		.map(horse => getMedian(getValidCotes(horse.cotes)))
		.filter((value): value is number => value !== null);
}

function getHistoryForm(history: HorseHistory[]) {
	const courses = history.length;
	const victoires = history.filter(item => item.position === 1).length;
	const places = history.filter(
		item => item.position !== null && item.position >= 1 && item.position <= 3
	).length;

	return {
		courses,
		victoires,
		places,
		taux_victoire: courses ? round((victoires / courses) * 100) : null,
		taux_place: courses ? round((places / courses) * 100) : null,
	};
}

function cleanNonPartants(value: unknown): number[] | null {
	const values = cleanIntegerArray(value);

	if (values === null) return null;

	return values.filter(numero => numero > 0);
}

interface MusiqueRun {
	position: number | null;
	incident: boolean;
}

function parseMusique(musique: string | null): MusiqueRun[] {
	if (!musique) return [];

	const runs: MusiqueRun[] = [];

	for (const token of musique.trim().split(/\s+/)) {
		if (/^\(\d{2,4}\)$/.test(token)) continue;

		const result = token.match(/^(\d{1,2})[a-z]?$/i);

		if (result) {
			const position = Number(result[1]);

			runs.push({
				position: position > 0 ? position : null,
				incident: false,
			});

			continue;
		}

		if (/^[DTAR][a-z]?$/i.test(token)) {
			runs.push({
				position: null,
				incident: true,
			});
		}
	}

	return runs;
}

function summarizeRuns(runs: MusiqueRun[]) {
	const courses = runs.length;
	const victoires = runs.filter(run => run.position === 1).length;
	const places = runs.filter(
		run => run.position !== null && run.position >= 1 && run.position <= 3
	).length;

	return {
		courses,
		victoires,
		places,
		taux_victoire: courses ? round((victoires / courses) * 100) : null,
		taux_place: courses ? round((places / courses) * 100) : null,
	};
}

function getMusiqueForm(runs: MusiqueRun[]): MusiqueForm {
	return {
		...summarizeRuns(runs),
		incidents: runs.filter(run => run.incident).length,
		cinq_dernieres: summarizeRuns(runs.slice(0, 5)),
		derniere_position: runs[0]?.position ?? null,
	};
}

function calculateHorseStatistics(
    row: any,
    fieldEffectiveCotes: number[],
    favoriteCote: number | null,
    fieldAverageCote: number | null,
    history: HorseHistory[]
) {
    const cotes = parseCotes(row.cotes);
    const validCotes = getValidCotes(cotes);
    const coteMin = getMin(validCotes);
    const coteMax = getMax(validCotes);
    const coteMoyenne = getAverage(validCotes);
    const coteMediane = getMedian(validCotes);

    const rangCote = coteMin !== null
        ? 1 + fieldEffectiveCotes.filter(cote => cote < coteMin).length
        : null;

    const position = cleanNumber(row.position);

    const musiqueRuns = parseMusique(cleanString(row.musique));
    const musiqueAnalyse = getMusiqueForm(musiqueRuns);

    const musiqueForme = history.length
        ? getHistoryForm(history)
        : summarizeRuns(musiqueRuns);

    return {
        cote_min: coteMin,

        cote_max: coteMax,

        cote_moyenne: round(coteMoyenne),

        cote_mediane: round(coteMediane),

        cote_favorite:
            coteMin !== null &&
            favoriteCote !== null &&
            coteMin === favoriteCote,

        rang_cote: rangCote,

        ecart_cote_moyenne:
            coteMoyenne !== null &&
            fieldAverageCote !== null
                ? round(coteMoyenne - fieldAverageCote)
                : null,

        position,

        est_gagnant: position === 1,

        est_place:
            position !== null &&
            position >= 1 &&
            position <= 3,

        musique_analyse: musiqueAnalyse,

        musique_forme: musiqueForme,
    };
}

function calculateRaceStatistics(race: Race) {
	const horses = Object.entries(race.arrivee_details);
	const horseList = horses.map(([, horse]) => horse);

	const allCotes = horseList
		.map(horse => getValidCotes(horse.cotes))
		.flat();

	const coteMin = getMin(allCotes);
	const coteMax = getMax(allCotes);
	const coteMoyenne = getAverage(getHorseAverages(horseList));
	const coteMediane = getMedian(getHorseMedians(horseList));

	let favoriteEntry: [string, HorseResult] | null = null;
	let favoriteCote: number | null = null;

	for (const entry of horses) {
		const cote = getEffectiveCote(entry[1]);

		if (cote === null) continue;

		if (favoriteCote === null || cote < favoriteCote) {
			favoriteCote = cote;
			favoriteEntry = entry;
		}
	}

	const repartitionPositions: Record<string, number> = {};

	for (const [, horse] of horses) {
		if (horse.position === null || horse.position <= 0) continue;

		const position = String(horse.position);

		repartitionPositions[position] = (repartitionPositions[position] || 0) + 1;
	}

	let winnerEntry: [string, HorseResult] | null = null;

	for (const entry of horses) {
		if (entry[1].position === 1) {
			winnerEntry = entry;
			break;
		}
	}

	const nombreArrivants = horses.filter(
		([, horse]) => horse.position !== null && horse.position > 0
	).length;

	const nombrePartants = race.partants ?? horses.length;
	const nombreNonPartants = race.non_partants?.length ?? 0;

	const favoritePosition = favoriteEntry?.[1].position ?? null;

	const tauxFavoriGagnant =
		favoriteEntry && favoritePosition !== null
			? favoritePosition === 1 ? 100 : 0
			: null;

	// Correction : une position 0 ou négative (non classé) n'est pas une place
	const tauxFavoriPlace =
		favoriteEntry && favoritePosition !== null
			? favoritePosition >= 1 && favoritePosition <= 3 ? 100 : 0
			: null;

	const winnerCote = winnerEntry
		? getEffectiveCote(winnerEntry[1])
		: null;

	return {
		nombre_partants: nombrePartants,
		nombre_arrivants: nombreArrivants,
		nombre_non_partants: nombreNonPartants,

		cote_min: coteMin,
		cote_max: coteMax,
		cote_moyenne: round(coteMoyenne),
		cote_mediane: round(coteMediane),

		favori: {
			numero: favoriteEntry ? Number(favoriteEntry[0]) : null,
			nom_cheval: favoriteEntry?.[1].nom_cheval ?? null,
			cote: favoriteCote,
			position: favoritePosition,
		},

		gagnant: {
			numero: winnerEntry ? Number(winnerEntry[0]) : null,
			nom_cheval: winnerEntry?.[1].nom_cheval ?? null,
			cote: winnerCote,
		},

		repartition_positions: repartitionPositions,

		taux_favori_gagnant: tauxFavoriGagnant,
		taux_favori_place: tauxFavoriPlace,

		ecart_cote_gagnant:
			winnerCote !== null && favoriteCote !== null
				? round(winnerCote - favoriteCote)
				: null,

		ecart_cote_favori:
			coteMoyenne !== null && favoriteCote !== null
				? round(coteMoyenne - favoriteCote)
				: null,
	};
}

export default async function getData({ prix, hippo, date }: GetDataParams): Promise<GetDataResult> {
	try {
		let key: string | null = null;
		let value: string | null = null;
		let operator: 'LIKE' | '=' = 'LIKE';
		const params: Record<string, string> = {};

		if (prix) {
			key = 'races.prix';
			value = prix;
			params.prix = prix;
		} else if (hippo) {
			key = 'races.lieu';
			value = hippo;
			params.hippo = hippo;
		} else if (date) {
			key = 'races.date';
			value = formatDate(date);
			operator = '=';

			params.date = date;

			if (!value) {
				return {
					success: false,
					params,
					total: 0,
					message: 'Format de date invalide. Format valide MOIS/JOUR/ANNÉE. Ex: 12/31/2004'
				};
			}
		}

		if (!key || value == null) {
			return {
				success: false,
				params,
				total: 0,
				message: 'Aucun paramètre valide fourni.'
			};
		}

		const paramValue = operator === 'LIKE' ? `%${value}%` : value;

		const result = await db.query(
			`
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
				race_results.poids_cheval,
				race_results.musique,
				race_results.cotes,
				race_results.gains,
				race_results.corde,
				race_results.discipline,
				race_results.distance AS horse_distance,
				race_results.numero,
				race_results.position
			FROM races
			LEFT JOIN race_results ON race_results.race_id = races.id
			WHERE ${key} ${operator} $1
			ORDER BY races.date DESC, races.heure_depart ASC, race_results.numero ASC
			`,
			[paramValue]
		);

		const races: Record<string, Race> = {};

		for (const row of result.rows) {
			if (!races[row.id]) {
				races[row.id] = {
					type: cleanString(row.type),
					montant: cleanNumber(row.montant),
					distance: cleanNumber(row.distance),
					prix: cleanString(row.prix),
					lieu: cleanString(row.lieu),
					heure_depart: cleanString(row.heure_depart),
					details: cleanString(row.details),
					partants: cleanNumber(row.partants),
                    non_partants: cleanNonPartants(row.non_partants),
					arrivee: cleanIntegerArray(row.arrivee),
					'r/c': cleanString(row.r_c),
					date: getDateString(row.date),
					arrivee_details: {},
					statistiques: {
						nombre_partants: cleanNumber(row.partants) ?? 0,
						nombre_arrivants: 0,
                        nombre_non_partants: cleanNonPartants(row.non_partants)?.length ?? 0,
						cote_min: null,
						cote_max: null,
						cote_moyenne: null,
						cote_mediane: null,
						favori: {
							numero: null,
							nom_cheval: null,
							cote: null,
							position: null,
						},
						gagnant: {
							numero: null,
							nom_cheval: null,
							cote: null,
						},
						repartition_positions: {},
						taux_favori_gagnant: null,
						taux_favori_place: null,
						ecart_cote_gagnant: null,
						ecart_cote_favori: null,
					},
				};
			}

            const musiqueRuns = parseMusique(row.musique);
            const musiqueAnalyse = getMusiqueForm(musiqueRuns);

			if (row.numero != null) {
				races[row.id].arrivee_details[row.numero] = {
					nom_cheval: cleanString(row.nom_cheval),
					sexe: cleanString(row.sexe),
					annee_de_naissance: cleanNumber(row.annee_de_naissance),
					nom_jockey: cleanString(row.nom_jockey),
					nom_entraineur: cleanString(row.nom_entraineur),
					poids_cheval: cleanNumber(row.poids_cheval),
					musique: cleanString(row.musique),
					cotes: parseCotes(row.cotes),
					gains: cleanNumber(row.gains),
					corde: cleanNumber(row.corde),
					discipline: cleanString(row.discipline),
					distance: cleanNumber(row.horse_distance),
					position: cleanNumber(row.position),
					statistiques: {
						cote_min: null,
						cote_max: null,
						cote_moyenne: null,
						cote_mediane: null,
						cote_favorite: false,
						rang_cote: null,
						ecart_cote_moyenne: null,
                        musique_analyse: musiqueAnalyse,
						position: cleanNumber(row.position),
						est_gagnant: cleanNumber(row.position) === 1,
						est_place:
							cleanNumber(row.position) !== null &&
							cleanNumber(row.position)! >= 1 &&
							cleanNumber(row.position)! <= 3,
						musique_forme: {
							courses: 0,
							victoires: 0,
							places: 0,
							taux_victoire: null,
							taux_place: null,
						},
					},
				};
			}
		}

		const matches = Object.values(races);

		const currentHorses = matches.flatMap(race =>
			Object.values(race.arrivee_details)
				.filter(horse => horse.nom_cheval && race.date)
				.map(horse => ({
					race,
					nom_cheval: horse.nom_cheval as string,
				}))
		);

		const historyMap = new Map<string, HorseHistory[]>();

		if (currentHorses.length) {
			const historyInput = currentHorses.map(item => ({
				race_id: Object.entries(races).find(
					([, race]) => race === item.race
				)?.[0] ?? null,
				race_date: item.race.date,
				nom_cheval: item.nom_cheval,
			})).filter(
				(item): item is {
					race_id: string;
					race_date: string;
					nom_cheval: string;
				} =>
					item.race_id !== null &&
					item.race_date !== null
			);

			const historyResult = await db.query(
				`
				WITH current_horses AS (
					SELECT *
					FROM jsonb_to_recordset($1::jsonb)
					AS x(
						race_id uuid,
						race_date date,
						nom_cheval text
					)
				)
				SELECT
					current_horses.race_id,
					current_horses.nom_cheval,
					history.position,
					history.date
				FROM current_horses
				JOIN LATERAL (
					SELECT
						race_results.position,
						races.date
					FROM race_results
					INNER JOIN races ON races.id = race_results.race_id
					WHERE race_results.nom_cheval = current_horses.nom_cheval
						AND races.date < current_horses.race_date
					ORDER BY races.date DESC
					LIMIT 10
				) history ON true
				ORDER BY
					current_horses.race_id,
					current_horses.nom_cheval,
					history.date DESC
				`,
				[JSON.stringify(historyInput)]
			);

			for (const row of historyResult.rows) {
				const key = `${row.race_id}:${row.nom_cheval}`;

				if (!historyMap.has(key)) {
					historyMap.set(key, []);
				}

				historyMap.get(key)!.push({
					position: cleanNumber(row.position),
					date: getDateString(row.date),
				});
			}

			for (const item of historyInput) {
				const key = `${item.race_id}:${item.nom_cheval}`;

				if (!historyMap.has(key)) {
					historyMap.set(key, []);
				}
			}
		}

		for (const [raceId, race] of Object.entries(races)) {
			const horses = Object.entries(race.arrivee_details);
			const horseList = horses.map(([, horse]) => horse);

			// Cote effective (min) de chaque cheval : sert au rang et au favori
			const fieldEffectiveCotes = getEffectiveCotes(horseList);
			const favoriteCote = getMin(fieldEffectiveCotes);

			// Moyenne du champ = moyenne des moyennes par cheval (même base que la stat de course)
			const fieldAverageCote = getAverage(getHorseAverages(horseList));

			for (const [numero, horse] of horses) {
				const historyKey = `${raceId}:${horse.nom_cheval}`;

				const history = horse.nom_cheval
					? historyMap.get(historyKey) ?? []
					: [];

				horse.statistiques = calculateHorseStatistics(
					{
						...horse,
						numero: Number(numero),
					},
					fieldEffectiveCotes,
					favoriteCote,
					fieldAverageCote,
					history
				);
			}

			race.statistiques = calculateRaceStatistics(race);
		}

		return {
			success: true,
			total: matches.length,
			params,
			message: matches,
		};
	} catch (err) {
		console.error('[getData]', err);

		return {
			success: false,
			params: {},
			total: 0,
			message: 'Erreur serveur.'
		};
	}
}

export {
	cleanNonPartants,
	parseMusique,
	summarizeRuns,
	getMusiqueForm,
    getData
};