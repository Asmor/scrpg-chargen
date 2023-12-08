"use client";

import Chooser, { ChooserOption } from "@/components/Chooser";
import backgrounds from "@/data/backgrounds";
import { Background, Die } from "@/types/common";
import { useMemo, useState } from "react";
import DicePool from "./DicePool";
import { conjugateDicePoolOptions } from "@/util/dice";

const bgVals = Object.values(backgrounds);

const makeOption = (bg: Background): ChooserOption<Background> => ({
	title: bg.name,
	subtitle: `pg. ${bg.page}`,
	value: bg,
});

const backgroundOptions = Object.values(backgrounds)
	.reduce((acc, bg) => {
		acc[bg.roll] = bg;

		return acc;
	}, [] as Background[])
	.map(makeOption)
;

const CharacterBuilder = () => {
	const backgroundDice: Die[] = useMemo<Die[]>(() => [10, 10], []);
	const [preferredBackgroundRolls, setPreferredBackgroundRolls] = useState<number[]>([])
	const [selectedBackground, setSelectedBackground] = useState<Background | undefined>();
	const preferredBackgrounds = conjugateDicePoolOptions(preferredBackgroundRolls);

	return (
		<>
			<DicePool
				title="Background"
				dice={backgroundDice}
				onRoll={setPreferredBackgroundRolls}
			/>
			<Chooser
				options={backgroundOptions}
				title="Background"
				onSelectOption={setSelectedBackground}
				selected={selectedBackground}
				preferred={preferredBackgrounds}
			/>
		</>
	)
};

export default CharacterBuilder;
