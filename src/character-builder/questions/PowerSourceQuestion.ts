import { PowerSource } from "@/data/powerSourcesTypes";
import { Question, QuestionType } from "../Question";
import { ChooserOption, makeOption } from "@/components/Chooser";
import { Character } from "../Character";
import powerSources from "@/data/powerSources";
import { conjugateDicePoolOptions } from "@/util/dice";

export interface PowerSourceQuestion extends Question {
	options: ChooserOption<PowerSource>[];
	rolled: number[];
}

// background ID
export type BackgroundQuestionResults = string;

interface BackgroundQuestionProps {
	character: Character;
}

const powerSourceOptions = powerSources.map(ps => makeOption(ps));

export const getPowerSourceQuestion = (
	props: BackgroundQuestionProps
): PowerSourceQuestion => {
	return {
		type: QuestionType.POWER_SOURCE_CHOICE,
		title: "Power Source",
		options: powerSourceOptions,
		rolled: conjugateDicePoolOptions(props.character.rolls.powerSource),
	}
}
