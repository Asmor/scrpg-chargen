import Question from "./Question";

export default interface Decision {
	complete: boolean;
	questions: Question[];
	reset: Function;
}

export type DecisionUpdate = (decisionIndex: number) => void;

function reset(this: Decision) {
	this.questions.forEach(q => q.reset());
}

export const getNewDecision = (): Decision => {
	const decision: Decision = {
		complete: false,
		questions: [],
		reset,
	};

	Object.defineProperty(decision, "complete", {
		get: function () {
			return this.questions.every((q: Question) => q.complete);
		}
	});

	return decision;
};
