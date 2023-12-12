import { CharacterCreationStep } from "@/classes/Character.types";
import { getNewDecision } from "@/classes/Decision";
import { getDiceRollQuestion } from "@/classes/Question";

export const getBackgroundRollDecision: CharacterCreationStep = (stack) => {
	const decision = getNewDecision();

	decision.questions.push(getDiceRollQuestion({
		title: "Background",
		dice: [10, 10],
		onUpdate: (decisionIndex: number) => stack.onUpdate(decisionIndex),
	}));

	return decision;
};
