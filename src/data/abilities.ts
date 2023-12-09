import { Source } from "@/types/common";
import { getByIdFactory } from "@/util/util";

const abilities = [
	{
		name: "Principle of Destiny",
		id: "core.ability.principle_destiny",
		source: Source.CORE,
		page: 124,
		category: "Esoteric",
		icon: "overcome",
		type: "action",
		text: "Overcome a situation directly connected to your destiny and use your Max die. You and each of your allies gain a hero point.",
	},
];

export const getAbilityById = getByIdFactory(abilities);

export default abilities;
