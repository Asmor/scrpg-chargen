import Decision from "./Decision.types";
import Question from "./Question.types";

export const getNewDecision = (): Decision => {
	const decision: Decision = {
		complete: false,
		questions: [],
	};

	Object.defineProperty(decision, "complete", {
		get: function () {
			return this.questions.every((q: Question) => q.complete);
		}
	});

	return decision;
};
