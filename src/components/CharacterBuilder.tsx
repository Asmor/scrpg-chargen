"use client";

import Chooser, { makeOption } from "./Chooser";
import DicePool from "./DicePool";
import scrpgDirector from "@/character-builder/Director";
import { useCallback, useMemo, useState } from "react";
import { isEqual } from "lodash";
import { Question, QuestionType, Results } from "@/character-builder/Question";
import { DiceRollQuestion } from "@/character-builder/questions/DiceRollQuestion";
import { getBackgroundRollDecision } from "@/character-builder/decisions/BackgroundRollDecision";
import { BackgroundQuestion } from "@/character-builder/questions/BackgroundQuestion";
import { PowerQualityQuestion } from "@/character-builder/questions/PowerQualityQuestion";
import PowerQualityPicker from "./PowerQualityPicker";
import { Character } from "@/character-builder/Character";
import { PowerSourceQuestion } from "@/character-builder/questions/PowerSourceQuestion";
import { PrincipleQuestion } from "@/character-builder/questions/PrincipleQuestion";
import IdAudit from "./IdAudit";
import AbilityConfigurator, { AbilityConfiguration } from "./AbilityConfigurator";
import abilities, { getAbilityById } from "@/data/abilities";
import powersAndQualities from "@/data/powersQualities";
import { Ability } from "@/data/abilities.types";
import backgrounds from "@/data/backgrounds";
import { Background } from "@/data/backgrounds.types";

const getElementByQuestionType = (
	character: Character,
	question: Question,
	key: string,
	results: Results,
	setResults: (results: Results) => void,
) => {
	const freezeResults = (results: any) => {
		console.log("xxy freezeResults", results);
		setResults(
			question.freeze(results)
		)
	};

	const currentResults = question.thaw(results);
	switch (question.type) {
		case QuestionType.DICE_ROLL:
			const drq = question as DiceRollQuestion;
			return <DicePool
				key={key}
				title={drq.title}
				dice={drq.dice}
				onRoll={freezeResults}
				results={currentResults}
			/>;
		case QuestionType.BACKGROUND_CHOICE:
			const bcq = question as BackgroundQuestion;
			console.log("xxy bcq", {currentResults})
			return <Chooser
				key={key}
				title={bcq.title}
				options={bcq.options}
				onSelectOption={results => freezeResults(results[0])}
				selected={[currentResults]}
				rolled={bcq.rolled}
			/>;
		case QuestionType.POWER_SOURCE_CHOICE:
			const psq = question as PowerSourceQuestion;
			return <Chooser
				key={key}
				title={psq.title}
				options={psq.options}
				onSelectOption={results => freezeResults(results[0])}
				selected={[currentResults]}
				rolled={psq.rolled}
			/>;
		case QuestionType.PRINCIPLE_CHOICE:
			const pq = question as PrincipleQuestion;
			return <Chooser
				key={key}
				title={pq.title}
				options={pq.options}
				onSelectOption={results => freezeResults(results[0])}
				selected={[currentResults]}
				unavailable={character.aspects.principles}
			/>
		case QuestionType.POWER_QUALITY_CHOICE:
			const pqq = question as PowerQualityQuestion;
			return <PowerQualityPicker
				key={key}
				title={pqq.title}
				dice={pqq.dice}
				specifiers={pqq.specifiers}
				selected={currentResults}
				onSelect={freezeResults}
				character={character}
			/>
		default:
			return <div key={key}>Unhandled question type: {question.type}</div>
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
			character,
			question,
			index.toString(),
			resultsStack[index],
			(results: Results) => setResults(index, results),
		)
	);

	// const tempAbility = useMemo(() => getAbilityById("core.ability.damageReduction"), []);
	// const tempAbility = useMemo(() => abilities[0], []);
	// const [tempAbilityConfig, setTempAbilityConfig] = useState<AbilityConfiguration>();
	const tempOptions = useMemo(() => backgrounds.map(bg => makeOption(bg)), []);
	const [tempChosen, setTempChosen] = useState<Background[]>([]);

	return <>
		<IdAudit/>
		{/* <AbilityConfigurator
			ability={tempAbility as Ability}
			configuration={tempAbilityConfig}
			textOptions={tempAbility?.choice}
			onUpdateConfig={(config) => setTempAbilityConfig(config)}
		/> */}
		<Chooser
			title="Testing multi-select"
			options={tempOptions}
			choices={3}
			onSelectOption={vals => {
				console.log("xxy incoming", {vals, tempChosen});
				setTempChosen(vals);
			}}
			selected={tempChosen}
		/>
		{ questionEls }
	</>
};

export default CharacterBuilder;
