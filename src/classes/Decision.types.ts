import Question from "./Question.types";

export default interface Decision {
	complete: boolean;
	questions: Question[];
	reset: Function;
}

export type DecisionUpdate = (decisionIndex: number) => void;
