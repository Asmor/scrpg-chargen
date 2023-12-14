"use client";

import DicePool from "./DicePool";
import { useMemo, useReducer, useState } from "react";
import Character, { CharacterCreationStep, getNewCharacter } from "@/classes/Character";
import Chooser, { ChooserOption } from "./Chooser";
import backgrounds from "@/data/backgrounds";
import { Entry } from "@/types/common";
import { conjugateDicePoolOptions } from "@/util/dice";
import Question, { QuestionType } from "@/classes/Question";
import { DiceRollQuestion } from "@/classes/questions/DiceRollQuestion";
import { BgChoiceQuestion } from "@/classes/questions/BackgroundChoiceQuestion";
import { PowerQualityQuestion } from "@/classes/questions/PowerQualityQuestion";
import PowerQualityPicker from "./PowerQualityPicker";
import { PrincipleQuestion } from "@/classes/questions/PrincipleQuestion";
import powerSources from "@/data/powerSources";
import { getBackgroundRollDecision } from "@/classes/decisions/BackgroundRollDecision";
import { Decision } from "@/classes/Decision";

const FIRST_STEP = getBackgroundRollDecision;

const makeOption = <T extends Entry,>(value: T): ChooserOption<T> => ({
	title: value.name,
	subtitle: `pg. ${value.page}`,
	value,
});

const backgroundOptions = backgrounds.map(makeOption);
const powerSourceOptions = powerSources.map(makeOption);

const getElementByQuestionType = (
	question: Question,
	key: string,
	char: Character,
	forceUpdate: () => void,
) => {
	switch (question.type) {
		case QuestionType.DICE_ROLL:
			const drq = question as DiceRollQuestion;
			return <DicePool
				key={key}
				title={drq.title}
				dice={drq.getDice(char)}
				onRoll={results => {
					drq.set(results);
					forceUpdate();
				}}
				results={drq.results}
			/>;
		case QuestionType.BACKGROUND_CHOICE:
			const bcq = question as BgChoiceQuestion;
			return <Chooser
				key={key}
				title={bcq.title}
				options={backgroundOptions}
				onSelectOption={(bg) => {
					bcq.set(bg);
					forceUpdate();
				}}
				selected={bcq.choice}
				rolled={conjugateDicePoolOptions(char.rolls.background)}
			/>;
		case QuestionType.POWER_QUALITY_CHOICE:
			const pqq = question as PowerQualityQuestion;
			return <PowerQualityPicker
				key={key}
				title={pqq.title}
				dice={pqq.getDice(char)}
				specifiers={pqq.getSpecifiers(char)}
				selected={pqq.powerQualities}
				onSelect={selections => {
					pqq.set(char, selections);
					forceUpdate();
				}}
				used={char.powersAndQualities.map(pqData => pqData.powerQuality)}
			/>
		case QuestionType.PRINCIPLE_CHOICE:
			const pq = question as PrincipleQuestion;
			return <Chooser
				key={key}
				title={pq.title}
				options={pq.getOptions(char)}
				onSelectOption={(principle) =>{
					 pq.set(principle);
					 forceUpdate();
					}}
				selected={pq.principle}
			/>
		default:
			return <>Unhandled question type: {question.type}</>
	}
};

const getQuestionElements = (
	questions: Question[],
	char: Character,
	forceUpdate: () => void
): JSX.Element[] => {
	const qEls: JSX.Element[] = questions.map(
		(question, qIndex) => getElementByQuestionType(question, qIndex.toString(), char, forceUpdate)
	);

	return qEls;
};

const CharacterBuilder = () => {
	const [, forceUpdate] = useReducer(x => x + 1, 0);
	// todo update cache key
	const [charCacheKey, setCharCacheKey] = useState("");


	const questions: Question[] = useMemo(() => {
		const questions: Question[] = [];
		let currentStep: CharacterCreationStep | null = FIRST_STEP;
		let lastDecision: Decision | undefined;

		while (currentStep) {
			const currentDecision = currentStep("todo state string", lastDecision);
			questions.push(...currentDecision.questions);
			lastDecision = currentDecision;
			currentStep = currentDecision.next?.(currentDecision) || null
		}

		return questions;
	}, []);

	// todo get actual values for these
	const char: Character = useMemo(() => getNewCharacter(), []);

	const questionEls = useMemo(() => {
		return getQuestionElements(questions, char, forceUpdate);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [charCacheKey]);

	return <> { questionEls } </>
};

export default CharacterBuilder;
