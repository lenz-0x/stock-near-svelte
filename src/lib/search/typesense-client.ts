import type { DocumentSchema, SearchParams, SearchResponse } from 'typesense/lib/Typesense/Documents';
import { typesenseConfig } from '$lib/config';
import { publicApiError } from '$lib/helpers/public-api';

const { apiUrl, apiKey } = typesenseConfig;

// Allow filters to be array of strings rather than single string; see toTypesenseSearchParams
export type CustomSearchParams = Omit<SearchParams, 'filter_by'> & {
	filter_by?: string | string[];
};

/**
 * Convert custom search params to standard Typesense search params and apply default values
 */
function toTypesenseParams({ filter_by = '', ...params }: CustomSearchParams): Record<string, any> {
	if (Array.isArray(filter_by)) {
		filter_by = filter_by.join(' && ');
	}
	return { ...params, filter_by };
}

let controller: AbortController | undefined = undefined;

export async function searchCollection<T extends DocumentSchema>(
	fetch: Fetch,
	collection: string,
	params: CustomSearchParams
): Promise<SearchResponse<T> | undefined> {
	if (!apiKey || !apiUrl) {
		throw new Error('Typesense URL and/or API key not configured');
	}

	const url = `${apiUrl}/collections/${collection}/documents/search`;
	const searchParams = new URLSearchParams(toTypesenseParams(params));
	const headers = { 'X-TYPESENSE-API-KEY': apiKey };

	// Abort pending search to prevent race condition
	controller?.abort();
	controller = new AbortController();
	const signal = controller.signal;

	try {
		const resp = await fetch(`${url}?${searchParams}`, { headers, signal });
		if (!resp.ok) throw await publicApiError(resp);
		return resp.json();
	} catch (err) {
		if ((err as Error).name === 'AbortError') return;
		throw err;
	} finally {
		if (!signal?.aborted) controller = undefined;
	}
}
