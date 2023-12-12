import { getNewDecision } from "@/classes/Decision";
import Decision from "@/classes/Decision.types";
import { getDiceRollQuestion } from "@/classes/Question";

export const getBackgroundRollDecision = (): Decision => {
	const decision = getNewDecision();

	decision.questions.push(getDiceRollQuestion({
		title: "Background",
		dice: [10, 10],
	}));

	return decision;
};
