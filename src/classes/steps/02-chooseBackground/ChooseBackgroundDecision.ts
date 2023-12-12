import { CharacterCreationStep } from "@/classes/Character.types";
import { getNewDecision } from "@/classes/Decision";
import { getBackgroundChoiceQuestion } from "@/classes/Question";

export const getChooseBackgroundDecision: CharacterCreationStep = (stack) => {
	const decision = getNewDecision();

	decision.questions.push(getBackgroundChoiceQuestion({
		title: "Background",
		onUpdate: (decisionIndex) => stack.onUpdate(decisionIndex),
	}));

	return decision;
};
