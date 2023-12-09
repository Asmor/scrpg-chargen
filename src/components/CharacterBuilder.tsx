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
import { Principle, PrincipleCategory } from "@/data/principles.types";
import { PowerSource } from "@/data/powerSourcesTypes";
import powerSources from "@/data/powerSources";

const makeOption = <T extends Entry,>(value: T): ChooserOption<T> => ({
	title: value.name,
	subtitle: `pg. ${value.page}`,
	value,
});

const backgroundOptions = backgrounds.map(makeOption);
const principleOptions = principles.map(makeOption);
const principleOptionsByCategory = principles.map(makeOption).reduce((acc, principleOption) => {
	acc[principleOption.value.category].push(principleOption);
	return acc;
}, {
	[PrincipleCategory.ESOTERIC]: [] as ChooserOption<Principle>[],
	[PrincipleCategory.EXPERTISE]: [] as ChooserOption<Principle>[],
	[PrincipleCategory.IDEALS]: [] as ChooserOption<Principle>[],
	[PrincipleCategory.IDENTITY]: [] as ChooserOption<Principle>[],
	[PrincipleCategory.RESPONSIBILITY]: [] as ChooserOption<Principle>[],
})
const powerSourceOptions = powerSources.map(makeOption);

enum ResetPoint {
	BACKGROUND_ROLL,
	BACKGROUND_SELECT,
	BACKGROUND_PQ,
	BACKGROUND_PRINCIPLE,
	POWER_SOURCE_ROLL,
	POWER_SOURCE_SELECT,
}

const CharacterBuilder = () => {
	// Background roll
	const backgroundDice = useMemo<Die[]>(() => [10, 10], []);
	const [backgroundRolls, setBackgroundRolls] = useState<number[]>([])
	const rolledBackgrounds = conjugateDicePoolOptions(backgroundRolls);
	const handleBackgroundRoll = useCallback((values: number[]) => {
		setBackgroundRolls(values);
		reset(ResetPoint.BACKGROUND_ROLL);
	}, [setBackgroundRolls]);

	// Background select
	const [background, setBackground] = useState<Background>();
	const handleBackgroundSelect = useCallback((bg: Background) => {
		setBackground(bg);
		reset(ResetPoint.BACKGROUND_SELECT);
	}, [setBackground]);

	// Background powers and qualities
	const [bgPowerQualities, setbgPowerQualities] = useState<PowerQuality[]>([]);
	const handleBackgroundPQSelect = useCallback((pqs: PowerQuality[]) => {
		setbgPowerQualities(pqs);
		reset(ResetPoint.BACKGROUND_PQ);
	}, [setbgPowerQualities]);

	// Background principle
	// const bgPrincipleOptions = useMemo(
	// 	() => principleOptions.filter(option => option.value.category === background?.principleCategory),
	// 	[background]
	// )
	const [bgPrinciple, setBgPrinciple] = useState<Principle>();
	const handleBgPrincipleSelect = useCallback((principle: Principle) => {
		setBgPrinciple(principle);
		reset(ResetPoint.BACKGROUND_PRINCIPLE);
	}, [setBgPrinciple]);

	// Power Source roll
	const [powerSourceRolls, setPowerSourceRolls] = useState<number[]>([]);
	const rolledPowerSources = conjugateDicePoolOptions(powerSourceRolls);
	const handlePowerSourceRoll = useCallback((values: number[]) => {
		setPowerSourceRolls(values);
		reset(ResetPoint.POWER_SOURCE_ROLL);
	}, [setPowerSourceRolls]);

	// Power Source select
	const [powerSource, setPowerSource] = useState<PowerSource>();
	const handlePowerSourceSelect = useCallback((value: PowerSource) => {
		setPowerSource(value);
		reset(ResetPoint.POWER_SOURCE_SELECT);
	}, [setPowerSource]);

	const reset = (from: ResetPoint) => {
		switch (from) {
			case ResetPoint.BACKGROUND_ROLL:
				setBackground(undefined);
			case ResetPoint.BACKGROUND_SELECT:
				setbgPowerQualities([]);
				setBgPrinciple(undefined);
			case ResetPoint.BACKGROUND_PQ:
			case ResetPoint.BACKGROUND_PRINCIPLE:
			case ResetPoint.POWER_SOURCE_ROLL:
				setPowerSource(undefined);
			case ResetPoint.POWER_SOURCE_SELECT:

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
			rolled={rolledBackgrounds}
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
				options={principleOptionsByCategory[background.principleCategory]}
				onSelectOption={handleBgPrincipleSelect}
				selected={bgPrinciple}
			/>
		);
		elements.push(
			<DicePool
				key={elements.length}
				title="Power Source"
				dice={background.powerSourceDice}
				onRoll={handlePowerSourceRoll}
			/>
		);
		elements.push(
			<Chooser
				key={elements.length}
				title="Power Source"
				options={powerSourceOptions}
				selected={powerSource}
				onSelectOption={handlePowerSourceSelect}
				rolled={rolledPowerSources}
			/>
		);
	}

	return (
		<>{ elements }</>
	)
};

export default CharacterBuilder;
