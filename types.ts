export interface GetDataParams {
	prix?: string;
	hippo?: string;
	date?: string;
}

export interface HorseHistory {
	position: number | null;
	date: string | null;
}

export interface MusiqueForm {
	courses: number;
	victoires: number;
	places: number;
	incidents: number;
	taux_victoire: number | null;
	taux_place: number | null;
	cinq_dernieres: {
		courses: number;
		victoires: number;
		places: number;
		taux_victoire: number | null;
		taux_place: number | null;
	};
	derniere_position: number | null;
}

export interface HorseResult {
	nom_cheval: string | null;
	sexe: string | null;
	annee_de_naissance: number | null;
	nom_jockey: string | null;
	nom_entraineur: string | null;
	poids_cheval: number | null;
	musique: string | null;
	cotes: (number | null)[];
	gains: number | null;
	corde: number | null;
	discipline: string | null;
	distance: number | null;
	position: number | null;

	statistiques: {
		cote_min: number | null;
		cote_max: number | null;
		cote_moyenne: number | null;
		cote_mediane: number | null;
		cote_favorite: boolean;
		rang_cote: number | null;
		ecart_cote_moyenne: number | null;

		position: number | null;
		est_gagnant: boolean;
		est_place: boolean;
        musique_analyse: MusiqueForm;

        musique_forme: {
            courses: number;
            victoires: number;
            places: number;
            taux_victoire: number | null;
            taux_place: number | null;
        };
	};
}

export interface Race {
	type: string | null;
	montant: number | null;
	distance: number | null;
	prix: string | null;
	lieu: string | null;
	heure_depart: string | null;
	details: string | null;
	partants: number | null;
	non_partants: number[] | null;
	arrivee: number[] | null;
	'r/c': string | null;
	date: string | null;
	arrivee_details: Record<string, HorseResult>;

	statistiques: {
		nombre_partants: number;
		nombre_arrivants: number;
		nombre_non_partants: number;

		cote_min: number | null;
		cote_max: number | null;
		cote_moyenne: number | null;
		cote_mediane: number | null;

		favori: {
			numero: number | null;
			nom_cheval: string | null;
			cote: number | null;
			position: number | null;
		};

		gagnant: {
			numero: number | null;
			nom_cheval: string | null;
			cote: number | null;
		};

		repartition_positions: Record<string, number>;

		taux_favori_gagnant: number | null;
		taux_favori_place: number | null;

		ecart_cote_gagnant: number | null;
		ecart_cote_favori: number | null;
	};
}

export type GetDataResult = {
	success: boolean;
	total: number;
	params: Record<string, string>;
	message: Race[] | string;
};
