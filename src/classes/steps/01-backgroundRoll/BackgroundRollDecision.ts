import { CharacterCreationStep } from "@/classes/Character";
import { getNewDecision } from "@/classes/Decision";
import { getDiceRollQuestion } from "@/classes/questions/DiceRollQuestion";

export const getBackgroundRollDecision: CharacterCreationStep = (stack) => {
	const decision = getNewDecision();

	decision.questions.push(getDiceRollQuestion({
		title: "Background",
		dice: [10, 10],
		onUpdate: (decisionIndex: number) => stack.onUpdate(decisionIndex),
	}));

	return decision;
};
