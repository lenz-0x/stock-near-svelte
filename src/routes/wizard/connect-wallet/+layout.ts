export async function load() {
	const title = 'Connect wallet';
	const steps = [
		{ slug: 'introduction', label: 'Introduction' },
		{ slug: 'connect', label: 'Connect your wallet' },
		{ slug: 'balance', label: 'Wallet balance' },
		{ slug: 'finish', label: 'Finish' }
	];
	return { title, steps };
}
