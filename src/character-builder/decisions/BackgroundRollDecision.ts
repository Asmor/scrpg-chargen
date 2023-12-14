import { Die } from "@/types/common";
import { Decision } from "../Decision";
import { Results } from "../Question";
import { getDiceRollQuestion } from "../questions/DiceRollQuestion";
import { getBackgroundChoiceDecision } from "./BackgroundChoiceDecision";

interface BackgroundRollDecisionProps {
	title: string;
	dice: Die[];
}

export type BackgroundRollDecisionResults = number[];

export const getBackgroundRollDecision = (
	props: BackgroundRollDecisionProps
): Decision => {
	return {
		questions: [
			getDiceRollQuestion({
				title: props.title,
				dice: props.dice,
			}),
		],
		process(character, results) {
			character.rolls.background = results[0] || [];
		},
		getNext(character) {
			if (character.rolls.background.length ) {
				return getBackgroundChoiceDecision({ character });
			}

			return null;
		}
	};
};
