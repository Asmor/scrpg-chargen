import { Die } from "@/types/common";
import { rollPool } from "@/util/dice";
import { useEffect, useMemo, useState } from "react";

export interface DicePoolProps {
	dice: Die[];
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

const DicePool = ({ dice, onRoll, title }: DicePoolProps) => {
	const [result, setResult] = useState<Number[]>([]);

	const roll = () => {
		const _result = rollPool(dice);
		setResult(_result);
		onRoll(_result);
	};

	useEffect(roll, [dice, onRoll]);

	const diceString = useMemo(() => makeDiceString(dice), [dice]);

	return <div>
		<h3>{title} dice pool: {diceString}</h3>
		<div>
			Results: {result.join(", ")}
			<button onClick={roll}>Reroll</button>
		</div>
	</div>
};

export default DicePool;
