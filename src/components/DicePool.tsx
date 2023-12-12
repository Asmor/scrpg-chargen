"use client";

import { Die } from "@/types/common";
import { Container, SubHeader } from "@/util/commonElements";
import { rollPool } from "@/util/dice";
import { useEffect, useMemo, useState } from "react";

export interface DicePoolProps {
	dice: Die[];
	results: number[],
	onRoll: (results: number[]) => void;
	title: string;
}

const makeDiceString = (dice: Die[]) => {
	if (dice.length === 0) {
		return "no dice";
	}

	const dieCounts = {
		4: 0,
		6: 0,
		8: 0,
		10: 0,
		12: 0,
	};

	dice.forEach(die => dieCounts[die]++);

	return [4, 6, 8, 10, 12]
		.filter(size => dieCounts[size as Die])
		.map(size => `${dieCounts[size as Die]}d${size}`)
		.join(", ");
};

const DicePool = ({ dice, onRoll, title, results }: DicePoolProps) => {
	const [result, setResult] = useState<Number[]>(results);

	const roll = () => {
		const _result = rollPool(dice);
		setResult(_result);
		onRoll(_result);
	};

	const resultsString = results.join(",");

	useEffect(() => {
		setResult(results);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resultsString]);

	const diceString = useMemo(() => makeDiceString(dice), [dice]);

	return <Container>
		<SubHeader>{title} dice pool: {diceString}</SubHeader>
		<div>
			Results: {result.join(", ")}
			<button onClick={roll}>Reroll</button>
		</div>
	</Container>
};

export default DicePool;
