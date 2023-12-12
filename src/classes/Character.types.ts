export default interface Character {
	rolls: {
		background: number[];
	};
}

export interface CharacterCache {
	key: string;
	cached: Character;
}
