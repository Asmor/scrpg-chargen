"use client";

import { getnewDecisionStack, initializeStack } from "@/classes/DecisionStack";
import { BgChoiceQuestion, DiceRollQuestion, QuestionType } from "@/classes/Question.types";
import DicePool from "./DicePool";
import { useMemo, useReducer, useState } from "react";
import { getBackgroundRollDecision } from "@/classes/steps/01-backgroundRoll/BackgroundRollDecision";
import DecisionStack from "@/classes/DecisionStack.types";
import { getCharacterCache } from "@/classes/Character";
import { getChooseBackgroundDecision } from "@/classes/steps/02-chooseBackground/ChooseBackgroundDecision";
import Chooser, { ChooserOption } from "./Chooser";
import backgrounds from "@/data/backgrounds";
import { Entry } from "@/types/common";
import { conjugateDicePoolOptions } from "@/util/dice";
import { CharacterCreationStep } from "@/classes/Character.types";

const characterCreationSteps: CharacterCreationStep[] = [
	getBackgroundRollDecision,
	getChooseBackgroundDecision,
];

const makeOption = <T extends Entry,>(value: T): ChooserOption<T> => ({
	title: value.name,
	subtitle: `pg. ${value.page}`,
	value,
});

const backgroundOptions = backgrounds.map(makeOption);

const getQuestionElements = (stack: DecisionStack): JSX.Element[] => {
	console.log("xxy in getQuestionElements", Math.random());

	const { cached: char } = getCharacterCache(stack);

	initializeStack(stack, characterCreationSteps);

	const qEls: JSX.Element[] = [];

	stack.decisions.every((decision, di) => {
		qEls.push(...decision.questions.map((q, qi) => {
			const key = `${di}.${qi}`;
			switch (q.type) {
				case QuestionType.DICE_ROLL:
					const drq = q as DiceRollQuestion;
					return <DicePool
						key={key}
						title={drq.title}
						dice={drq.dice}
						onRoll={results => drq.set(di, results)}
						results={drq.results}
					/>;
				case QuestionType.BACKGROUND_CHOICE:
					const bcq = q as BgChoiceQuestion;
					return <Chooser
						key={key}
						title={bcq.title}
						options={backgroundOptions}
						onSelectOption={(bg) => bcq.set(di, bg)}
						selected={bcq.choice}
						rolled={conjugateDicePoolOptions(char.rolls.background)}
					/>;
				default:
					return <>Unhandled question type: {q.type}</>
			}
		}));

		return decision.complete;
	});

	return qEls;
};

const CharacterBuilder = () => {
	const [, forceUpdate] = useReducer(x => x + 1, 0);
	const stack = useMemo(
		() => getnewDecisionStack(forceUpdate),
		[forceUpdate]
	);
	const { cached: char, key: charCacheKey } = getCharacterCache(stack);
	// const cachedCharKey = useState(charCacheKey);

	// if ( charCacheKey !== )

	console.log("xxy CharacterBuilder beginning", {charCacheKey});
	const questionEls = useMemo(() => {
		return getQuestionElements(stack);
	}, [charCacheKey]);

	return <> { questionEls } </>
};

export default CharacterBuilder;
