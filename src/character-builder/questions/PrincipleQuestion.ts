import { ChooserOption, makeOption } from "@/components/Chooser";
import { Question, QuestionType } from "../Question";
import { Principle, PrincipleCategory } from "@/data/principles.types";
import principles, { getPrincipleById } from "@/data/principles";
import { Character } from "../Character";

export interface PrincipleQuestion extends Question {
	options: ChooserOption<Principle>[];
}

const principleOptions = principles.map(prin => makeOption(prin));

interface PrincipleQuestionProps {
	character: Character;
	title: string;
	category: PrincipleCategory;
}

export const getPrincipleQuestion = (
	props: PrincipleQuestionProps
): PrincipleQuestion => {
	return {
		type: QuestionType.PRINCIPLE_CHOICE,
		title: props.title,
		options: principleOptions.filter(option => option.value.category === props.category),
		freeze: (principle: Principle) => principle.id,
		thaw: (frozenPrinciple = "") => getPrincipleById(frozenPrinciple),
	};
};
