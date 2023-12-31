import { getByIdFactory, isAFactory } from "@/util/util";
import { PowerSource } from "./powerSourcesTypes";
import { Source } from "@/types/common";
import { PowerCategory, QualityCategory } from "./powersQualities.types";

const powerSources: PowerSource[] = [
	{ // Accident
		name: "Accident",
		id: "core.powerSource.accident",
		source: Source.CORE,
		page: 57,
		assignablePqs: [
			PowerCategory.ATHLETIC,
			PowerCategory.ELEMENTAL_ENERGY,
			PowerCategory.INTELLECTUAL,
			PowerCategory.MATERIALS,
			PowerCategory.PSYCHIC,
			PowerCategory.SELF_CONTROL,
		],
		roll: 1,
		abilities: [
			"core.ability.areaAlteration",
			"core.ability.inflict",
			"core.ability.reflexiveBurst",
			"core.ability.ambushAwareness",
			"core.ability.changeInCircumstance",
			"core.ability.immunity",
		],
		yellowPicks: 2,
		greenPicks: 1,
		archetypeDice: [12, 6],
	},
	{ // Training
		name: "Training",
		id: "core.powerSource.training",
		source: Source.CORE,
		page: 58,
		assignablePqs: [
			"core.power.gadgets",
			"core.power.signatureVehicle",
			"core.power.signatureWeaponry",
			PowerCategory.ATHLETIC,
			PowerCategory.INTELLECTUAL,
		],
		roll: 2,
		abilities: [
			"core.ability.alwaysBePrepared",
			"core.ability.reactiveField",
			"core.ability.flowingFight",
		],
		yellowPicks: 2,
		archetypeDice: [10, 8, 8],
		extraArchetypeDice: [8],
	},
	{ // Genetic
		name: "Genetic",
		id: "core.powerSource.genetic",
		source: Source.CORE,
		page: 58,
		assignablePqs: [
			"core.power.agility",
			"core.power.flight",
			"core.power.signatureWeaponry",
			"core.power.strength",
			"core.power.vitality",
			PowerCategory.INTELLECTUAL,
			PowerCategory.PSYCHIC,
		],
		roll: 3,
		abilities: [
			"core.ability.dangerSense",
			"core.ability.adaptive",
			"core.ability.areaAssault",
			"core.ability.growth",
			"core.ability.rally",
		],
		yellowPicks: 2,
		greenPicks: 1,
		archetypeDice: [10, 8, 8],
	},
	{ // Experimentation
		name: "Experimentation",
		id: "core.powerSource.experimentation",
		source: Source.CORE,
		page: 59,
		assignablePqs: [
			"core.power.signatureWeaponry",
			PowerCategory.ATHLETIC,
			PowerCategory.ELEMENTAL_ENERGY,
			PowerCategory.INTELLECTUAL,
			PowerCategory.MOBILITY,
			PowerCategory.SELF_CONTROL,
		],
		roll: 4,
		abilities: [
			"core.ability.personalUpgrade.experimentation",
			"core.ability.misdirection",
			"core.ability.throwMinion.experimentation",
			"core.ability.overpower",
			"core.ability.unflagging",
		],
		yellowPicks: 2,
		greenPicks: 1,
		archetypeDice: [8, 8, 8],
	},
	{ // Mystical
		name: "Mystical",
		id: "core.powerSource.mystical",
		source: Source.CORE,
		page: 59,
		assignablePqs: [
			"core.power.awareness",
			"core.power.flight",
			"core.power.presence",
			"core.power.signatureWeaponry",
			"core.power.teleportation",
			PowerCategory.ELEMENTAL_ENERGY,
			PowerCategory.MATERIALS,
			PowerCategory.PSYCHIC,
			PowerCategory.SELF_CONTROL,
		],
		roll: 5,
		abilities: [
			"core.ability.modificationWave",
			"core.ability.mysticRedirection",
			"core.ability.severLink",
		],
		yellowPicks: 2,
		archetypeDice: [10, 8, 8],
		extraAssignables: {
			dice: [10],
			assignablePqs: [QualityCategory.INFORMATION],
		},
	},
	{ // Nature
		name: "Nature",
		id: "core.powerSource.nature",
		source: Source.CORE,
		page: 60,
		assignablePqs: [
			"core.power.animalControl",
			"core.power.cold",
			"core.power.electricity",
			"core.power.fire",
			"core.power.flight",
			"core.power.leaping",
			"core.power.shapeshifting",
			"core.power.swimming",
			"core.power.swinging",
			"core.power.wallCrawling",
			"core.power.weather",
			PowerCategory.ATHLETIC,
			PowerCategory.MATERIALS,
		],
		roll: 6,
		abilities: [
			"core.ability.callToTheWild",
			"core.ability.predatorsEye",
			"core.ability.wildStrength",
			"core.ability.graspingVines",
			"core.ability.naturalWeapon",
		],
		yellowPicks: 2,
		greenPicks: 1,
		archetypeDice: [10, 8, 8],
	},
	{ // Relic
		name: "Relic",
		id: "core.powerSource.relic",
		source: Source.CORE,
		page: 61,
		assignablePqs: [
			"core.power.awareness",
			"core.power.intuition",
			"core.power.signatureVehicle",
			"core.power.signatureWeaponry",
			PowerCategory.ELEMENTAL_ENERGY,
			PowerCategory.MATERIALS,
			PowerCategory.MOBILITY,
			PowerCategory.PSYCHIC,
			PowerCategory.SELF_CONTROL,
		],
		roll: 7,
		abilities: [
			"core.ability.harvestLifeForce",
			"core.ability.magicalShield",
			"core.ability.momentaryPower",
			"core.ability.drawPower",
			"core.ability.punishment",
		],
		yellowPicks: 2,
		greenPicks: 1,
		archetypeDice: [10, 10, 6],
	},
	{ // Powered Suit
		name: "Powered Suit",
		id: "core.powerSource.poweredSuit",
		source: Source.CORE,
		page: 62,
		assignablePqs: [
			"core.power.awareness",
			"core.power.cold",
			"core.power.elasticity",
			"core.power.electricity",
			"core.power.fire",
			"core.power.lightningCalculator",
			"core.power.nuclear",
			"core.power.partDetachment",
			"core.power.signatureVehicle",
			"core.power.signatureWeaponry",
			PowerCategory.ATHLETIC,
			PowerCategory.MOBILITY,
		],
		roll: 8,
		abilities: [
			"core.ability.energyConverter",
			"core.ability.explosiveAttack",
			"core.ability.onboardUpgrade",
			"core.ability.damageReduction",
			"core.ability.diagnosticSubroutine",
		],
		yellowPicks: 2,
		greenPicks: 1,
		archetypeDice: [10, 6, 6],
	},
	{ // Radiation
		name: "Radiation",
		id: "core.powerSource.radiation",
		source: Source.CORE,
		page: 63,
		assignablePqs: [
			"core.power.nuclear",
			"core.power.signatureVehicle",
			"core.power.signatureWeaponry",
			PowerCategory.ATHLETIC,
			PowerCategory.SELF_CONTROL,
			PowerCategory.TECHNOLOGICAL,
		],
		roll: 9,
		abilities: [
			"core.ability.radioactiveRecharge",
			"core.ability.unstableReaction",
			"core.ability.wither",
			"core.ability.chargedUp",
			"core.ability.dangerousLash",
			"core.ability.radioactiveAura",
		],
		yellowPicks: 2,
		greenPicks: 1,
		archetypeDice: [10, 8, 6],
	},
	{ // Tech Upgrades
		name: "Tech Upgrades",
		id: "core.powerSource.techUpgrades",
		source: Source.CORE,
		page: 64,
		assignablePqs: [
			"core.power.signatureVehicle",
			"core.power.signatureWeaponry",
			PowerCategory.ATHLETIC,
			PowerCategory.ELEMENTAL_ENERGY,
			PowerCategory.INTELLECTUAL,
			PowerCategory.MOBILITY,
			PowerCategory.TECHNOLOGICAL,
		],
		roll: 10,
		abilities: [
			"core.ability.energyBurst",
			"core.ability.recharge",
			"core.ability.technoAbsorb",
			"core.ability.tacticalAnalysis",
			"core.ability.indiscriminateFabrication",
			"core.ability.organiHack",
		],
		yellowPicks: 2,
		greenPicks: 1,
		archetypeDice: [10, 8, 8],
	},
	{ // Supernatural
		name: "Supernatural",
		id: "core.powerSource.supernatural",
		source: Source.CORE,
		page: 65,
		assignablePqs: [
			"core.power.awareness",
			"core.power.cold",
			"core.power.electricity",
			"core.power.fire",
			"core.power.infernal",
			"core.power.plants",
			"core.power.presence",
			"core.power.radiant",
			"core.power.strength",
			"core.power.transmutation",
			"core.power.vitality",
			"core.power.weather",
			PowerCategory.MOBILITY,
			PowerCategory.PSYCHIC,
			PowerCategory.SELF_CONTROL,
		],
		roll: 11,
		abilities: [
			"core.ability.areaHealing",
			"core.ability.massModification",
			"core.ability.personalUpgrade.supernatural",
			"core.ability.reachThroughVeil",
		],
		yellowPicks: 2,
		archetypeDice: [10, 10, 6],
		extraAssignables: {
			exclusive: true,
			dice: [10],
			assignablePqs: [PowerCategory.ALL],
		},
	},
	{ // Artificial Being
		name: "Artificial Being",
		id: "core.powerSource.artificialBeing",
		source: Source.CORE,
		page: 66,
		assignablePqs: [
			"core.power.inventions",
			"core.power.robotics",
			"core.power.signatureVehicle",
			"core.power.signatureWeaponry",
			PowerCategory.ATHLETIC,
			PowerCategory.ELEMENTAL_ENERGY,
			PowerCategory.INTELLECTUAL,
			PowerCategory.MOBILITY,
			PowerCategory.SELF_CONTROL,
		],
		roll: 12,
		abilities: [
			"core.ability.createdImmunity",
			"core.ability.multipleAssault",
			"core.ability.recalculating",
			"core.ability.createdForm",
			"core.ability.intentionality",
		],
		yellowPicks: 2,
		greenPicks: 1,
		archetypeDice: [10, 8, 8],
	},
	{ // Cursed
		name: "Cursed",
		id: "core.powerSource.cursed",
		source: Source.CORE,
		page: 67,
		assignablePqs: [
			"core.power.signatureWeaponry",
			PowerCategory.ATHLETIC,
			PowerCategory.ELEMENTAL_ENERGY,
			PowerCategory.MATERIALS,
			PowerCategory.SELF_CONTROL,
		],
		roll: 13,
		abilities: [
			"core.ability.attunement",
			"core.ability.costlyStrength",
			"core.ability.cursedResolve",
			"core.ability.doubleEdgedLuck",
			"core.ability.extremes",
		],
		yellowPicks: 2,
		greenPicks: 1,
		archetypeDice: [12, 6],
	},
	{ // Alien
		name: "Alien",
		id: "core.powerSource.alien",
		source: Source.CORE,
		page: 67,
		assignablePqs: [
			"core.power.signatureVehicle",
			"core.power.signatureWeaponry",
			PowerCategory.ATHLETIC,
			PowerCategory.ELEMENTAL_ENERGY,
			PowerCategory.INTELLECTUAL,
			PowerCategory.MOBILITY,
			PowerCategory.PSYCHIC,
			PowerCategory.TECHNOLOGICAL,
		],
		roll: 14,
		abilities: [
			"core.ability.alienBoost",
			"core.ability.empowerAndRepair",
			"core.ability.halt",
		],
		yellowPicks: 2,
		archetypeDice: [8, 8, 8],
		// todo handle its special upgrade
	},
	{ // Genius
		name: "Genius",
		id: "core.powerSource.genius",
		source: Source.CORE,
		page: 68,
		assignablePqs: [
			"core.power.inventions",
			"core.power.robotics",
			"core.power.signatureVehicle",
			"core.power.signatureWeaponry",
			PowerCategory.INTELLECTUAL,
		],
		roll: 15,
		abilities: [
			"core.ability.aPlanForEverything",
			"core.ability.expandedMind",
			"core.ability.overwhelmingVision",
		],
		yellowPicks: 2,
		archetypeDice: [10, 6, 6],
		extraAssignables: {
			dice: [10],
			assignablePqs: [
				QualityCategory.INFORMATION,
				QualityCategory.MENTAL,
			],
		},
	},
	{ // Cosmos
		name: "Cosmos",
		id: "core.powerSource.cosmos",
		source: Source.CORE,
		page: 68,
		assignablePqs: [
			"core.power.cosmic",
			"core.power.intuition",
			"core.power.signatureVehicle",
			"core.power.signatureWeaponry",
			PowerCategory.MOBILITY,
			PowerCategory.PSYCHIC,
			PowerCategory.SELF_CONTROL,
			PowerCategory.TECHNOLOGICAL,
		],
		roll: 16,
		abilities: [
			"core.ability.cosmicRayAbsorption",
			"core.ability.encourage",
			"core.ability.massEffect",
		],
		yellowPicks: 2,
		archetypeDice: [10, 8, 8],
		// todo handle cosmos upgrade/downgrade
	},
	{ // Extradimensional
		name: "Extradimensional",
		id: "core.powerSource.extradimensional",
		source: Source.CORE,
		page: 69,
		assignablePqs: [
			"core.power.cosmic",
			"core.power.duplication",
			"core.power.infernal",
			"core.power.intangibility",
			"core.power.invisibility",
			"core.power.radiant",
			"core.power.signatureVehicle",
			"core.power.signatureWeaponry",
			"core.power.transmutation",
			"core.power.teleportation",
			PowerCategory.INTELLECTUAL,
			PowerCategory.PSYCHIC,
		],
		roll: 17,
		abilities: [
			"core.ability.absorbEssence",
			"core.ability.auraOfPain",
			"core.ability.bizarreStrike",
			"core.ability.attune",
			"core.ability.extrasensoryAwareness",
		],
		yellowPicks: 2,
		greenPicks: 1,
		archetypeDice: [12, 6],
	},
	{ // Unknown
		name: "Unknown",
		id: "core.powerSource.unknown",
		source: Source.CORE,
		page: 69,
		assignablePqs: [
			PowerCategory.ELEMENTAL_ENERGY,
			PowerCategory.INTELLECTUAL,
			PowerCategory.MATERIALS,
			PowerCategory.SELF_CONTROL,
			PowerCategory.TECHNOLOGICAL,
		],
		roll: 18,
		abilities: [
			"core.ability.brainstorm",
			"core.ability.strangeEnhancement",
			"core.ability.volatileCreations",
		],
		yellowPicks: 2,
		archetypeDice: [10, 8, 6],
		extraAssignables: {
			dice: [8],
			assignablePqs: [QualityCategory.SOCIAL],
		},
	},
	{ // Higher Power
		name: "Higher Power",
		id: "core.powerSource.higherPower",
		source: Source.CORE,
		page: 70,
		assignablePqs: [
			PowerCategory.ATHLETIC,
			PowerCategory.ELEMENTAL_ENERGY,
			PowerCategory.MATERIALS,
			PowerCategory.PSYCHIC,
			PowerCategory.SELF_CONTROL,
		],
		roll: 19,
		abilities: [
			"core.ability.commandPower",
			"core.ability.dangerousExplosion",
			"core.ability.embolden",
			"core.ability.resolve",
			"core.ability.resilience",
			"core.ability.twistReality",
		],
		yellowPicks: 2,
		greenPicks: 1,
		archetypeDice: [10, 8, 8],
	},
	{ // The Multiverse
		name: "The Multiverse",
		id: "core.powerSource.theMultiverse",
		source: Source.CORE,
		page: 70,
		assignablePqs: [
			"core.power.awareness",
			"core.power.cosmic",
			"core.power.intuition",
			"core.power.speed",
			"core.power.teleportation",
			PowerCategory.PSYCHIC,
			PowerCategory.SELF_CONTROL,
		],
		roll: 20,
		abilities: [
			"core.ability.powerFromBeyond",
			"core.ability.respondInKind",
			"core.ability.dreadPallor",
			"core.ability.realityScorned",
		],
		yellowPicks: 2,
		archetypeDice: [10, 8, 6],
		extraAssignables: {
			dice: [6],
			assignablePqs: [PowerCategory.ALL],
		},
	},
];

export const getPowerSourceById = getByIdFactory(powerSources);
export const isPowerSource = isAFactory(powerSources);

export default powerSources;
