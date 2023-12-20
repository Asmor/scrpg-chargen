import { Character } from "../Character";
import { getAbilityQuestion } from "./AbilityQuestion";
import powersAndQualities from "@/data/powersQualities";
import { getBackgroundQuestion } from "./BackgroundQuestion";
import backgrounds from "@/data/backgrounds";
import { Question } from "../Question";
import { getDiceRollQuestion } from "./DiceRollQuestion";
import { getPowerQualityQuestion } from "./PowerQualityQuestion";
import { getPowerSourceQuestion } from "./PowerSourceQuestion";
import powerSources from "@/data/powerSources";
import { getPrincipleQuestion } from "./PrincipleQuestion";
import { PrincipleCategory } from "@/data/principles.types";
import principles from "@/data/principles";
import { AbilityChoice } from "@/components/forms/AbilityChooser";

interface SerializationTest {
	name: string;
	value: any;
}

interface SerializationScenario {
	name: string;
	question: Question,
	tests: SerializationTest[];
}

const commonParams = {
	character: {} as Character,
	title: "",
};

const commonTests = [
	{ name: "undefined", value: undefined },
];

describe("Questions", () => {
	const scenarios: SerializationScenario[] = [
		{ // Ability Question
			name: "Ability Question",
			question: getAbilityQuestion({
				...commonParams,
				availableIds: [],
				availablePqSpecifiers: [],
				greenPicks: 1,
				redPicks: 1,
				yellowPicks: 1,
			}),
			tests: [
				...commonTests,
				{
					name: "Well-defined",
					value: [
						{
							id: "One",
							config: {},
						},
						{
							id: "Two",
							config: {
								name: "A name",
								chosenPq: powersAndQualities[0],
							},
						},
						{
							id: "Three",
							config: {
								chosenText: "chosen text",
							},
						},
					] as AbilityChoice[],
				}
			],
		},
		{ // Background Question
			name: "Background Question",
			question: getBackgroundQuestion({
				...commonParams,
			}),
			tests: [
				...commonTests,
				{
					name: "Well-defined",
					value: backgrounds[0],
				}
			],
		},
		{ // Dice roll Question
			name: "Dice roll Question",
			question: getDiceRollQuestion({
				...commonParams,
				dice: [],
			}),
			tests: [
				...commonTests,
				{
					name: "Well-defined",
					value: [1,2,3,4],
				}
			],
		},
		{ // Power/Quality Question
			name: "Power/Quality Question",
			question: getPowerQualityQuestion({
				...commonParams,
			}),
			tests: [
				...commonTests,
				{
					name: "Well-defined",
					value: [
						powersAndQualities[1],
						undefined,
						powersAndQualities[0],
					],
				}
			],
		},
		{ // Power Source Question
			name: "Power Source Question",
			question: getPowerSourceQuestion({
				...commonParams,
			}),
			tests: [
				...commonTests,
				{
					name: "Well-defined",
					value: powerSources[0],
				}
			],
		},
		{ // Principle Question
			name: "Principle Question",
			question: getPrincipleQuestion({
				...commonParams,
				category: PrincipleCategory.ESOTERIC,
			}),
			tests: [
				...commonTests,
				{
					name: "Well-defined",
					value: principles[0],
				}
			],
		},
	];

	describe.each(scenarios)("$name", ({question, tests}) => {
		test.each(tests)("$name serialization handled properly", ({ value }) => {
			const serialized = question.freeze(value);
			const deserialized = question.thaw(serialized);

			expect(deserialized).toStrictEqual(value);
		});
	});
});
