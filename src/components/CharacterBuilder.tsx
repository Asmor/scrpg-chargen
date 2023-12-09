"use client";

import Chooser, { ChooserOption } from "@/components/Chooser";
import backgrounds from "@/data/backgrounds";
import { Die } from "@/types/common";
import { useCallback, useMemo, useState } from "react";
import DicePool from "./DicePool";
import { conjugateDicePoolOptions } from "@/util/dice";
import { noop } from "@/util/util";
import { Background } from "@/data/backgrounds.types";
import PowerQualityPicker from "./PowerQualityPicker";
import { PowerQuality } from "@/data/powersQualities.types";

const makeOption = (bg: Background): ChooserOption<Background> => ({
	title: bg.name,
	subtitle: `pg. ${bg.page}`,
	value: bg,
});

const backgroundOptions = Object.values(backgrounds).map(makeOption);

enum ResetPoint {
	BACKGROUND_ROLL,
	BACKGROUND_CHOOSE,
	BACKGROUND_PQ,
	POWER_SOURCE_ROLL,
}

const CharacterBuilder = () => {
	// Roll for background options
	const backgroundDice: Die[] = useMemo<Die[]>(() => [10, 10], []);
	const [preferredBackgroundRolls, setPreferredBackgroundRolls] = useState<number[]>([])
	const handleBackgroundRoll = useCallback((values: number[]) => {
		setPreferredBackgroundRolls(values);
		reset(ResetPoint.BACKGROUND_ROLL);
	}, [setPreferredBackgroundRolls]);

	// Select a background
	const [selectedBackground, setSelectedBackground] = useState<Background | undefined>();
	const handleBackgroundSelect = useCallback((bg: Background) => {
		setSelectedBackground(bg);
		reset(ResetPoint.BACKGROUND_CHOOSE);
	}, [setSelectedBackground]);

	// Select background powers and qualities
	const [selectedBgPowerQualities, setSelectedBgPowerQualities] = useState<PowerQuality[]>([]);
	const handleBackgroundPQSelect = useCallback((pqs: PowerQuality[]) => {
		setSelectedBgPowerQualities(pqs);
		reset(ResetPoint.BACKGROUND_PQ);
	}, [setSelectedBgPowerQualities]);

	const preferredBackgrounds = conjugateDicePoolOptions(preferredBackgroundRolls);

	const reset = (from: ResetPoint) => {
		switch (from) {
			case ResetPoint.BACKGROUND_ROLL:
				setSelectedBackground(undefined);
			case ResetPoint.BACKGROUND_CHOOSE:
				setSelectedBgPowerQualities([]);

		}
	};

	const elements = [
		<DicePool
			key={0}
			title="Background"
			dice={backgroundDice}
			onRoll={handleBackgroundRoll}
		/>,
		<Chooser
			key={1}
			options={backgroundOptions}
			title="Background"
			onSelectOption={handleBackgroundSelect}
			selected={selectedBackground}
			rolled={preferredBackgrounds}
		/>
	];

	if ( selectedBackground ) {
		elements.push(
			<PowerQualityPicker
				key={elements.length}
				dice={selectedBackground.assignableDice}
				specifiers={selectedBackground.assignable}
				selected={selectedBgPowerQualities}
				onSelect={handleBackgroundPQSelect}
			/>
		);
		elements.push(
			<DicePool
				key={elements.length}
				title="Power Source"
				dice={selectedBackground.dice}
				onRoll={noop}
			/>
		);
	}

	return (
		<>{ elements }</>
	)
};

export default CharacterBuilder;
