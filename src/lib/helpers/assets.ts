const logos = import.meta.glob('../assets/logos/**/*.svg', { as: 'url', eager: true });
const cryptoIcons = import.meta.glob('/node_modules/cryptocurrency-icons/svg/color/*.svg', { as: 'url', eager: true });

const logoTypes = {
	blockchain: 'blockchains',
	chain: 'blockchains',
	token: 'tokens',
	exchange: 'exchanges',
	dex: 'exchanges',
	wallet: 'wallets'
} as const;

type LogoType = keyof typeof logoTypes;

// returns URL for logo images found in `lib/assets/logos/**/*.svg`
// or cryptocurrency-icons npm module
export function getLogoUrl(type: LogoType, name: string) {
	return (
		logos[`../assets/logos/${logoTypes[type]}/${name}.svg`] ??
		cryptoIcons[`/node_modules/cryptocurrency-icons/svg/color/${name}.svg`]
	);
}
