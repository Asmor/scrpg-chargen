import { Character } from "./Character";
import { Question, Results } from "./Question";

export interface Decision {
	questions: Question[],
	process: (
		character: Character,
		results: any,
	) => void;
	getNext: () => Decision | null;
}
