import { isEqual, cloneDeep } from "lodash";
import { Decision } from "./Decision";
import { Question, Results } from "./Question";
import { Character, getNewCharacter } from "./Character";

interface ScrpgDirectorProps {
	startingDecision: Decision,
	results: Results[],
}

let cachedCharacter: Character = {} as Character;
let cachedQuestions: Question[] = [];
const scrpgDirector = ({
	startingDecision,
	results,
}: ScrpgDirectorProps) => {
	console.log("xxy director init", results);
	const character = getNewCharacter();
	const questions: Question[] = [];

	let decision: Decision | null = startingDecision;
	let i = 0;

	while (decision) {
		console.log("xxy Before process", cloneDeep(character));
		decision.process(character, results[i]);
		console.log("xxy After process", cloneDeep(character));
		questions.push(...decision.questions);
		decision = decision.getNext(character);
		i++;
	}

	if ( !isEqual(character, cachedCharacter) ) {
		cachedCharacter = character;
	}

	if ( !isEqual(questions, cachedQuestions) ) {
		cachedQuestions = questions;
	}

	return {
		questions: cachedQuestions,
		character: cachedCharacter,
	};
};

export default scrpgDirector;
