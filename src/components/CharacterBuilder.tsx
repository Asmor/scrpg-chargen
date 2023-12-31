"use client";

import DicePool from "./forms/DicePool";
import scrpgDirector from "@/character-builder/Director";
import { useCallback, useState } from "react";
import { isEqual } from "lodash";
import { Question, QuestionType } from "@/character-builder/Question";
import { DiceRollQuestion } from "@/character-builder/questions/DiceRollQuestion";
import { getBackgroundRollDecision } from "@/character-builder/decisions/BackgroundRollDecision";
import { BackgroundQuestion } from "@/character-builder/questions/BackgroundQuestion";
import { PowerQualityQuestion } from "@/character-builder/questions/PowerQualityQuestion";
import { Character } from "@/character-builder/Character";
import { PowerSourceQuestion } from "@/character-builder/questions/PowerSourceQuestion";
import { PrincipleQuestion } from "@/character-builder/questions/PrincipleQuestion";
import IdAudit from "./widgets/IdAudit";
import Message from "./widgets/Message";
import styled from "styled-components";
import { AbilityQuestion } from "@/character-builder/questions/AbilityQuestion";
import Chooser from "./forms/Chooser";
import PowerQualityPicker from "./forms/PowerQualityPicker";
import { useRecoilState } from "recoil";
import { flattenSide, invertOrder } from "@/atoms/ui";
import ColorAbilityChooser from "./forms/ColorAbilityChooser";
import AbilityChooser from "./forms/AbilityChooser";

const QuestionsContainer = styled.div<{ $invert: boolean }>`
	display: flex;
	flex-direction: ${p => p.$invert ? "column-reverse" : "column" };
`;

const getElementByQuestionType = (
	character: Character,
	question: Question,
	key: string,
	results: string,
	setResults: (results: string) => void,
) => {
	const freezeResults = (results: any) => {
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
			return <Chooser
				key={key}
				title={bcq.title}
				options={bcq.options}
				onSelectOption={results => freezeResults(results[0])}
				selected={[currentResults]}
				rolled={bcq.rolled}
				selectedLabel="Background"
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
				selectedLabel={`${pq.for} Principle`}
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
		case QuestionType.ABILITY_SELECTION:
			const aq = question as AbilityQuestion;
			return <AbilityChooser
				key={key}
				abilities={aq.availableAbilities}
				usedAbilities={aq.usedAbilities}
				availablePqSpecifiers={aq.availablePqSpecifiers}
				onUpdate={abilityChoices => freezeResults(abilityChoices)}
				chosenAbilities={currentResults}
				character={character}
				colors={aq.colors}
			/>
		default:
			return <Message key={key}>
				Unhandled question type: {question.type}
			</Message>
	}
};

const firstDecision = getBackgroundRollDecision({
	dice: [10, 10],
});

const CharacterBuilder = () => {
	// const [resultsStack, setResultsStack] = useState<string[]>([]);
	const [resultsStack, setResultsStack] = useState<string[]>(
		["5,6", "core.bg.unremarkable", "core.quality.alertness,core.quality.conviction", "core.principle.ambition", "5,1,9", "core.powerSource.accident", "core.power.agility,core.power.electricity,core.power.toxic"]
	);

	const { questions, character } = scrpgDirector({
		startingDecision: firstDecision,
		results: resultsStack,
	});

	const setResults = useCallback((index: number, incomingResults: string) => {
		if (!isEqual(resultsStack[index], incomingResults)) {
			resultsStack[index] = incomingResults;
			if (questions[index].critical ) {
				// if we change a critical question, truncate the stack at that point
				resultsStack.length = index + 1;
			}
			setResultsStack([...resultsStack]);
		}
	}, [resultsStack, setResultsStack]);

	const questionEls = questions.map(
		(question, index) => getElementByQuestionType(
			character,
			question,
			index.toString(),
			resultsStack[index],
			(results: string) => setResults(index, results),
		)
	);

	const [flatState, setFlatState] = useRecoilState(flattenSide);
	const [invertState, setInvertState] = useRecoilState(invertOrder);

	// const tempAbility = useMemo(() => getAbilityById("core.ability.damageReduction"), []);
	// const tempAbility = useMemo(() => abilities[0], []);
	// const [tempAbilityConfig, setTempAbilityConfig] = useState<AbilityConfiguration>();
	// const tempOptions = useMemo(() => backgrounds.map(bg => makeOption(bg)), []);
	// const [tempChosen, setTempChosen] = useState<Background[]>([]);

	return <>
		<label>
			<input
				type="checkbox"
				checked={flatState}
				onChange={() => setFlatState(!flatState)}
			/> Flatten side
		</label>
		<label>
			<input
				type="checkbox"
				checked={invertState}
				onChange={() => setInvertState(!invertState)}
			/> Invert question order
		</label>
		<IdAudit/>
		{/* <AbilityConfigurator
			ability={tempAbility as Ability}
			configuration={tempAbilityConfig}
			textOptions={tempAbility?.choice}
			onUpdateConfig={(config) => setTempAbilityConfig(config)}
		/> */}
		{/* <Chooser
			title="Testing multi-select"
			options={tempOptions}
			choices={3}
			onSelectOption={vals => {
				console.log("xxy incoming", {vals, tempChosen});
				setTempChosen(vals);
			}}
			selected={tempChosen}
		/> */}
		<QuestionsContainer $invert={invertState}>{ questionEls }</QuestionsContainer>
	</>
};

export default CharacterBuilder;
