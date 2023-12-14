import { Die } from "@/types/common";
import { Question, QuestionType } from "../Question";
import { PowerCategory, PowerQuality, QualityCategory } from "@/data/powersQualities.types";
import { Character } from "../Character";
import { Background } from "@/data/backgrounds.types";
import { thawArray } from "@/util/util";
import { getPowerQualityById } from "@/data/powersQualities";

export interface PowerQualityQuestion extends Question {
	dice: Die[];
	specifiers: (string | PowerCategory | QualityCategory)[];
	used: PowerQuality[];
}

interface PowerQualityQuestionProps {
	title: string;
	character: Character;
}

export const getPowerQualityQuestion = (
	props: PowerQualityQuestionProps
): PowerQualityQuestion => {
	const bg = props.character.aspects.background as Background;
	const used = props.character.powersAndQualities.map(
		pq => pq.powerQuality
	);
	return {
		type: QuestionType.POWER_QUALITY_CHOICE,
		title: props.title,
		dice: bg.assignableDice,
		specifiers: bg.assignablePqs,
		used,
		freeze: (powerQualities: (PowerQuality | undefined)[]) => {
			return powerQualities.map(pq => pq?.id).join(",");
		},
		thaw: thawArray.bind(null, getPowerQualityById),
	};
};
