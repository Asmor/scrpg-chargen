import { ChooserOption, makeOption } from "@/components/Chooser";
import { Question, QuestionType } from "../Question";
import { Background } from "@/data/backgrounds.types";
import backgrounds from "@/data/backgrounds";
import { conjugateDicePoolOptions } from "@/util/dice";
import { Character } from "../Character";

export interface BackgroundQuestion extends Question {
	options: ChooserOption<Background>[];
	rolled: number[];
}

// background ID
export type BackgroundQuestionResults = string;

interface BackgroundQuestionProps {
	character: Character;
}

const backgroundOptions = backgrounds.map(bg => makeOption(bg));

export const getBgChoiceQuestion = (
	props: BackgroundQuestionProps
): BackgroundQuestion => {
	return {
		type: QuestionType.BACKGROUND_CHOICE,
		title: "Background",
		options: backgroundOptions,
		rolled: conjugateDicePoolOptions(props.character.rolls.background),
	}
}
