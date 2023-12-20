import { Question, QuestionType } from "../Question";
import { Principle, PrincipleCategory } from "@/data/principles.types";
import principles, { getPrincipleById } from "@/data/principles";
import { Character } from "../Character";
import { ChooserOption, makeOption } from "@/components/forms/Chooser";

export interface PrincipleQuestion extends Question {
	options: ChooserOption<Principle>[];
	for: "Background" | "Archetype";
}

const principleOptions = principles.map(prin => makeOption(prin));

interface PrincipleQuestionProps {
	character: Character;
	title: string;
	category: PrincipleCategory;
	for: "Background" | "Archetype";
}

export const getPrincipleQuestion = (
	props: PrincipleQuestionProps
): PrincipleQuestion => {
	return {
		type: QuestionType.PRINCIPLE_CHOICE,
		title: props.title,
		options: principleOptions.filter(option => option.value.category === props.category),
		for: props.for,
		freeze: (principle: Principle) => principle?.id || "",
		thaw: (frozenPrinciple = "") => getPrincipleById(frozenPrinciple),
	};
};
