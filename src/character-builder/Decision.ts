import { Character } from "./Character";
import { Question, Results } from "./Question";

export interface Decision {
	questions: Question[],
	process: (
		character: Character,
		results: Results[],
	) => void;
	getNext: (character: Character) => Decision | null;
}
