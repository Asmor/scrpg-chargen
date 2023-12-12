import { CharacterCreationStep } from "@/classes/Character";
import { getNewDecision } from "@/classes/Decision";
import { getPowerQualityQuestion } from "@/classes/questions/PowerQualityQuestion";
import { getPrincipleQuestion } from "@/classes/questions/PrincipleQuestion";

export const getBackgroundDetailsDecision: CharacterCreationStep = (stack) => {
	const decision = getNewDecision();

	// PowerQualityPicker
	decision.questions.push(getPowerQualityQuestion({
		title: "Background",
		getDice: (char) => char.aspects.background?.assignableDice || [],
		getSpecifiers: (char) => char.aspects.background?.assignablePqs || [],
		onUpdate: (decisionIndex) => stack.onUpdate(decisionIndex),
	}));
	// Principle
	decision.questions.push(getPrincipleQuestion({
		title: "Background Principle",
		getPrincipleCategory: (char) => char.aspects.background!.principleCategory,
		onUpdate: (decisionIndex) => stack.onUpdate(decisionIndex),
	}));
	// Power Source roll
	// decision.questions.push()

	return decision;
};
