import { Character } from "../Character";
import { Decision } from "../Decision";
import { getAbilityQuestion } from "../questions/AbilityQuestion";
import { PowerSource } from "@/data/powerSourcesTypes";
import { getPowerQualityQuestion } from "../questions/PowerQualityQuestion";
import { PowerQuality } from "@/data/powersQualities.types";

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
			getPowerQualityQuestion({
				title: "Select Power Source Powers & Qualities",
				character: props.character,
				assignableDice: props.character.aspects.background!.powerSourceDice,
				assignablePqs: props.character.aspects.powerSource!.assignablePqs,
			}),
			getAbilityQuestion({
				title: "Select Power Source Abilities",
				availableIds: ps.abilities,
				usedIds: [], // todo,
				greenPicks: ps.greenPicks || 0,
				yellowPicks: ps.yellowPicks || 0,
				redPicks: ps.redPicks || 0,
				availablePqSpecifiers: ps.assignablePqs,
				character: props.character,
			}),
		],
		process(character, frozenResults) {
			const thawedResults = frozenResults.map(
				(result, index) => this.questions[index].thaw(result)
			);

			const powerQualities: (PowerQuality | undefined)[] = thawedResults[0];
			const pqDice = character.aspects.background?.powerSourceDice || [];

			pqDice.forEach((die, index) => {
				const powerQuality = powerQualities[index];
				if ( powerQuality ) {
					character.powersAndQualities.push({ powerQuality, die });
				}
			});

			// todo currently only powers and qualities are added to character
		},
		getNext(character) {
			return null;
		},
	};
};
