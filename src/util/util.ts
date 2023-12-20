import { Entry } from "@/types/common";
import { identity } from "lodash";

export const noop = () => {};

export const isAFactory = <T,>(haystack: T[]) =>
	(needle: any): needle is T => haystack.some(
		candidate => (candidate as {id: string}).id === needle.id,
	);

export const getByIdFactory = <T extends {id: string}>(values: T[]) => {
	return (id: string) => values.find(value => value.id === id);
};

export const freezeArray = <T,>(
	mapper: (val: T) => string = identity,
	values: T[]
) => values.map(mapper).join(",");
export const thawArray = <T,>(
	mapper: (val: string) => T,
	frozenValue?: string
) => {
	if ( !frozenValue ) {
		return [] as T[];
	} else {
		return frozenValue.split(",").map(mapper);
	}
}
