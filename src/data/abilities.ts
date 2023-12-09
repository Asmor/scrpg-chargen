import { Source } from "@/types/common";
import { getByIdFactory } from "@/util/util";

const abilities = [
	{
		id: "core.ability.principle_destiny",
		source: Source.CORE,
		name: "Principle of Destiny",
		category: "Esoteric",
		page: 124,
		icon: "overcome",
		type: "action",
		text: "Overcome a situation directly connected to your destiny and use your Max die. You and each of your allies gain a hero point.",
	},
];

export const getAbilityById = getByIdFactory(abilities);

export default abilities;
