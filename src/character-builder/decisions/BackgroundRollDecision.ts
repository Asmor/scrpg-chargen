import { Die } from "@/types/common";
import { Decision } from "../Decision";
import { getDiceRollQuestion } from "../questions/DiceRollQuestion";
import { getBackgroundChoiceDecision } from "./BackgroundChoiceDecision";

interface BackgroundRollDecisionProps {
	dice: Die[];
}

export type BackgroundRollDecisionResults = number[];

export const getBackgroundRollDecision = (
	props: BackgroundRollDecisionProps
): Decision => {
	return {
		questions: [
			getDiceRollQuestion({
				title: "Roll for your Background",
				dice: props.dice,
			}),
		],
		process(character, results) {
			character.rolls.background = this.questions[0].thaw(results[0]);
		},
		getNext(character) {
			if (character.rolls.background.length ) {
				return getBackgroundChoiceDecision({ character });
			}

			return null;
		}
	};
};
