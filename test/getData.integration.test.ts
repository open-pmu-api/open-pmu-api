import test from "node:test";
import assert from "node:assert/strict";
import { getData } from "../get-data.js";
import { Race } from "../types.js";

test("getData: retourne une course complète", async () => {
	const result = await getData({
		date: "09/29/2026",
	});

	assert.equal(result.success, true);
	assert.ok(Array.isArray(result.message));

	if (!result.message?.length) return;

	const race = result.message[0];

	assert.ok("non_partants" in race);
	assert.ok("arrivee_details" in race);
	assert.ok("statistiques" in race);

	assert.ok(Array.isArray(race.non_partants));
	assert.ok(typeof race.arrivee_details === "object");
	assert.ok(typeof race.statistiques === "object");
});

test("getData: analyse des chevaux", async () => {
	const result = await getData({
		date: "09/29/2026",
	});

	assert.equal(result.success, true);

	const race = result.message?.[0] as Race;

	if (!race) return;

	const chevaux = Object.values(race.arrivee_details);

	assert.ok(chevaux.length > 0);

	for (const cheval of chevaux) {
		assert.ok("statistiques" in cheval);

		assert.ok("cote_min" in cheval.statistiques);
		assert.ok("cote_max" in cheval.statistiques);
		assert.ok("cote_moyenne" in cheval.statistiques);
		assert.ok("cote_mediane" in cheval.statistiques);
		assert.ok("musique_analyse" in cheval.statistiques);
		assert.ok("musique_forme" in cheval.statistiques);
	}
});

test("getData: non-partants [0] devient []", async () => {
	const result = await getData({
		date: "09/29/2026",
	});

	assert.equal(result.success, true);

	const race = result.message?.[0] as Race;

	if (!race) return;

	assert.deepEqual(race.non_partants, []);
	assert.equal(race.statistiques.nombre_non_partants, 0);
});

test("getData: statistiques de course", async () => {
	const result = await getData({
		date: "09/29/2026",
	});

	assert.equal(result.success, true);

	const race = result.message?.[0] as Race;

	if (!race) return;

	const stats = race.statistiques;

	assert.equal(stats.nombre_partants, 16);
	assert.equal(stats.nombre_non_partants, 0);

	assert.equal(stats.favori.numero, 2);
	assert.equal(stats.favori.nom_cheval, "ZELORO");
	assert.equal(stats.favori.cote, 3.3);

	assert.equal(stats.gagnant.numero, 1);
	assert.equal(stats.gagnant.nom_cheval, "ANSSIO");
	assert.equal(stats.gagnant.cote, 6.1);
});

test("getData: historique et fallback musique", async () => {
	const result = await getData({
		date: "09/29/2026",
	});

	assert.equal(result.success, true);

	const race = result.message?.[0] as Race;

	if (!race) return;

	const anssio = Object.values(race.arrivee_details).find(
		cheval => cheval.nom_cheval === "ANSSIO"
	);

	const speedyGreen = Object.values(race.arrivee_details).find(
		cheval => cheval.nom_cheval === "SPEEDY GREEN"
	);

	assert.ok(anssio);
	assert.ok(speedyGreen);

	assert.equal(anssio.statistiques.musique_forme.courses, 2);
	assert.equal(anssio.statistiques.musique_forme.victoires, 0);
	assert.equal(anssio.statistiques.musique_forme.places, 2);

	assert.equal(speedyGreen.statistiques.musique_forme.courses, 12);

    assert.equal(
        speedyGreen.statistiques.musique_forme.courses,
        speedyGreen.statistiques.musique_analyse.courses
    );

	assert.ok(speedyGreen.statistiques.musique_analyse.courses > 0);
});