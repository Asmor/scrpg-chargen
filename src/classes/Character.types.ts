import { Archetype } from "@/data/archetypes.types";
import { Background } from "@/data/backgrounds.types";
import { PowerSource } from "@/data/powerSourcesTypes";
import DecisionStack from "./DecisionStack.types";
import Decision from "./Decision.types";

export default interface Character {
	rolls: {
		background: number[];
	};
	aspects: {
		background?: Background;
		powerSource?: PowerSource;
		archetype?: Archetype;
	};
}

export interface CharacterCache {
	key: string;
	cached: Character;
}

export type CharacterCreationStep = (stack: DecisionStack) => Decision;
