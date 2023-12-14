import { Character } from "../Character";
import { Decision } from "../Decision";
import { getPowerSourceQuestion } from "../questions/PowerSourceQuestion";
import { getPowerSourceById } from "@/data/powerSources";

interface PowerSourceDecisionProps {
	character: Character;
}

export const getPowerSourceChoiceDecision = (
	props: PowerSourceDecisionProps,
): Decision => {
	return {
		questions: [
			getPowerSourceQuestion({ character: props.character }),
		],
		process(character, results) {
			const ps = getPowerSourceById(results[0] || "");
			character.aspects.powerSource = ps;
		},
		getNext(character) {
			if ( character.aspects.powerSource ) {
				// return getPowerSourceDetailsDecision({ character });
				return null;
			}
			return null;
		}
	};
}
