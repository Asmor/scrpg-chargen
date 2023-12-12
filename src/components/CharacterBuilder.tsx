"use client";

import { getnewDecisionStack } from "@/classes/DecisionStack";
import { DiceRollQuestion, QuestionType } from "@/classes/Question.types";
import DicePool from "./DicePool";
import { useEffect, useMemo, useState } from "react";
import { getBackgroundRollDecision } from "@/classes/steps/01-backgroundRoll/BackgroundRollDecision";
import DecisionStack from "@/classes/DecisionStack.types";
import Decision from "@/classes/Decision.types";
import { buildCharacter } from "@/classes/Character";

const characterCreationSteps: (() => Decision)[] = [
	getBackgroundRollDecision,
];

const CharacterBuilder = () => {
	const stack = useMemo(getnewDecisionStack, []);
	const char = buildCharacter(stack);

	let foundIncomplete = false;
	const decisions = useMemo(() => {
		if ( !stack.initialized ) {
			stack.initialized = true;
			stack.decisions.push(...characterCreationSteps.map(step => step()));
		}
		return stack.decisions.flatMap((decision, di) => {
			if ( foundIncomplete ) return;

			foundIncomplete = !decision.complete;
			return decision.questions.map((q, qi) => {
				const key = { key: `${di}.${qi}` };
				switch (q.type) {
					case QuestionType.DICE_ROLL:
						const drq = q as DiceRollQuestion;
						return <DicePool
							{...key}
							title={drq.title}
							dice={drq.dice}
							onRoll={results => drq.set(results)}
						/>
				}
			});
		});
	}, [stack, char]);

	return <> I love you? { decisions } </>
};

export default CharacterBuilder;
