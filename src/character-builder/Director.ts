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
	let questionCounter = 0;

	while (decision) {
		const questionCount = decision.questions.length;
		const decisionResults: Results[] = new Array(questionCount);
		for ( let i = 0; i < questionCount; i++ ) {
			decisionResults[i] = results[questionCounter + i];
		}
		decision.process(character, decisionResults);
		questions.push(...decision.questions);
		decision = decision.getNext(character);
		questionCounter += questionCount;
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
