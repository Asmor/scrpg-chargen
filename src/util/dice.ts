import { Die } from "@/types/common";

export const roll = (die: Die) => Math.floor(Math.random() * die) + 1;

export const rollPool = (dice: Die[]) => dice.map(roll);

/**
 * Given a set of dice rolls, returns an array of all unique values of single and pairs of dice
 * @param diceRolls
 */
export const conjugateDicePoolOptions = (diceRolls: number[]) => {
	const indices = new Set<number>();

	for ( let i = 0; i < diceRolls.length; i++ ) {
		indices.add(diceRolls[i]);

		for ( let j = i + 1; j < diceRolls.length; j++ ) {
			indices.add(diceRolls[i] + diceRolls[j]);
		}
	}

	return [...indices];
};
