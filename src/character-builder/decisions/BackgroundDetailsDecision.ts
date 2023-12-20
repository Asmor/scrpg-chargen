import { Character } from "../Character";
import { Decision } from "../Decision";
import { getDiceRollQuestion } from "../questions/DiceRollQuestion";
import { getPowerQualityQuestion } from "../questions/PowerQualityQuestion";
import { getPowerSourceChoiceDecision } from "./PowerSourceDecision";
import { getPrincipleQuestion } from "../questions/PrincipleQuestion";
import { Background } from "@/data/backgrounds.types";
import { PowerQuality } from "@/data/powersQualities.types";
import { Principle } from "@/data/principles.types";
import { getAbilityQuestion } from "../questions/AbilityQuestion";

interface BackgroundDetailsDecisionProps {
	character: Character;
}

export interface BackgroundDetailsResults {
	powerQualityIds: string[],
	powerSourceRolls: number[],
}

export const getBackgroundDetailsDecision = (
	props: BackgroundDetailsDecisionProps
): Decision => {
	const bg = props.character.aspects.background as Background;
	return {
		questions: [
			getPowerQualityQuestion({
				title: "Background",
				character: props.character,
			}),
			getPrincipleQuestion({
				title: `${bg.principleCategory} Principle`,
				character: props.character,
				category: bg.principleCategory,
			}),
			getDiceRollQuestion({
				title: "Power Source",
				dice: bg.powerSourceDice,
			}),
		],
		process(character, frozenResults) {
			const thawedResults = frozenResults.map((result, index) => this.questions[index].thaw(result));
			const powerQualities: (PowerQuality | undefined)[] = thawedResults[0];
			const principle: Principle = thawedResults[1];
			const powerSourceRolls: number[] = thawedResults[2] || [];

			const pqDice = character.aspects.background!.assignableDice;

			pqDice.forEach((die, index) => {
				const powerQuality = powerQualities[index];

				if ( powerQuality ) {
					character.powersAndQualities.push({ powerQuality, die });
				}
			});

			if ( principle ) {
				// todo also add principle's ability
				character.aspects.principles.push(principle);
			}

			character.rolls.powerSource = powerSourceRolls;
		},
		getNext(character) {
			if ( character.rolls.powerSource.length ) {
				return getPowerSourceChoiceDecision({ character });
			}
			return null;
		}
	};
};
