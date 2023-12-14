import { Die } from "@/types/common";
import { Decision } from "../Decision";
import { Results } from "../Question";
import { getDiceRollQuestion } from "../questions/DiceRollQuestion";

interface BackgroundRollDecisionProps {
	title: string;
	dice: Die[];
}

export interface BackgroundRollDecisionResults extends Results {
	rolls: number[];
}

export const getBackgroundRollDecision = (
	props: BackgroundRollDecisionProps,
	results?: BackgroundRollDecisionResults
): Decision => {
	return {
		questions: [
			getDiceRollQuestion({ title: props.title, dice: props.dice }),
		],
		process(character, results: BackgroundRollDecisionResults | undefined) {
			character.rolls.background = results?.rolls || [];
		},
		getNext() {
			return results?.rolls?.length ? null : null;
		}
	};
};
