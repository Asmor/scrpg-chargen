"use client";

import Chooser, { ChooserOption } from "@/components/Chooser";
import backgrounds from "@/data/backgrounds";
import { Die, Entry } from "@/types/common";
import { useCallback, useMemo, useState } from "react";
import DicePool from "./DicePool";
import { conjugateDicePoolOptions } from "@/util/dice";
import { noop } from "@/util/util";
import { Background } from "@/data/backgrounds.types";
import PowerQualityPicker from "./PowerQualityPicker";
import { PowerQuality } from "@/data/powersQualities.types";
import principles from "@/data/principles";
import { Principle } from "@/data/principles.types";

const makeOption = <T extends Entry,>(value: T): ChooserOption<T> => ({
	title: value.name,
	subtitle: `pg. ${value.page}`,
	value,
});

const backgroundOptions = backgrounds.map(makeOption);
const principleOptions = principles.map(makeOption);

enum ResetPoint {
	BACKGROUND_ROLL,
	BACKGROUND_CHOOSE,
	BACKGROUND_PQ,
	BACKGROUND_PRINCIPLE,
	POWER_SOURCE_ROLL,
}

const CharacterBuilder = () => {
	// Background roll
	const backgroundDice: Die[] = useMemo<Die[]>(() => [10, 10], []);
	const [preferredBackgroundRolls, setPreferredBackgroundRolls] = useState<number[]>([])
	const handleBackgroundRoll = useCallback((values: number[]) => {
		setPreferredBackgroundRolls(values);
		reset(ResetPoint.BACKGROUND_ROLL);
	}, [setPreferredBackgroundRolls]);

	// Background select
	const [background, setBackground] = useState<Background>();
	const handleBackgroundSelect = useCallback((bg: Background) => {
		setBackground(bg);
		reset(ResetPoint.BACKGROUND_CHOOSE);
	}, [setBackground]);

	// Background powers and qualities
	const [bgPowerQualities, setbgPowerQualities] = useState<PowerQuality[]>([]);
	const handleBackgroundPQSelect = useCallback((pqs: PowerQuality[]) => {
		setbgPowerQualities(pqs);
		reset(ResetPoint.BACKGROUND_PQ);
	}, [setbgPowerQualities]);

	// Background principle
	const bgPrincipleOptions = useMemo(
		() => principleOptions.filter(option => option.value.category === background?.principleCategory),
		[background]
	)
	const [bgPrinciple, setBgPrinciple] = useState<Principle>();
	const handleBgPrincipleSelect = useCallback((principle: Principle) => {
		setBgPrinciple(principle);
		reset(ResetPoint.BACKGROUND_PRINCIPLE);
	}, [setBgPrinciple])


	const preferredBackgrounds = conjugateDicePoolOptions(preferredBackgroundRolls);

	const reset = (from: ResetPoint) => {
		switch (from) {
			case ResetPoint.BACKGROUND_ROLL:
				setBackground(undefined);
			case ResetPoint.BACKGROUND_CHOOSE:
				setbgPowerQualities([]);
				setBgPrinciple

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
			title="Background"
			options={backgroundOptions}
			onSelectOption={handleBackgroundSelect}
			selected={background}
			rolled={preferredBackgrounds}
		/>
	];

	if ( background ) {
		elements.push(
			<PowerQualityPicker
				key={elements.length}
				title="Background"
				dice={background.assignableDice}
				specifiers={background.assignablePqs}
				selected={bgPowerQualities}
				onSelect={handleBackgroundPQSelect}
			/>
		);
		elements.push(
			<Chooser
				key={elements.length}
				title="Background Principle"
				options={bgPrincipleOptions}
				onSelectOption={handleBgPrincipleSelect}
				selected={bgPrinciple}
			/>
		);
		elements.push(
			<DicePool
				key={elements.length}
				title="Power Source"
				dice={background.powerSourceDice}
				onRoll={noop}
			/>
		);
	}

	return (
		<>{ elements }</>
	)
};

export default CharacterBuilder;
