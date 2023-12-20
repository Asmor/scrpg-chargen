import { getByIdFactory, isAFactory } from "@/util/util";
import { Personality } from "./personalities.types";

const personalities: Personality[] = [];

export const getPersonalityById = getByIdFactory(personalities);
export const isPersonality = isAFactory(personalities);

export default personalities;
