import { PowerQuality, PowerQualitySpecifier } from "@/data/powersQualities.types";
import Question, { QuestionProps, QuestionType } from "../Question";
import { getPowerQualityById } from "@/data/powersQualities";
import { Die } from "@/types/common";
import Character from "../Character";

export interface PowerQualityQuestionProps extends QuestionProps {
	getDice: (char: Character) => Die[];
	getSpecifiers: (char: Character) => (string | PowerQualitySpecifier)[];
}
export interface PowerQualityQuestion extends Question {
	set: (
		decisionIndex: number,
		char: Character,
		selections: (PowerQuality | undefined)[]
	) => void;
	powerQualities: (PowerQuality | undefined)[];
	getDice: (char: Character) => Die[];
	getSpecifiers: (char: Character) => (string | PowerQualitySpecifier)[];
}

const isPqChoiceComplete = (
	powerQualities: (PowerQuality | undefined)[],
	dice: Die[],
): boolean => {
	if ( !dice.length ) return false;
	if ( powerQualities.length !== dice.length ) return false;

	return powerQualities.every(pq => pq);
}

export const getPowerQualityQuestion = (
	props: PowerQualityQuestionProps,
	saved?: string
): PowerQualityQuestion => {
	const powerQualities = saved?.split(",").map(getPowerQualityById) || [];

	const pqq: PowerQualityQuestion = {
		type: QuestionType.POWER_QUALITY_CHOICE,
		title: props.title,
		powerQualities: powerQualities,
		// todo see if I can find a way to set this based on saved value
		complete: false,
		getDice: props.getDice,
		getSpecifiers: props.getSpecifiers,
		reset: function () {
			this.powerQualities = [];
			this.complete = false;
		},
		set: function (decisionIndex, char, selections) {
			this.powerQualities = selections;
			this.complete = isPqChoiceComplete(
				this.powerQualities,
				this.getDice(char)
			);
			props.onUpdate(decisionIndex);
		},
		update: function (char) {
			this.powerQualities.forEach((powerQuality, index) => {
				if (!powerQuality ) {
					return;
				}

				char.powersAndQualities.push({
					powerQuality,
					die: this.getDice(char)[index],
				});
			});
			return this.powerQualities.map(pq => pq?.id || "").join(",");
		},
	};

	return pqq;
};
