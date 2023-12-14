import { getBackgroundById } from "@/data/backgrounds";
import { Character } from "../Character";
import { Decision } from "../Decision";
import { getBackgroundQuestion } from "../questions/BackgroundQuestion";
import { getBackgroundDetailsDecision } from "./BackgroundDetailsDecision";

interface BackgroundChoiceDecisionProps {
	character: Character;
}

export type BackgroundChoiceDecisionResults = string;

export const getBackgroundChoiceDecision = (
	props: BackgroundChoiceDecisionProps,
): Decision => {
	return {
		questions: [
			getBackgroundQuestion({ character: props.character }),
		],
		process(character, results) {
			const bg = getBackgroundById(results[0] || "");
			character.aspects.background = bg;
		},
		getNext(character) {
			if ( character.aspects.background ) {
				return getBackgroundDetailsDecision({ character });
			}
			return null;
		},
	};
}
