import { getByIdFactory } from "@/util/util";
import { Personality } from "./personalities.types";

const personalities: Personality[] = [];

export const getPersonalityById = getByIdFactory(personalities);

export default personalities;
