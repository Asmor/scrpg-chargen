import { ChooserOption, makeOption } from "@/components/forms/Chooser";
import { Question, QuestionType } from "../Question";
import { Background } from "@/data/backgrounds.types";
import backgrounds, { getBackgroundById } from "@/data/backgrounds";
import { conjugateDicePoolOptions } from "@/util/dice";
import { Character } from "../Character";

export interface BackgroundQuestion extends Question {
	options: ChooserOption<Background>[];
	rolled: number[];
}

interface BackgroundQuestionProps {
	character: Character;
}

const backgroundOptions = backgrounds.map(bg => makeOption(bg));

export const getBackgroundQuestion = (
	props: BackgroundQuestionProps
): BackgroundQuestion => {
	return {
		type: QuestionType.BACKGROUND_CHOICE,
		critical: true,
		title: "Select a Background",
		options: backgroundOptions,
		rolled: conjugateDicePoolOptions(props.character.rolls.background),
		freeze: (bg: Background) => bg?.id || "",
		thaw: ( frozenBg = "" ): Background | undefined =>
			getBackgroundById(frozenBg),
	}
}
