import { Archetype } from "@/data/archetypes.types";
import { Background } from "@/data/backgrounds.types";
import { PowerSource } from "@/data/powerSourcesTypes";
import { PowerQuality } from "@/data/powersQualities.types";
import { Principle } from "@/data/principles.types";
import { Die } from "@/types/common";

export interface Character {
	rolls: {
		background: number[];
	};
	aspects: {
		background?: Background;
		powerSource?: PowerSource;
		archetype?: Archetype;
		principles: Principle[];
	};
	powersAndQualities: {
		powerQuality: PowerQuality;
		die: Die;
	}[];
}

export const getNewCharacter = (): Character => ({
	rolls: {
		background: [],
	},
	aspects: {
		principles: [],
	},
	powersAndQualities: [],
});
