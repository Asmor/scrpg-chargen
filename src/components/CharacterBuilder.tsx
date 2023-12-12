"use client";

import DecisionStack, { getnewDecisionStack, initializeStack } from "@/classes/DecisionStack";
import DicePool from "./DicePool";
import { useMemo, useReducer } from "react";
import { getBackgroundRollDecision } from "@/classes/steps/01-backgroundRoll/BackgroundRollDecision";
import { CharacterCreationStep, getCharacterCache } from "@/classes/Character";
import { getChooseBackgroundDecision } from "@/classes/steps/02-chooseBackground/ChooseBackgroundDecision";
import Chooser, { ChooserOption } from "./Chooser";
import backgrounds from "@/data/backgrounds";
import { Entry } from "@/types/common";
import { conjugateDicePoolOptions } from "@/util/dice";
import { QuestionType } from "@/classes/Question";
import { DiceRollQuestion } from "@/classes/questions/DiceRollQuestion";
import { BgChoiceQuestion } from "@/classes/questions/BackgroundChoiceQuestion";
import { PowerQualityQuestion } from "@/classes/questions/PowerQualityQuestion";
import PowerQualityPicker from "./PowerQualityPicker";
import { getBackgroundDetailsDecision } from "@/classes/steps/03-backgroundDetails/BackgroundDetailsDecision";

const characterCreationSteps: CharacterCreationStep[] = [
	getBackgroundRollDecision,
	getChooseBackgroundDecision,
	getBackgroundDetailsDecision,
];

const makeOption = <T extends Entry,>(value: T): ChooserOption<T> => ({
	title: value.name,
	subtitle: `pg. ${value.page}`,
	value,
});

const backgroundOptions = backgrounds.map(makeOption);

const getQuestionElements = (stack: DecisionStack): JSX.Element[] => {
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
				case QuestionType.POWER_QUALITY_CHOICE:
					// todo pq choices from one picker aren't blocking those
					// options in other pickers. It seems like the second set of
					// pickers is getting the same "selected" values
					const pqq = q as PowerQualityQuestion;
					return <PowerQualityPicker
						key={key}
						title={pqq.title}
						dice={pqq.getDice(char)}
						specifiers={pqq.getSpecifiers(char)}
						selected={pqq.powerQualities}
						onSelect={selections => pqq.set(di, char, selections)}
						used={char.powersAndQualities.map(pqData => pqData.powerQuality)}
					/>
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

	const questionEls = useMemo(() => {
		return getQuestionElements(stack);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [charCacheKey, stack]);

	return <> { questionEls } </>
};

export default CharacterBuilder;
