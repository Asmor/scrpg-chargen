import { getPowerQualityById } from "@/data/powersQualities";
import { Character } from "../Character";
import { Decision } from "../Decision";
import { getDiceRollQuestion } from "../questions/DiceRollQuestion";
import { getPowerQualityQuestion } from "../questions/PowerQualityQuestion";
import { getPowerSourceChoiceDecision } from "./PowerSourceDecision";
import { getPrincipleQuestion } from "../questions/PrincipleQuestion";
import { getPrincipleById } from "@/data/principles";
import { Background } from "@/data/backgrounds.types";

interface BackgroundDetailsDecisionProps {
	character: Character;
}

export interface BackgroundDetailsDecisionResults {
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
		process(character, results) {
			const [powerQualityids, principleId, powerSourceRolls] = results;
			const pqDice = character.aspects.background!.assignableDice;

			pqDice.forEach((die, index) => {
				const powerQualityId = powerQualityids?.[index];
				const powerQuality = getPowerQualityById(powerQualityId);

				if ( powerQuality ) {
					character.powersAndQualities.push({ powerQuality, die });
				}
			});

			const principle = getPrincipleById(principleId);
			if ( principle ) {
				character.aspects.principles.push(principle);
			}

			character.rolls.powerSource = powerSourceRolls || [];
		},
		getNext(character) {
			if ( character.rolls.powerSource.length ) {
				return getPowerSourceChoiceDecision({ character });
			}
			return null;
		}
	};
};
