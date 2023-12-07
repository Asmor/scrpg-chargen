import { Die, PrincipleCategory } from "@/types/common";

export interface Background {
	name: string;
	page: number;
	roll: number;
	assignableDice: Die[];
	assignable: string[];
	principleCategory: PrincipleCategory;
	dice: Die[];
};

const backgrounds: { [key: string]: Background } = {
	"background-gtg-core-upper_class": {
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
	"background-gtg-core-blank_slate": {
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
	"background-gtg-core-struggling": {
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
	"background-gtg-core-adventurer": {
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
	"background-gtg-core-unremarkable": {
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
	"background-gtg-core-law_enforcement": {
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
	"background-gtg-core-academic": {
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
	"background-gtg-core-tragic": {
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
	"background-gtg-core-performer": {
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
	"background-gtg-core-military": {
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
	"background-gtg-core-retired": {
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
	"background-gtg-core-criminal": {
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
	"background-gtg-core-medical": {
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
	"background-gtg-core-anachronistic": {
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
	"background-gtg-core-exile": {
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
	"background-gtg-core-former_villain": {
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
	"background-gtg-core-interstellar": {
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
	"background-gtg-core-dynasty": {
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
	"background-gtg-core-otherworldy": {
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
	"background-gtg-core-created": {
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
};

export default backgrounds;
