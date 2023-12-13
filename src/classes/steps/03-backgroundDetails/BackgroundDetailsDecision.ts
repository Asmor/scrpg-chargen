import { CharacterCreationStep } from "@/classes/Character";
import { getNewDecision } from "@/classes/Decision";
import { getDiceRollQuestion } from "@/classes/questions/DiceRollQuestion";
import { getPowerQualityQuestion } from "@/classes/questions/PowerQualityQuestion";
import { getPrincipleQuestion } from "@/classes/questions/PrincipleQuestion";

export const getBackgroundDetailsDecision: CharacterCreationStep = (stack) => {
	const decision = getNewDecision();

	decision.questions.push(getPowerQualityQuestion({
		title: "Background",
		getDice: (char) => char.aspects.background?.assignableDice || [],
		getSpecifiers: (char) => char.aspects.background?.assignablePqs || [],
		onUpdate: (decisionIndex) => stack.onUpdate(decisionIndex),
	}));
	decision.questions.push(getPrincipleQuestion({
		title: "Background Principle",
		getPrincipleCategory: (char) => char.aspects.background!.principleCategory,
		onUpdate: (decisionIndex) => stack.onUpdate(decisionIndex),
	}));
	decision.questions.push(getDiceRollQuestion({
		title: "Power Source",
		getDice: function (char) {
			return char.aspects.background!.powerSourceDice;
		},
		onUpdate: (decisionIndex) => stack.onUpdate(decisionIndex),
	}));

	return decision;
};
