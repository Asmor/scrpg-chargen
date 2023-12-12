import { Archetype } from "@/data/archetypes.types";
import { Background } from "@/data/backgrounds.types";
import { PowerSource } from "@/data/powerSourcesTypes";
import DecisionStack from "./DecisionStack";
import Decision from "./Decision";
import { PowerQuality } from "@/data/powersQualities.types";
import { Die } from "@/types/common";
import { Principle } from "@/data/principles.types";

export default interface Character {
	rolls: {
		background: number[];
	};
	aspects: {
		background?: Background;
		powerSource?: PowerSource;
		archetype?: Archetype;
		principles: Principle[];
	};
	powersAndQualities: {
		powerQuality: PowerQuality;
		die: Die;
	}[];
}

export interface CharacterCache {
	key: string;
	cached: Character;
}

export type CharacterCreationStep = (stack: DecisionStack) => Decision;

export const getNewCharacter = (): Character => {
	const char: Character = {
		rolls: {
			background: [],
		},
		aspects: {
			principles: [],
		},
		powersAndQualities: [],
	};

	return char;
};

const characterCache: CharacterCache = {
	key: "",
	cached: getNewCharacter(),
}
export const getCharacterCache = (stack: DecisionStack): CharacterCache => {
	const char: Character = getNewCharacter();
	const cacheParts: string[] = [];

	// Decisions need to be fully complete before moving on to the next, so only
	// apply decisions until we find one that's not complete
	stack.decisions.every(decision => {
		// Questions within a decision can be answered in any order so we
		// execute on all of them
		decision.questions.forEach(
			question => cacheParts.push(
				question.update(char)
			)
		);
		return decision.complete;
	});

	// Cache results so we return stable references for equivalent inputs
	const cacheKey = cacheParts.join("|");
	if ( cacheKey !== characterCache.key ) {
		characterCache.key = cacheKey;
		characterCache.cached = char;
		console.log("xxy character cache updated", characterCache);
	}

	return characterCache;
}
