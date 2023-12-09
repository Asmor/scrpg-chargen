import { Source } from "@/types/common";
import { Principle, PrincipleCategory } from "./principles.types";

const principles: Principle[] = [
	{
		id: "core.principle.destiny",
		source: Source.CORE,
		name: "Principle of Destiny",
		category: PrincipleCategory.ESOTERIC,
		abilityId: "core.ability.principle_destiny",
		page: 124,
	},
	{
		id: "core.principle.energy_element",
		source: Source.CORE,
		name: "Principle of [Energy/Element]",
		category: PrincipleCategory.ESOTERIC,
		abilityId: "core.ability.principle_energy_element",
		page: 124,
	},
	{
		id: "core.principle.exorcism",
		source: Source.CORE,
		name: "Principle of Exorcism",
		category: PrincipleCategory.ESOTERIC,
		abilityId: "core.ability.principle_exorcism",
		page: 124,
	},
	{
		id: "core.principle.fauna",
		source: Source.CORE,
		name: "Principle of Fauna",
		category: PrincipleCategory.ESOTERIC,
		abilityId: "core.ability.principle_fauna",
		page: 124,
	},
	{
		id: "core.principle.flora",
		source: Source.CORE,
		name: "Principle of Flora",
		category: PrincipleCategory.ESOTERIC,
		abilityId: "core.ability.principle_flora",
		page: 125,
	},
	{
		id: "core.principle.future",
		source: Source.CORE,
		name: "Principle of the Future",
		category: PrincipleCategory.ESOTERIC,
		abilityId: "core.ability.principle_future",
		page: 125,
	},
	{
		id: "core.principle.immortality",
		source: Source.CORE,
		name: "Principle of Immortality",
		category: PrincipleCategory.ESOTERIC,
		abilityId: "core.ability.principle_immortality",
		page: 125,
	},
	{
		id: "core.principle.inner_demon",
		source: Source.CORE,
		name: "Principle of the Inner Demon",
		category: PrincipleCategory.ESOTERIC,
		abilityId: "core.ability.principle_inner_demon",
		page: 125,
	},
	{
		id: "core.principle.magic",
		source: Source.CORE,
		name: "Principle of Magic",
		category: PrincipleCategory.ESOTERIC,
		abilityId: "core.ability.principle_magic",
		page: 125,
	},
	{
		id: "core.principle.sea",
		source: Source.CORE,
		name: "Principle of the Sea",
		category: PrincipleCategory.ESOTERIC,
		abilityId: "core.ability.principle_sea",
		page: 126,
	},
	{
		id: "core.principle.space",
		source: Source.CORE,
		name: "Principle of Space",
		category: PrincipleCategory.ESOTERIC,
		abilityId: "core.ability.principle_space",
		page: 126,
	},
	{
		id: "core.principle.time_traveler",
		source: Source.CORE,
		name: "Principle of the Time Traveler",
		category: PrincipleCategory.ESOTERIC,
		abilityId: "core.ability.principle_time_traveler",
		page: 126,
	},
	{
		id: "core.principle.undead",
		source: Source.CORE,
		name: "Principle of the Undead",
		category: PrincipleCategory.ESOTERIC,
		abilityId: "core.ability.principle_undead",
		page: 126,
	},
	{
		id: "core.principle.clockwork",
		source: Source.CORE,
		name: "Principle of Clockwork",
		category: PrincipleCategory.EXPERTISE,
		abilityId: "core.ability.principle_clockwork",
		page: 127,
	},
	{
		id: "core.principle.gearhead",
		source: Source.CORE,
		name: "Principle of the Gearhead",
		category: PrincipleCategory.EXPERTISE,
		abilityId: "core.ability.principle_gearhead",
		page: 127,
	},
	{
		id: "core.principle.history",
		source: Source.CORE,
		name: "Principle of History",
		category: PrincipleCategory.EXPERTISE,
		abilityId: "core.ability.principle_history",
		page: 127,
	},
	{
		id: "core.principle.indestructible",
		source: Source.CORE,
		name: "Principle of the Indestructible",
		category: PrincipleCategory.EXPERTISE,
		abilityId: "core.ability.principle_indestructible",
		page: 127,
	},
	{
		id: "core.principle.lab",
		source: Source.CORE,
		name: "Principle of the Lab",
		category: PrincipleCategory.EXPERTISE,
		abilityId: "core.ability.principle_lab",
		page: 128,
	},
	{
		id: "core.principle.mastery",
		source: Source.CORE,
		name: "Principle of Mastery",
		category: PrincipleCategory.EXPERTISE,
		abilityId: "core.ability.principle_mastery",
		page: 128,
	},
	{
		id: "core.principle.mentor",
		source: Source.CORE,
		name: "Principle of the Mentor",
		category: PrincipleCategory.EXPERTISE,
		abilityId: "core.ability.principle_mentor",
		page: 128,
	},
	{
		id: "core.principle.powerless",
		source: Source.CORE,
		name: "Principle of the Powerless",
		category: PrincipleCategory.EXPERTISE,
		abilityId: "core.ability.principle_powerless",
		page: 129,
	},
	{
		id: "core.principle.science",
		source: Source.CORE,
		name: "Principle of Science",
		category: PrincipleCategory.EXPERTISE,
		abilityId: "core.ability.principle_science",
		page: 129,
	},
	{
		id: "core.principle.speed",
		source: Source.CORE,
		name: "Principle of Speed",
		category: PrincipleCategory.EXPERTISE,
		abilityId: "core.ability.principle_speed",
		page: 129,
	},
	{
		id: "core.principle.stealth",
		source: Source.CORE,
		name: "Principle of Stealth",
		category: PrincipleCategory.EXPERTISE,
		abilityId: "core.ability.principle_stealth",
		page: 129,
	},
	{
		id: "core.principle.strength",
		source: Source.CORE,
		name: "Principle of Strength",
		category: PrincipleCategory.EXPERTISE,
		abilityId: "core.ability.principle_strength",
		page: 129,
	},
	{
		id: "core.principle.tactician",
		source: Source.CORE,
		name: "Principle of the Tactician",
		category: PrincipleCategory.EXPERTISE,
		abilityId: "core.ability.principle_tactician",
		page: 130,
	},
	{
		id: "core.principle.whispers",
		source: Source.CORE,
		name: "Principle of Whispers",
		category: PrincipleCategory.EXPERTISE,
		abilityId: "core.ability.principle_whispers",
		page: 130,
	},
	{
		id: "core.principle.chaos",
		source: Source.CORE,
		name: "Principle of Chaos",
		category: PrincipleCategory.IDEALS,
		abilityId: "core.ability.principle_chaos",
		page: 131,
	},
	{
		id: "core.principle.compassion",
		source: Source.CORE,
		name: "Principle of Compassion",
		category: PrincipleCategory.IDEALS,
		abilityId: "core.ability.principle_compassion",
		page: 131,
	},
	{
		id: "core.principle.defender",
		source: Source.CORE,
		name: "Principle of the Defender",
		category: PrincipleCategory.IDEALS,
		abilityId: "core.ability.principle_defender",
		page: 131,
	},
	{
		id: "core.principle.dependence",
		source: Source.CORE,
		name: "Principle of Dependence",
		category: PrincipleCategory.IDEALS,
		abilityId: "core.ability.principle_dependence",
		page: 131,
	},
	{
		id: "core.principle.equality",
		source: Source.CORE,
		name: "Principle of Equality",
		category: PrincipleCategory.IDEALS,
		abilityId: "core.ability.principle_equality",
		page: 132,
	},
	{
		id: "core.principle.great_power",
		source: Source.CORE,
		name: "Principle of Great Power",
		category: PrincipleCategory.IDEALS,
		abilityId: "core.ability.principle_great_power",
		page: 132,
	},
	{
		id: "core.principle.hero",
		source: Source.CORE,
		name: "Principle of the Hero",
		category: PrincipleCategory.IDEALS,
		abilityId: "core.ability.principle_hero",
		page: 132,
	},
	{
		id: "core.principle.honor",
		source: Source.CORE,
		name: "Principle of Honor",
		category: PrincipleCategory.IDEALS,
		abilityId: "core.ability.principle_honor",
		page: 132,
	},
	{
		id: "core.principle.justice",
		source: Source.CORE,
		name: "Principle of Justice",
		category: PrincipleCategory.IDEALS,
		abilityId: "core.ability.principle_justice",
		page: 133,
	},
	{
		id: "core.principle.liberty",
		source: Source.CORE,
		name: "Principle of Liberty",
		category: PrincipleCategory.IDEALS,
		abilityId: "core.ability.principle_liberty",
		page: 133,
	},
	{
		id: "core.principle.order",
		source: Source.CORE,
		name: "Principle of Order",
		category: PrincipleCategory.IDEALS,
		abilityId: "core.ability.principle_order",
		page: 133,
	},
	{
		id: "core.principle.self_preservation",
		source: Source.CORE,
		name: "Principle of Self-Preservation",
		category: PrincipleCategory.IDEALS,
		abilityId: "core.ability.principle_self_preservation",
		page: 134,
	},
	{
		id: "core.principle.zealot",
		source: Source.CORE,
		name: "Principle of the Zealot",
		category: PrincipleCategory.IDEALS,
		abilityId: "core.ability.principle_zealot",
		page: 134,
	},
	{
		id: "core.principle.ambition",
		source: Source.CORE,
		name: "Principle of Ambition",
		category: PrincipleCategory.IDENTITY,
		abilityId: "core.ability.principle_ambition",
		page: 135,
	},
	{
		id: "core.principle.amnesia",
		source: Source.CORE,
		name: "Principle of Amnesia",
		category: PrincipleCategory.IDENTITY,
		abilityId: "core.ability.principle_amnesia",
		page: 135,
	},
	{
		id: "core.principle.detachment",
		source: Source.CORE,
		name: "Principle of Detachment",
		category: PrincipleCategory.IDENTITY,
		abilityId: "core.ability.principle_detachment",
		page: 135,
	},
	{
		id: "core.principle.discovery",
		source: Source.CORE,
		name: "Principle of Discovery",
		category: PrincipleCategory.IDENTITY,
		abilityId: "core.ability.principle_discovery",
		page: 135,
	},
	{
		id: "core.principle.levity",
		source: Source.CORE,
		name: "Principle of Levity",
		category: PrincipleCategory.IDENTITY,
		abilityId: "core.ability.principle_levity",
		page: 136,
	},
	{
		id: "core.principle.loner",
		source: Source.CORE,
		name: "Principle of the Loner",
		category: PrincipleCategory.IDENTITY,
		abilityId: "core.ability.principle_loner",
		page: 136,
	},
	{
		id: "core.principle.nomad",
		source: Source.CORE,
		name: "Principle of the Nomad",
		category: PrincipleCategory.IDENTITY,
		abilityId: "core.ability.principle_nomad",
		page: 136,
	},
	{
		id: "core.principle.peace",
		source: Source.CORE,
		name: "Principle of Peace",
		category: PrincipleCategory.IDENTITY,
		abilityId: "core.ability.principle_peace",
		page: 136,
	},
	{
		id: "core.principle.rage",
		source: Source.CORE,
		name: "Principle of Rage",
		category: PrincipleCategory.IDENTITY,
		abilityId: "core.ability.principle_rage",
		page: 137,
	},
	{
		id: "core.principle.savagery",
		source: Source.CORE,
		name: "Principle of Savagery",
		category: PrincipleCategory.IDENTITY,
		abilityId: "core.ability.principle_savagery",
		page: 137,
	},
	{
		id: "core.principle.split",
		source: Source.CORE,
		name: "Principle of the Split",
		category: PrincipleCategory.IDENTITY,
		abilityId: "core.ability.principle_split",
		page: 137,
	},
	{
		id: "core.principle.spotless_mind",
		source: Source.CORE,
		name: "Principle of the Spotless Mind",
		category: PrincipleCategory.IDENTITY,
		abilityId: "core.ability.principle_spotless_mind",
		page: 137,
	},
	{
		id: "core.principle.business",
		source: Source.CORE,
		name: "Principle of Business",
		category: PrincipleCategory.RESPONSIBILITY,
		abilityId: "core.ability.principle_business",
		page: 138,
	},
	{
		id: "core.principle.debtor",
		source: Source.CORE,
		name: "Principle of the Debtor",
		category: PrincipleCategory.RESPONSIBILITY,
		abilityId: "core.ability.principle_debtor",
		page: 138,
	},
	{
		id: "core.principle.detective",
		source: Source.CORE,
		name: "Principle of the Detective",
		category: PrincipleCategory.RESPONSIBILITY,
		abilityId: "core.ability.principle_detective",
		page: 138,
	},
	{
		id: "core.principle.double_agent",
		source: Source.CORE,
		name: "Principle of the Double Agent",
		category: PrincipleCategory.RESPONSIBILITY,
		abilityId: "core.ability.principle_double_agent",
		page: 138,
	},
	{
		id: "core.principle.everyman",
		source: Source.CORE,
		name: "Principle of the Everyman",
		category: PrincipleCategory.RESPONSIBILITY,
		abilityId: "core.ability.principle_everyman",
		page: 139,
	},
	{
		id: "core.principle.family",
		source: Source.CORE,
		name: "Principle of Family",
		category: PrincipleCategory.RESPONSIBILITY,
		abilityId: "core.ability.principle_family",
		page: 139,
	},
	{
		id: "core.principle.mask",
		source: Source.CORE,
		name: "Principle of the Mask",
		category: PrincipleCategory.RESPONSIBILITY,
		abilityId: "core.ability.principle_mask",
		page: 139,
	},
	{
		id: "core.principle.sidekick",
		source: Source.CORE,
		name: "Principle of the Sidekick",
		category: PrincipleCategory.RESPONSIBILITY,
		abilityId: "core.ability.principle_sidekick",
		page: 139,
	},
	{
		id: "core.principle.team",
		source: Source.CORE,
		name: "Principle of the Team",
		category: PrincipleCategory.RESPONSIBILITY,
		abilityId: "core.ability.principle_team",
		page: 140,
	},
	{
		id: "core.principle.underworld",
		source: Source.CORE,
		name: "Principle of the Underworld",
		category: PrincipleCategory.RESPONSIBILITY,
		abilityId: "core.ability.principle_underworld",
		page: 140,
	},
	{
		id: "core.principle.veteran",
		source: Source.CORE,
		name: "Principle of the Veteran",
		category: PrincipleCategory.RESPONSIBILITY,
		abilityId: "core.ability.principle_veteran",
		page: 141,
	},
	{
		id: "core.principle.youth",
		source: Source.CORE,
		name: "Principle of Youth",
		category: PrincipleCategory.RESPONSIBILITY,
		abilityId: "core.ability.principle_youth",
		page: 141,
	},
];

export default principles;
