import getData from '../get-data.js';
import { GetDataResult } from '../types.js';

interface VercelRequest {
	method?: string;
	query: Record<string, string | string[] | undefined>;
}

interface VercelResponse {
	status(code: number): VercelResponse;
	json(body: unknown): VercelResponse;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== 'GET') {
		return res.status(405).json({ error: true, message: 'Method Not Allowed' });
	}

	try {
		const { prix, hippo, date } = req.query;

		let _resp: GetDataResult;

		if (typeof prix === 'string') {
			_resp = await getData({ prix });
		} else if (typeof hippo === 'string') {
			_resp = await getData({ hippo });
		} else if (typeof date === 'string') {
			_resp = await getData({ date });
		} else {
			_resp = {
				success: false,
				params: {},
				total: 0,
				message: 'Aucun paramètre valide fourni.'
			};
		}

		const response = _resp;

		return res.status(200).json({
			error: !response.success,
			total: response.total,
			params: response.params,
			message: response.message,
		});
	} catch (error) {
		console.error('[API]', error);
		return res.status(500).json({ error: true, message: 'Erreur serveur.' });
	}
}