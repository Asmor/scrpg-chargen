import { CharacterCreationStep } from "@/classes/Character";
import { getNewDecision } from "@/classes/Decision";
import { getDiceRollQuestion } from "@/classes/questions/DiceRollQuestion";
import { Die } from "@/types/common";

const backgroundDice: Die[] = [10, 10];

export const getBackgroundRollDecision: CharacterCreationStep = (stack) => {
	const decision = getNewDecision();

	decision.questions.push(getDiceRollQuestion({
		title: "Background",
		getDice: () => backgroundDice,
		onUpdate: (decisionIndex: number) => stack.onUpdate(decisionIndex),
	}));

	return decision;
};
