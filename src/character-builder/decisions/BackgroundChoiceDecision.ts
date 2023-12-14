import { getBackgroundById } from "@/data/backgrounds";
import { Character } from "../Character";
import { Decision } from "../Decision";
import { getBgChoiceQuestion } from "../questions/BackgroundQuestion";

interface BackgroundChoiceDecisionProps {
	character: Character;
}

export type BackgroundChoiceDecisionResults = string;

export const getBackgroundChoiceDecision = (
	props: BackgroundChoiceDecisionProps,
): Decision => {
	return {
		questions: [
			getBgChoiceQuestion({ character: props.character }),
		],
		process(character, results?: BackgroundChoiceDecisionResults) {
			const bg = getBackgroundById(results || "");
			character.aspects.background = bg;
		},
		getNext() {
			return null;
		}
	};
}
