"use client";

import backgrounds, { getBackgroundById } from "@/data/backgrounds";
import Chooser, { makeOption } from "./Chooser";
import powerSources from "@/data/powerSources";
import DicePool from "./DicePool";
import scrpgDirector from "@/character-builder/Director";
import { useCallback, useState } from "react";
import { isEqual } from "lodash";
import { Question, QuestionType, Results } from "@/character-builder/Question";
import { DiceRollQuestion, DiceRollQuestionResults } from "@/character-builder/questions/DiceRollQuestion";
import { getBackgroundRollDecision } from "@/character-builder/decisions/BackgroundRollDecision";
import { BackgroundQuestion, BackgroundQuestionResults } from "@/character-builder/questions/BackgroundQuestion";
import { PowerQualityQuestion, PowerQualityQuestionResults } from "@/character-builder/questions/PowerQualityQuestion";
import PowerQualityPicker from "./PowerQualityPicker";
import { getPowerQualityById } from "@/data/powersQualities";

const backgroundOptions = backgrounds.map(makeOption);
const powerSourceOptions = powerSources.map(makeOption);

const getElementByQuestionType = (
	question: Question,
	key: string,
	results: Results,
	setResults: (results: Results) => void,
) => {
	switch (question.type) {
		case QuestionType.DICE_ROLL:
			const drq = question as DiceRollQuestion;
			const drqResults: DiceRollQuestionResults = results ? results as DiceRollQuestionResults : [];

			return <DicePool
				key={key}
				title={drq.title}
				dice={drq.dice}
				onRoll={results => {
					setResults(results);
				}}
				results={drqResults}
			/>;
		case QuestionType.BACKGROUND_CHOICE:
			const bcq = question as BackgroundQuestion;
			const bcqResults: BackgroundQuestionResults = results ? results as BackgroundQuestionResults : "";
			return <Chooser
				key={key}
				title={bcq.title}
				options={bcq.options}
				onSelectOption={(bg) => {
					setResults(bg.id);
				}}
				selected={getBackgroundById(bcqResults)}
				rolled={bcq.rolled}
			/>;
		case QuestionType.POWER_QUALITY_CHOICE:
			const pqq = question as PowerQualityQuestion;
			const pqqResults: PowerQualityQuestionResults = results ? results as PowerQualityQuestionResults : [];
			return <PowerQualityPicker
				key={key}
				title={pqq.title}
				dice={pqq.dice}
				specifiers={pqq.specifiers}
				selected={pqqResults.map(getPowerQualityById)}
				onSelect={selections => {
					setResults(selections.map(pqq => pqq?.id));
				}}
				used={pqq.used}
			/>
		// case QuestionType.PRINCIPLE_CHOICE:
		// 	const pq = question as PrincipleQuestion;
		// 	return <Chooser
		// 		key={key}
		// 		title={pq.title}
		// 		options={pq.getOptions(char)}
		// 		onSelectOption={(principle) =>{
		// 			 pq.set(principle);
		// 			 forceUpdate();
		// 			}}
		// 		selected={pq.principle}
		// 	/>
		default:
			return <>Unhandled question type: {question.type}</>
	}
};

const CharacterBuilder = () => {
	const [resultsStack, setResultsStack] = useState<Results[]>([]);

	const setResults = useCallback((index: number, incomingResults: Results) => {
		if (!isEqual(resultsStack[index], incomingResults)) {
			resultsStack[index] = incomingResults;
			setResultsStack([...resultsStack]);
		}
	}, [resultsStack, setResultsStack]);

	const firstDecision = getBackgroundRollDecision({
		dice: [10, 10],
		title: "Background",
	});

	const { questions, character } = scrpgDirector({
		startingDecision: firstDecision,
		results: resultsStack,
	});

	const questionEls = questions.map(
		(question, index) => getElementByQuestionType(
			question,
			index.toString(),
			resultsStack[index],
			(results: Results) => setResults(index, results),
		)
	);

	// console.log("xxy", questions, character)

	return <>{ questionEls }</>
};

export default CharacterBuilder;
