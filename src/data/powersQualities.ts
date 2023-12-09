import { Source } from "@/types/common";
import { PowerCategory, PowerQuality, PowerQualityType, QualityCategory } from "./powersQualities.types";

const powersAndQualities: PowerQuality[] = [
	{
		id: "core.power.agility",
		source: Source.CORE,
		name: "Agility",
		type: PowerQualityType.POWER,
		category: PowerCategory.ATHLETIC,
		page: 115,
	},
	{
		id: "core.power.speed",
		source: Source.CORE,
		name: "Speed",
		type: PowerQualityType.POWER,
		category: PowerCategory.ATHLETIC,
		page: 115,
	},
	{
		id: "core.power.strength",
		source: Source.CORE,
		name: "Strength",
		type: PowerQualityType.POWER,
		category: PowerCategory.ATHLETIC,
		page: 115,
	},
	{
		id: "core.power.vitality",
		source: Source.CORE,
		name: "Vitality",
		type: PowerQualityType.POWER,
		category: PowerCategory.ATHLETIC,
		page: 115,
	},
	{
		id: "core.power.cold",
		source: Source.CORE,
		name: "Cold",
		type: PowerQualityType.POWER,
		category: PowerCategory.ELEMENTAL_ENERGY,
		page: 115,
	},
	{
		id: "core.power.cosmic",
		source: Source.CORE,
		name: "Cosmic",
		type: PowerQualityType.POWER,
		category: PowerCategory.ELEMENTAL_ENERGY,
		page: 115,
	},
	{
		id: "core.power.electricity",
		source: Source.CORE,
		name: "Electricity",
		type: PowerQualityType.POWER,
		category: PowerCategory.ELEMENTAL_ENERGY,
		page: 115,
	},
	{
		id: "core.power.fire",
		source: Source.CORE,
		name: "Fire",
		type: PowerQualityType.POWER,
		category: PowerCategory.ELEMENTAL_ENERGY,
		page: 115,
	},
	{
		id: "core.power.infernal",
		source: Source.CORE,
		name: "Infernal",
		type: PowerQualityType.POWER,
		category: PowerCategory.ELEMENTAL_ENERGY,
		page: 115,
	},
	{
		id: "core.power.nuclear",
		source: Source.CORE,
		name: "Nuclear",
		type: PowerQualityType.POWER,
		category: PowerCategory.ELEMENTAL_ENERGY,
		page: 115,
	},
	{
		id: "core.power.radiant",
		source: Source.CORE,
		name: "Radiant",
		type: PowerQualityType.POWER,
		category: PowerCategory.ELEMENTAL_ENERGY,
		page: 115,
	},
	{
		id: "core.power.sonic",
		source: Source.CORE,
		name: "Sonic",
		type: PowerQualityType.POWER,
		category: PowerCategory.ELEMENTAL_ENERGY,
		page: 115,
	},
	{
		id: "core.power.weather",
		source: Source.CORE,
		name: "Weather",
		type: PowerQualityType.POWER,
		category: PowerCategory.ELEMENTAL_ENERGY,
		page: 115,
	},
	{
		id: "core.power.signatureVehicle",
		source: Source.CORE,
		name: "Signature Vehicle",
		type: PowerQualityType.POWER,
		category: PowerCategory.HALLMARK,
		page: 115,
	 },
	{
		id: "core.power.signatureWeaponry",
		source: Source.CORE,
		name: "Signature Weaponry",
		type: PowerQualityType.POWER,
		category: PowerCategory.HALLMARK,
		page: 115,
	 },
	{
		id: "core.power.inventedPower",
		source: Source.CORE,
		name: "Invented Power",
		type: PowerQualityType.POWER,
		category: PowerCategory.HALLMARK,
		page: 115,
	 },
	{
		id: "core.power.awareness",
		source: Source.CORE,
		name: "Awareness",
		type: PowerQualityType.POWER,
		category: PowerCategory.INTELLECTUAL,
		page: 116,
	},
	{
		id: "core.power.deduction",
		source: Source.CORE,
		name: "Deduction",
		type: PowerQualityType.POWER,
		category: PowerCategory.INTELLECTUAL,
		page: 116,
	},
	{
		id: "core.power.intuition",
		source: Source.CORE,
		name: "Intuition",
		type: PowerQualityType.POWER,
		category: PowerCategory.INTELLECTUAL,
		page: 116,
	},
	{
		id: "core.power.lightningCalculator",
		source: Source.CORE,
		name: "Lightning Calculator",
		type: PowerQualityType.POWER,
		category: PowerCategory.INTELLECTUAL,
		page: 116,
	 },
	{
		id: "core.power.presence",
		source: Source.CORE,
		name: "Presence",
		type: PowerQualityType.POWER,
		category: PowerCategory.INTELLECTUAL,
		page: 116,
	},
	{
		id: "core.power.metal",
		source: Source.CORE,
		name: "Metal",
		type: PowerQualityType.POWER,
		category: PowerCategory.MATERIALS,
		page: 116,
	},
	{
		id: "core.power.plants",
		source: Source.CORE,
		name: "Plants",
		type: PowerQualityType.POWER,
		category: PowerCategory.MATERIALS,
		page: 116,
	},
	{
		id: "core.power.stone",
		source: Source.CORE,
		name: "Stone",
		type: PowerQualityType.POWER,
		category: PowerCategory.MATERIALS,
		page: 116,
	},
	{
		id: "core.power.toxic",
		source: Source.CORE,
		name: "Toxic",
		type: PowerQualityType.POWER,
		category: PowerCategory.MATERIALS,
		page: 116,
	},
	{
		id: "core.power.transmutation",
		source: Source.CORE,
		name: "Transmutation",
		type: PowerQualityType.POWER,
		category: PowerCategory.MATERIALS,
		page: 116,
	},
	{
		id: "core.power.flight",
		source: Source.CORE,
		name: "Flight",
		type: PowerQualityType.POWER,
		category: PowerCategory.MOBILITY,
		page: 117,
	},
	{
		id: "core.power.leaping",
		source: Source.CORE,
		name: "Leaping",
		type: PowerQualityType.POWER,
		category: PowerCategory.MOBILITY,
		page: 117,
	},
	{
		id: "core.power.momentum",
		source: Source.CORE,
		name: "Momentum",
		type: PowerQualityType.POWER,
		category: PowerCategory.MOBILITY,
		page: 117,
	},
	{
		id: "core.power.swimming",
		source: Source.CORE,
		name: "Swimming",
		type: PowerQualityType.POWER,
		category: PowerCategory.MOBILITY,
		page: 117,
	},
	{
		id: "core.power.swinging",
		source: Source.CORE,
		name: "Swinging",
		type: PowerQualityType.POWER,
		category: PowerCategory.MOBILITY,
		page: 117,
	},
	{
		id: "core.power.teleportation",
		source: Source.CORE,
		name: "Teleportation",
		type: PowerQualityType.POWER,
		category: PowerCategory.MOBILITY,
		page: 117,
	},
	{
		id: "core.power.wallCrawling",
		source: Source.CORE,
		name: "Wall-Crawling",
		type: PowerQualityType.POWER,
		category: PowerCategory.MOBILITY,
		page: 117,
	 },
	{
		id: "core.power.animalControl",
		source: Source.CORE,
		name: "Animal Control",
		type: PowerQualityType.POWER,
		category: PowerCategory.PSYCHIC,
		page: 117,
	 },
	{
		id: "core.power.illusions",
		source: Source.CORE,
		name: "Illusions",
		type: PowerQualityType.POWER,
		category: PowerCategory.PSYCHIC,
		page: 117,
	},
	{
		id: "core.power.postcognition",
		source: Source.CORE,
		name: "Postcognition",
		type: PowerQualityType.POWER,
		category: PowerCategory.PSYCHIC,
		page: 117,
	},
	{
		id: "core.power.precognition",
		source: Source.CORE,
		name: "Precognition",
		type: PowerQualityType.POWER,
		category: PowerCategory.PSYCHIC,
		page: 117,
	},
	{
		id: "core.power.remoteViewing",
		source: Source.CORE,
		name: "Remote Viewing",
		type: PowerQualityType.POWER,
		category: PowerCategory.PSYCHIC,
		page: 117,
	 },
	{
		id: "core.power.suggestion",
		source: Source.CORE,
		name: "Suggestion",
		type: PowerQualityType.POWER,
		category: PowerCategory.PSYCHIC,
		page: 117,
	},
	{
		id: "core.power.telekinesis",
		source: Source.CORE,
		name: "Telekinesis",
		type: PowerQualityType.POWER,
		category: PowerCategory.PSYCHIC,
		page: 117,
	},
	{
		id: "core.power.telepathy",
		source: Source.CORE,
		name: "Telepathy",
		type: PowerQualityType.POWER,
		category: PowerCategory.PSYCHIC,
		page: 117,
	},
	{
		id: "core.power.absorption",
		source: Source.CORE,
		name: "Absorption",
		type: PowerQualityType.POWER,
		category: PowerCategory.SELF_CONTROL,
		page: 118,
	},
	{
		id: "core.power.densityControl",
		source: Source.CORE,
		name: "Density Control",
		type: PowerQualityType.POWER,
		category: PowerCategory.SELF_CONTROL,
		page: 118,
	 },
	{
		id: "core.power.duplication",
		source: Source.CORE,
		name: "Duplication",
		type: PowerQualityType.POWER,
		category: PowerCategory.SELF_CONTROL,
		page: 118,
	},
	{
		id: "core.power.elasticity",
		source: Source.CORE,
		name: "Elasticity",
		type: PowerQualityType.POWER,
		category: PowerCategory.SELF_CONTROL,
		page: 118,
	},
	{
		id: "core.power.intangibility",
		source: Source.CORE,
		name: "Intangibility",
		type: PowerQualityType.POWER,
		category: PowerCategory.SELF_CONTROL,
		page: 118,
	},
	{
		id: "core.power.invisibility",
		source: Source.CORE,
		name: "Invisibility",
		type: PowerQualityType.POWER,
		category: PowerCategory.SELF_CONTROL,
		page: 118,
	},
	{
		id: "core.power.partDetachment",
		source: Source.CORE,
		name: "Part Detachment",
		type: PowerQualityType.POWER,
		category: PowerCategory.SELF_CONTROL,
		page: 118,
	 },
	{
		id: "core.power.shapeshifting",
		source: Source.CORE,
		name: "Shapeshifting",
		type: PowerQualityType.POWER,
		category: PowerCategory.SELF_CONTROL,
		page: 118,
	},
	{
		id: "core.power.sizeChanging",
		source: Source.CORE,
		name: "Size-Changing",
		type: PowerQualityType.POWER,
		category: PowerCategory.SELF_CONTROL,
		page: 118,
	 },
	{
		id: "core.power.gadgets",
		source: Source.CORE,
		name: "Gadgets",
		type: PowerQualityType.POWER,
		category: PowerCategory.TECHNOLOGICAL,
		page: 118,
	},
	{
		id: "core.power.inventions",
		source: Source.CORE,
		name: "Inventions",
		type: PowerQualityType.POWER,
		category: PowerCategory.TECHNOLOGICAL,
		page: 118,
	},
	{
		id: "core.power.powerSuit",
		source: Source.CORE,
		name: "Power Suit",
		type: PowerQualityType.POWER,
		category: PowerCategory.TECHNOLOGICAL,
		page: 118,
	 },
	{
		id: "core.power.robotics",
		source: Source.CORE,
		name: "Robotics",
		type: PowerQualityType.POWER,
		category: PowerCategory.TECHNOLOGICAL,
		page: 118,
	},
	{
		id: "core.quality.criminalUnderworldInfo",
		source: Source.CORE,
		name: "Criminal Underworld Info",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.INFORMATION,
		page: 119,
	},
	{
		id: "core.quality.deepSpaceKnowledge",
		source: Source.CORE,
		name: "Deep Space Knowledge",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.INFORMATION,
		page: 119,
	},
	{
		id: "core.quality.history",
		source: Source.CORE,
		name: "History",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.INFORMATION,
		page: 119,
	},
	{
		id: "core.quality.magicalLore",
		source: Source.CORE,
		name: "Magical Lore",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.INFORMATION,
		page: 119,
	 },
	{
		id: "core.quality.medicine",
		source: Source.CORE,
		name: "Medicine",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.INFORMATION,
		page: 119,
	},
	{
		id: "core.quality.otherworldlyMythos",
		source: Source.CORE,
		name: "Otherworldly Mythos",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.INFORMATION,
		page: 119,
	 },
	{
		id: "core.quality.science",
		source: Source.CORE,
		name: "Science",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.INFORMATION,
		page: 119,
	},
	{
		id: "core.quality.technology",
		source: Source.CORE,
		name: "Technology",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.INFORMATION,
		page: 119,
	},
	{
		id: "core.quality.alertness",
		source: Source.CORE,
		name: "Alertness",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.MENTAL,
		page: 119,
	},
	{
		id: "core.quality.conviction",
		source: Source.CORE,
		name: "Conviction",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.MENTAL,
		page: 119,
	},
	{
		id: "core.quality.creativity",
		source: Source.CORE,
		name: "Creativity",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.MENTAL,
		page: 119,
	},
	{
		id: "core.quality.investigation",
		source: Source.CORE,
		name: "Investigation",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.MENTAL,
		page: 119,
	},
	{
		id: "core.quality.selfDiscipline",
		source: Source.CORE,
		name: "Self-Discipline",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.MENTAL,
		page: 119,
	 },
	{
		id: "core.quality.acrobatics",
		source: Source.CORE,
		name: "Acrobatics",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.PHYSICAL,
		page: 120,
	},
	{
		id: "core.quality.closeCombat",
		source: Source.CORE,
		name: "Close Combat",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.PHYSICAL,
		page: 120,
	 },
	{
		id: "core.quality.finesse",
		source: Source.CORE,
		name: "Finesse",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.PHYSICAL,
		page: 120,
	},
	{
		id: "core.quality.fitness",
		source: Source.CORE,
		name: "Fitness",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.PHYSICAL,
		page: 120,
	},
	{
		id: "core.quality.rangedCombat",
		source: Source.CORE,
		name: "Ranged Combat",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.PHYSICAL,
		page: 120,
	 },
	{
		id: "core.quality.stealth",
		source: Source.CORE,
		name: "Stealth",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.PHYSICAL,
		page: 120,
	},
	{
		id: "core.quality.banter",
		source: Source.CORE,
		name: "Banter",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.SOCIAL,
		page: 120,
	},
	{
		id: "core.quality.imposing",
		source: Source.CORE,
		name: "Imposing",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.SOCIAL,
		page: 120,
	},
	{
		id: "core.quality.insight",
		source: Source.CORE,
		name: "Insight",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.SOCIAL,
		page: 120,
	},
	{
		id: "core.quality.leadership",
		source: Source.CORE,
		name: "Leadership",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.SOCIAL,
		page: 120,
	},
	{
		id: "core.quality.persuasion",
		source: Source.CORE,
		name: "Persuasion",
		type: PowerQualityType.QUALITY,
		category: QualityCategory.SOCIAL,
		page: 120,
	},
];

export default powersAndQualities;
