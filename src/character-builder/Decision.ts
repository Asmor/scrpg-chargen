import { Character } from "./Character";
import { Question } from "./Question";

export interface Decision {
	questions: Question[],
	process: (
		character: Character,
		frozenResults: string[],
	) => void;
	getNext: (character: Character) => Decision | null;
}
