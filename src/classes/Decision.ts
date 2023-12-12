import Decision from "./Decision.types";
import Question from "./Question.types";

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
