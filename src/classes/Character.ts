import Character, { CharacterCache } from "./Character.types";
import DecisionStack from "./DecisionStack.types";

export const getNewCharacter = (): Character => {
	const char: Character = {
		rolls: {
			background: [],
		}
	};

	return char;
};

const characterCache: CharacterCache = {
	key: "",
	cached: getNewCharacter(),
}
export const buildCharacter = (stack: DecisionStack): Character => {
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
	}

	return characterCache.cached;
}
