import { Source } from "@/types/common";
import { Background } from "./backgrounds.types";
import { PrincipleCategory } from "./principles.types";

const backgrounds: Background[] = [
	{
		id: "core.bg.upper_class",
		source: Source.CORE,
		name: "Upper Class",
		page: 49,
		roll: 1,
		assignableDice: [8, 10],
		assignable: [
			"Fitness",
			"Persuasion",
			"#q-mental",
		],
		principleCategory: PrincipleCategory.RESPONSIBILITY,
		dice: [8, 8, 10],
	},
	{
		id: "core.bg.blank_slate",
		source: Source.CORE,
		name: "Blank Slate",
		page: 49,
		roll: 2,
		assignableDice: [8, 10],
		assignable: [
			"#q-mental",
			"#q-physical",
		],
		principleCategory: PrincipleCategory.IDENTITY,
		dice: [8, 8, 10],
	},
	{
		id: "core.bg.struggling",
		source: Source.CORE,
		name: "Struggling",
		page: 50,
		roll: 3,
		assignableDice: [6, 6, 8],
		assignable: [
			"Banter",
			"Criminal Underworld Info",
			"#q-physical",
		],
		principleCategory: PrincipleCategory.RESPONSIBILITY,
		dice: [6, 8, 8],
	},
	{
		id: "core.bg.adventurer",
		source: Source.CORE,
		name: "Adventurer",
		page: 50,
		roll: 4,
		assignableDice: [8, 10],
		assignable: [
			"History",
			"Leadership",
			"#q-physical",
		],
		principleCategory: PrincipleCategory.EXPERTISE,
		dice: [8, 8, 8],
	},
	{
		id: "core.bg.unremarkable",
		source: Source.CORE,
		name: "Unremarkable",
		page: 50,
		roll: 5,
		assignableDice: [8, 10],
		assignable: [
			"Close Combat",
			"#q-mental",
			"#q-physical",
		],
		principleCategory: PrincipleCategory.IDENTITY,
		dice: [6, 8, 10],
	},
	{
		id: "core.bg.law_enforcement",
		source: Source.CORE,
		name: "Law Enforcement",
		page: 50,
		roll: 6,
		assignableDice: [8, 10],
		assignable: [
			"Close Combat",
			"Criminal Underworld Info",
			"Ranged Combat",
			"#q-mental",
			"#q-social",
		],
		principleCategory: PrincipleCategory.RESPONSIBILITY,
		dice: [6, 8, 10],
	},
	{
		id: "core.bg.academic",
		source: Source.CORE,
		name: "Academic",
		page: 51,
		roll: 7,
		assignableDice: [8, 12],
		assignable: [
			"Leadership",
			"Self-Discipline",
			"#q-information",
		],
		principleCategory: PrincipleCategory.EXPERTISE,
		dice: [8, 12],
	},
	{
		id: "core.bg.tragic",
		source: Source.CORE,
		name: "Tragic",
		page: 51,
		roll: 8,
		assignableDice: [8, 10],
		assignable: [
			"Banter",
			"Close Combat",
			"Imposing",
			"#q-mental",
		],
		principleCategory: PrincipleCategory.IDEALS,
		dice: [6, 10, 10],
	},
	{
		id: "core.bg.performer",
		source: Source.CORE,
		name: "Performer",
		page: 51,
		roll: 9,
		assignableDice: [8, 10],
		assignable: [
			"Acrobatics",
			"Creativity",
			"Finesse",
			"#q-social",
		],
		principleCategory: PrincipleCategory.RESPONSIBILITY,
		dice: [6, 8, 10],
	},
	{
		id: "core.bg.military",
		source: Source.CORE,
		name: "Military",
		page: 52,
		roll: 10,
		assignableDice: [8, 10],
		assignable: [
			"Leadership",
			"Self-Discipline",
			"#q-physical",
		],
		principleCategory: PrincipleCategory.IDEALS,
		dice: [8, 8, 10],
	},
	{
		id: "core.bg.retired",
		source: Source.CORE,
		name: "Retired",
		page: 52,
		roll: 11,
		assignableDice: [10, 10],
		assignable: [
			"#q-information",
			"#q-social",
		],
		principleCategory: PrincipleCategory.IDENTITY,
		dice: [6, 6, 12],
	},
	{
		id: "core.bg.criminal",
		source: Source.CORE,
		name: "Criminal",
		page: 52,
		roll: 12,
		assignableDice: [8, 10],
		assignable: [
			"Criminal Underworld Info",
			"Imposing",
			"#q-physical",
		],
		principleCategory: PrincipleCategory.EXPERTISE,
		dice: [8, 8, 8],
	},
	{
		id: "core.bg.medical",
		source: Source.CORE,
		name: "Medical",
		page: 52,
		roll: 13,
		assignableDice: [6, 8, 10],
		assignable: [
			"Finesse",
			"Science",
			"Technology",
			"#q-mental",
		],
		principleCategory: PrincipleCategory.EXPERTISE,
		dice: [8, 8, 10],
	},
	{
		id: "core.bg.anachronistic",
		source: Source.CORE,
		name: "Anachronistic",
		page: 53,
		roll: 14,
		assignableDice: [8, 10],
		assignable: [
			"History",
			"Magical Lore",
			"Technology",
			"#q-physical",
		],
		principleCategory: PrincipleCategory.ESOTERIC,
		dice: [6, 8, 10],
	},
	{
		id: "core.bg.exile",
		source: Source.CORE,
		name: "Exile",
		page: 53,
		roll: 15,
		assignableDice: [8, 10],
		assignable: [
			"Conviction",
			"Insight",
			"#q-information",
		],
		principleCategory: PrincipleCategory.IDEALS,
		dice: [8, 8, 8],
	},
	{
		id: "core.bg.former_villain",
		source: Source.CORE,
		name: "Former Villain",
		page: 53,
		roll: 16,
		assignableDice: [8, 10],
		assignable: [
			"Conviction",
			"#q-information",
			"#q-social",
		],
		principleCategory: PrincipleCategory.EXPERTISE,
		dice: [8, 8, 10],
	},
	{
		id: "core.bg.interstellar",
		source: Source.CORE,
		name: "Interstellar",
		page: 53,
		roll: 17,
		assignableDice: [6, 12],
		assignable: [
			"#q-information",
			"#q-mental",
		],
		principleCategory: PrincipleCategory.ESOTERIC,
		dice: [6, 8, 10],
	},
	{
		id: "core.bg.dynasty",
		source: Source.CORE,
		name: "Dynasty",
		page: 54,
		roll: 18,
		assignableDice: [10, 10],
		assignable: [
			"Close Combat",
			"Fitness",
			"History",
			"#q-social",
		],
		principleCategory: PrincipleCategory.IDEALS,
		dice: [6, 8, 8],
	},
	{
		id: "core.bg.otherworldy",
		source: Source.CORE,
		name: "Otherworldy",
		page: 54,
		roll: 19,
		assignableDice: [8, 10],
		assignable: [
			"Magical Lore",
			"Otherworldly Mythos",
			"#q-mental",
		],
		principleCategory: PrincipleCategory.ESOTERIC,
		dice: [6, 6, 10],
	},
	{
		id: "core.bg.created",
		source: Source.CORE,
		name: "Created",
		page: 54,
		roll: 20,
		assignableDice: [6, 12],
		assignable: [
			"Alertness",
			"Science",
			"Technology",
			"#q-physical",
		],
		principleCategory: PrincipleCategory.EXPERTISE,
		dice: [6, 10, 10],
	},
];

export default backgrounds;
