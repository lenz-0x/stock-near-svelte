/**
 * This endpoint prerenders (at build time) chain lookup data so it can be
 * available app-wide at runtime without hitting the API. This is route is
 * fetched by the root +layout.ts load function and returned as `chainInfo`.
 */
import { json } from '@sveltejs/kit';
import type { ApiChain } from '$lib/helpers/chain';
import { fetchPublicApi } from '$lib/helpers/public-api';

// Fetch at build-time
export const prerender = true;

export async function GET({ fetch }) {
	// Fetch chains from API
	const apiChains = (await fetchPublicApi(fetch, 'chains')) as ApiChain[];

	// Convert to simplified ChainInfo objects (see ambient.d.ts)
	const chains: ChainInfo[] = apiChains.map((c) => ({
		id: c.chain_id,
		slug: c.chain_slug,
		name: c.chain_name
	}));
	return json(chains);
}
