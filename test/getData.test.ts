import test from 'node:test';
import assert from 'node:assert/strict';

import {
	cleanNonPartants,
	parseMusique,
	summarizeRuns,
	getMusiqueForm,
} from '../get-data.js';

test('cleanNonPartants: [0] devient []', () => {
	assert.deepEqual(cleanNonPartants([0]), []);
});

test('cleanNonPartants: conserve les vrais numéros', () => {
	assert.deepEqual(
		cleanNonPartants([0, 3, 7, 12]),
		[3, 7, 12]
	);
});

test('cleanNonPartants: null reste null', () => {
	assert.equal(cleanNonPartants(null), null);
});

test('cleanNonPartants: tableau vide reste vide', () => {
	assert.deepEqual(cleanNonPartants([]), []);
});

test('parseMusique: analyse les positions', () => {
	assert.deepEqual(
		parseMusique('2p 1p 5p 0p 3p'),
		[
			{ position: 2, incident: false },
			{ position: 1, incident: false },
			{ position: 5, incident: false },
			{ position: null, incident: false },
			{ position: 3, incident: false },
		]
	);
});

test('parseMusique: ignore les marqueurs d’année', () => {
	assert.deepEqual(
		parseMusique('2p 1p (25) 5p (24) 3p'),
		[
			{ position: 2, incident: false },
			{ position: 1, incident: false },
			{ position: 5, incident: false },
			{ position: 3, incident: false },
		]
	);
});

test('parseMusique: détecte les incidents', () => {
	assert.deepEqual(
		parseMusique('2p Dp 4p Ta 0p'),
		[
			{ position: 2, incident: false },
			{ position: null, incident: true },
			{ position: 4, incident: false },
			{ position: null, incident: true },
			{ position: null, incident: false },
		]
	);
});

test('parseMusique: musique vide', () => {
	assert.deepEqual(parseMusique(null), []);
	assert.deepEqual(parseMusique(''), []);
});

test('summarizeRuns: calcule les courses, victoires et places', () => {
	const runs = parseMusique('1p 2p 3p 5p 0p');

	assert.deepEqual(
		summarizeRuns(runs),
		{
			courses: 5,
			victoires: 1,
			places: 3,
			taux_victoire: 20,
			taux_place: 60,
		}
	);
});

test('getMusiqueForm: calcule la forme complète', () => {
	const runs = parseMusique('2p 1p 5p 3p 0p 4p');

	assert.deepEqual(
		getMusiqueForm(runs),
		{
			courses: 6,
			victoires: 1,
			places: 3,
			incidents: 0,
			taux_victoire: 16.67,
			taux_place: 50,
			cinq_dernieres: {
				courses: 5,
				victoires: 1,
				places: 3,
				taux_victoire: 20,
				taux_place: 60,
			},
			derniere_position: 2,
		}
	);
});

test('getMusiqueForm: compte les incidents', () => {
	const runs = parseMusique('1p Dp 3p Ta 0p');

	assert.deepEqual(
		getMusiqueForm(runs),
		{
			courses: 5,
			victoires: 1,
			places: 2,
			incidents: 2,
			taux_victoire: 20,
			taux_place: 40,
			cinq_dernieres: {
				courses: 5,
				victoires: 1,
				places: 2,
				taux_victoire: 20,
				taux_place: 40,
			},
			derniere_position: 1,
		}
	);
});