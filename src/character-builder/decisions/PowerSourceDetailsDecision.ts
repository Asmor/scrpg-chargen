import { Character } from "../Character";
import { Decision } from "../Decision";
import { getAbilityQuestion } from "../questions/AbilityQuestion";
import { PowerSource } from "@/data/powerSourcesTypes";

interface PowerSourceDetailsProps {
	character: Character;
}

export interface PowerSourceDetailsResults {
}

export const getPowerSourceDetailsDecision = (
	props: PowerSourceDetailsProps
): Decision => {
	const ps = props.character.aspects.powerSource as PowerSource;
	return {
		questions: [
			getAbilityQuestion({
				title: "TODO Power Source abilities",
				availableIds: ps.abilities,
				usedIds: [], // todo,
				greenPicks: ps.greenPicks || 0,
				yellowPicks: ps.yellowPicks || 0,
				redPicks: ps.redPicks || 0,
				availablePqSpecifiers: ps.assignablePqs,
				character: props.character,
				results: "", // todo
			}),
		],
		process(character, frozenResults) {
			// todo
		},
		getNext(character) {
			return null;
		},
	};
};
