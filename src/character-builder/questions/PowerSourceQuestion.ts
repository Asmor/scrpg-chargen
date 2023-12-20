import { PowerSource } from "@/data/powerSourcesTypes";
import { Question, QuestionType } from "../Question";
import { ChooserOption, makeOption } from "@/components/forms/Chooser";
import { Character } from "../Character";
import powerSources, { getPowerSourceById } from "@/data/powerSources";
import { conjugateDicePoolOptions } from "@/util/dice";

export interface PowerSourceQuestion extends Question {
	options: ChooserOption<PowerSource>[];
	rolled: number[];
}

interface BackgroundQuestionProps {
	character: Character;
}

const powerSourceOptions = powerSources.map(ps => makeOption(ps));

export const getPowerSourceQuestion = (
	props: BackgroundQuestionProps
): PowerSourceQuestion => {
	return {
		type: QuestionType.POWER_SOURCE_CHOICE,
		critical: true,
		title: "Power Source",
		options: powerSourceOptions,
		rolled: conjugateDicePoolOptions(props.character.rolls.powerSource),
		freeze: (ps: PowerSource) => ps?.id || "",
		thaw: (frozenPs = "") => getPowerSourceById(frozenPs),
	}
}
